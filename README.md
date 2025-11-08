# WikiBotIQ

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.0+-61DAFB.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF.svg)](https://vitejs.dev/)
[![Wikipedia API](https://img.shields.io/badge/Wikipedia-REST_API-000000.svg)](https://www.mediawiki.org/wiki/API:Main_page)

A conversational chatbot that answers factual questions using Wikipedia summaries. WikiBotIQ provides accurate, encyclopedia-backed responses by fetching real-time data directly from Wikipedia's REST API.

## Overview

WikiBotIQ is a lightweight, intelligent chatbot designed to answer user questions with factual information sourced exclusively from Wikipedia. The application leverages Wikipedia's REST APIs to retrieve article summaries, making it an ideal tool for quick fact-checking, learning, and research assistance.

**Note:** This project uses Wikipedia's API exclusively for information retrieval. No third-party AI services (such as Google GenAI) are integrated.

## Features

- **Wikipedia-Powered Responses**: Fetches accurate summaries directly from Wikipedia REST APIs
- **Conversational Interface**: Clean, intuitive chat UI for seamless user interaction
- **Real-Time Search**: Instant article lookup and summary extraction
- **No External AI Dependencies**: Relies solely on Wikipedia's structured data
- **Responsive Design**: Works flawlessly across desktop and mobile devices
- **Fast Performance**: Built with Vite for lightning-fast development and production builds
- **Type Safety**: Full TypeScript implementation for robust code quality

## Tech Stack

- **Frontend Framework**: React 18+
- **Language**: TypeScript 5.0+
- **Build Tool**: Vite 5.0+
- **Data Source**: Wikipedia REST APIs
- **Styling**: CSS3 / CSS Modules (or your preferred styling solution)
- **HTTP Client**: Fetch API / Axios

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (or yarn/pnpm)
- **Git**: For cloning the repository

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/wikibotiq.git
cd wikibotiq
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```bash
touch .env
```

Add the following environment variables:

```env
# Wikipedia API Configuration
VITE_WIKIPEDIA_API_URL=https://en.wikipedia.org/api/rest_v1
VITE_APP_NAME=WikiBotIQ
VITE_APP_VERSION=1.0.0

# Optional: Custom Wikipedia language edition
# VITE_WIKIPEDIA_LANG=en
```

**Note:** The Wikipedia REST API does not require authentication, but you can configure the language edition and base URL as needed.

## Run Commands

### Development Mode

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

Create an optimized production build:

```bash
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Lint Code

Run ESLint to check for code quality issues:

```bash
npm run lint
```

### Type Check

Verify TypeScript types without emitting files:

```bash
npm run type-check
```

## Usage Example

1. **Start the application** in development mode
2. **Type a question** in the chat interface, such as:
   - "What is artificial intelligence?"
   - "Tell me about the Eiffel Tower"
   - "Who was Albert Einstein?"
3. **Receive a response** with a concise Wikipedia summary
4. **View source links** to explore the full Wikipedia article

### Sample Interaction

```
User: What is quantum computing?

WikiBotIQ: Quantum computing is a type of computation that harnesses 
the collective properties of quantum states, such as superposition, 
interference, and entanglement, to perform calculations. Quantum 
computers have the potential to solve certain problems much faster 
than classical computers...

Source: https://en.wikipedia.org/wiki/Quantum_computing
```

## Project Structure

```
wikibotiq/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── ChatInterface.tsx
│   │   ├── MessageBubble.tsx
│   │   └── InputBar.tsx
│   ├── services/        # API services
│   │   └── wikipediaService.ts
│   ├── types/           # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── .env                 # Environment variables
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Testing

### Run Unit Tests

```bash
npm run test
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

### E2E Tests (if configured)

```bash
npm run test:e2e
```

**Testing Stack**: Jest, React Testing Library, Vitest (recommended for Vite projects)

## Contributing

We welcome contributions to WikiBotIQ! Please follow these guidelines:

### How to Contribute

1. **Fork the repository** on GitHub
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Commit your changes**: `git commit -m 'Add some feature'`
4. **Push to the branch**: `git push origin feature/your-feature-name`
5. **Open a Pull Request** with a clear description of your changes

### Code Standards

- Follow the existing TypeScript and React patterns
- Write meaningful commit messages
- Add unit tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

### Reporting Issues

Found a bug or have a suggestion? Please [open an issue](https://github.com/yourusername/wikibotiq/issues) with:
- Clear description of the problem
- Steps to reproduce
- Expected vs. actual behavior
- Screenshots (if applicable)

## API Reference

WikiBotIQ uses the following Wikipedia REST API endpoints:

- **Search**: `GET /page/summary/{title}`
- **Random Article**: `GET /page/random/summary`

For complete API documentation, visit: [Wikipedia REST API Documentation](https://www.mediawiki.org/wiki/API:REST_API)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Wikipedia and the Wikimedia Foundation for providing free access to knowledge
- The open-source community for excellent tools and libraries
- Contributors who help improve WikiBotIQ

## Contact

- **Project Maintainer**: Your Name
- **Email**: your.email@example.com
- **GitHub**: [@yourusername](https://github.com/yourusername)
- **Issues**: [GitHub Issues](https://github.com/yourusername/wikibotiq/issues)

---

**Disclaimer**: WikiBotIQ is not affiliated with or endorsed by Wikipedia or the Wikimedia Foundation. All content is sourced from Wikipedia under the Creative Commons Attribution-ShareAlike License.

Made with ❤️ using Wikipedia's knowledge base
