# Plex Deeper

A Next.js application with Mastra AI agents for enhanced content analysis and description generation.

## Local Setup

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd plex-deeper
pnpm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```bash
# Database
DATABASE_URL=your_neon_database_url

# Redis
REDIS_URL=your_redis_url

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Google Search API
GOOGLE_SEARCH_API_KEY=your_google_search_api_key
GOOGLE_SEARCH_ENGINE_ID=your_google_search_engine_id
```

### 3. Run the Application

Start the development server:

```bash
pnpm dev
```

In a separate terminal, start the background workers:

```bash
pnpm run start:worker
```

This will run both:

- Short description worker
- Detailed description worker

### 4. Install Browser Extension

Install the Query X extension from: https://github.com/dibkb/query-x-extension

## Available Scripts

- `pnpm dev` - Start the Next.js development server
- `pnpm run start:worker` - Start all background workers
- `pnpm run start:worker-short-description` - Start only the short description worker
- `pnpm run start:worker-detailed-description` - Start only the detailed description worker
- `pnpm run dev:mastra` - Start Mastra development server
- `pnpm run build:mastra` - Build Mastra workflows

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **AI**: Mastra with OpenAI integration
- **Database**: Neon (PostgreSQL) with Drizzle ORM
- **Queue**: Redis with Bee Queue
- **UI**: Shadcn UI with Tailwind CSS
- **State Management**: TanStack Query

## Features

- AI-powered content analysis
- Background job processing
- Real-time search capabilities
- Modern responsive UI
