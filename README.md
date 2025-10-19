# Plex Deeper

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

A Next.js application with Mastra AI agents for enhanced content analysis and description generation.

</div>

## 📋 Table of Contents

- [Local Setup](#local-setup)
- [Available Scripts](#available-scripts)
- [Tech Stack](#tech-stack)
- [Features](#features)

## 🚀 Local Setup

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

Install the Query X extension from: [https://github.com/dibkb/query-x-extension](https://github.com/dibkb/query-x-extension)

1. **Install dependencies**: `pnpm install`
2. **Build the extension**: `pnpm run build`
3. **Load in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked" and select the `dist` folder created in step 2
4. **Get Extension ID**:
   - Copy the extension ID from the extensions page (e.g., `lmahehkeleeobdljhkilajlgebegemfl`)
5. **Update Configuration**:
   - Update the extension ID in `const.ts`

## 📜 Available Scripts

| Command                                      | Description                                |
| -------------------------------------------- | ------------------------------------------ |
| `pnpm dev`                                   | Start the Next.js development server       |
| `pnpm run start:worker`                      | Start all background workers               |
| `pnpm run start:worker-short-description`    | Start only the short description worker    |
| `pnpm run start:worker-detailed-description` | Start only the detailed description worker |
| `pnpm run dev:mastra`                        | Start Mastra development server            |
| `pnpm run build:mastra`                      | Build Mastra workflows                     |

## 🛠️ Tech Stack

| Category             | Technology                         |
| -------------------- | ---------------------------------- |
| **Framework**        | Next.js 15 with App Router         |
| **Language**         | TypeScript                         |
| **AI**               | Mastra with OpenAI integration     |
| **Database**         | Neon (PostgreSQL) with Drizzle ORM |
| **Queue**            | Redis with Bee Queue               |
| **UI**               | Shadcn UI with Tailwind CSS        |
| **State Management** | TanStack Query                     |

## ✨ Features

- 🤖 **AI-powered content analysis** - Intelligent content processing using Mastra AI agents
- ⚡ **Background job processing** - Asynchronous task handling with Redis queues
- 🔍 **Real-time search capabilities** - Google Search API integration
- 📱 **Modern responsive UI** - Clean, accessible interface built with Shadcn UI
- 🔧 **Browser extension support** - Query X extension integration
- 🎯 **Detailed descriptions** - Enhanced content analysis and description generation
