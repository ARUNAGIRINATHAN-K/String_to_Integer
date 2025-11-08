import { Source } from '../types';

// This service no longer calls Google GenAI. It fetches Wikipedia text and returns a concise
// summary derived from the article intro. This keeps secrets out of the client and
// removes the `@google/genai` dependency.

function summarizeText(text: string, maxSentences = 3): string {
    // Split into sentences using punctuation followed by whitespace. Keep it simple.
    const sentences = text.split(/(?<=[.!?])\s+/);
    const chosen = sentences.slice(0, maxSentences);
    return chosen.join(' ').trim();
}

export interface FactualAnswer {
    answer: string;
    sources: Source[];
}

// Function to search Wikipedia and get the top article title
async function searchWikipedia(query: string): Promise<string | null> {
    const url = new URL('https://en.wikipedia.org/w/api.php');
    url.search = new URLSearchParams({
        action: 'opensearch',
        search: query,
        limit: '1',
        namespace: '0',
        format: 'json',
        origin: '*', // Necessary for CORS
    }).toString();

    try {
        const response = await fetch(url);
        if (!response.ok) return null;
        const data = await response.json();
        // opensearch format is [query, [titles], [descriptions], [urls]]
        if (data[1] && data[1].length > 0) {
            return data[1][0]; // Return the first title
        }
        return null;
    } catch (error) {
        console.error("Error searching Wikipedia:", error);
        return null;
    }
}

// Function to get the extract (summary) of a Wikipedia article
async function getWikipediaExtract(title: string): Promise<string | null> {
    const url = new URL('https://en.wikipedia.org/w/api.php');
    url.search = new URLSearchParams({
        action: 'query',
        prop: 'extracts',
        exintro: 'true', // Get only the intro section
        explaintext: 'true', // Get plain text
        titles: title,
        format: 'json',
        origin: '*',
    }).toString();

    try {
        const response = await fetch(url);
        if (!response.ok) return null;
        const data = await response.json();
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        if (pageId && pages[pageId].extract) {
            return pages[pageId].extract;
        }
        return null;
    } catch (error) {
        console.error("Error fetching Wikipedia extract:", error);
        return null;
    }
}

export async function getFactualAnswer(question: string): Promise<FactualAnswer> {
    try {
        // 1. Search Wikipedia for a relevant article
        const articleTitle = await searchWikipedia(question);

        if (!articleTitle) {
            return {
                answer: "I'm sorry, I couldn't find a relevant Wikipedia article for your question.",
                sources: [],
            };
        }

        // 2. Fetch the article's summary
        const articleExtract = await getWikipediaExtract(articleTitle);

        if (!articleExtract) {
            return {
                answer: `I found an article titled "${articleTitle}", but I couldn't retrieve its content.`,
                sources: [],
            };
        }

        // 3. Create a concise answer based solely on the Wikipedia extract.
        const shortAnswer = summarizeText(articleExtract, 3);

        // Format the answer as a short, human-friendly paragraph. Keep it markdown-friendly.
        const answer = `**Answer (based on Wikipedia - ${articleTitle})**\n\n${shortAnswer}`;

        const sources: Source[] = [{
            title: articleTitle,
            uri: `https://en.wikipedia.org/wiki/${encodeURIComponent(articleTitle.replace(/ /g, '_'))}`
        }];

        return { answer, sources };

    } catch (error)
 {
        console.error("Error processing request with Gemini and Wikipedia:", error);
        return {
            answer: "I'm sorry, I encountered an error while trying to answer your question. Please check the console for details or try again later.",
            sources: [],
        };
    }
}
