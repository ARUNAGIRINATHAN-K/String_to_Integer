// import { GoogleGenAI } from "@google/genai";
import { Source } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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

        // 3. Use Gemini to answer the question based on the Wikipedia text
        const prompt = `Based *only* on the following text from Wikipedia, provide a concise answer to the user's question.
Do not use any information not present in the text. Format your response using markdown.

User's Question: "${question}"

Wikipedia Text:
"""
${articleExtract}
"""

Answer:`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: `You are a helpful and knowledgeable chatbot named WikiBot. Your goal is to answer factual questions accurately based on provided Wikipedia text.`,
            },
        });

        const answer = response.text;
        
        // The source is the Wikipedia article we used
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
