# ProCognito: AI-Powered Cybersecurity Dashboard

ProCognito is an intelligent system designed to proactively predict and respond to cyber threats. It leverages machine learning and adaptive AI models to identify new or unknown attack patterns, providing a comprehensive dashboard for security professionals to monitor, analyze, and act on potential threats.

## ✨ Key Features

-   **Real-time Threat Dashboard**: A central overview of key security metrics, including total threats detected, high-severity alerts, and system status.
-   **AI-Powered Anomaly Detection**: Analyze raw network traffic data to identify unusual patterns or deviations from a baseline that could indicate a threat.
-   **Adaptive AI Defense**: The system learns from past threats and automatically suggests adapted defense strategies to improve resilience against future attacks.
-   **Natural Language Log Analysis**: Use NLP to analyze and summarize security logs, providing early warnings and insights into potential security breaches.
-   **Interactive Charts**: Visualize network traffic and threat categories for quick analysis.
-   **Responsive Design**: A modern, responsive interface built with ShadCN UI and Tailwind CSS that works on all devices.
-   **Light & Dark Mode**: Easily switch between light and dark themes to suit your preference.

## 🚀 Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **AI/Generative**: [Genkit](https://firebase.google.com/docs/genkit)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
-   **Charts**: [Recharts](https://recharts.org/)
-   **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## 📂 Project Structure

The project follows a standard Next.js App Router structure:

```
.
├── src
│   ├── app/                # Main application pages and layout
│   ├── components/         # Reusable UI components
│   │   ├── dashboard/      # Components for the main dashboard
│   │   ├── layout/         # App layout (header, sidebar)
│   │   ├── tools/          # AI tool components
│   │   └── ui/             # Core ShadCN UI components
│   ├── ai/                 # Genkit AI flows and configuration
│   │   └── flows/          # Specific AI-powered flows
│   ├── lib/                # Utility functions and libraries
│   └── hooks/              # Custom React hooks
├── public/                 # Static assets
└── tailwind.config.ts    # Tailwind CSS configuration
```

## ⚙️ Getting Started

This is a Next.js project bootstrapped with `create-next-app`.

To run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

You can start editing the main page by modifying `src/app/page.tsx`.

## 📜 Available Scripts

-   `npm run dev`: Starts the Next.js development server with Turbopack.
-   `npm run build`: Builds the application for production.
-   `npm run start`: Starts a production server.
-   `npm run lint`: Runs the linter to check for code quality issues.
-   `npm run genkit:dev`: Starts the Genkit development server for testing AI flows.

flowchart TD

    %% === Data Sources ===
    subgraph A["🛰️ Data Sources"]
        NET["Network Traffic Logs"]
        SYS["System Logs"]
        DB["Database Queries"]
    end

    %% === Backend AI Layer ===
    subgraph B["🤖 AI & Backend Layer"]
        direction TB
        ML["AI-Powered Anomaly Detection (Genkit + ML Models)"]
        NLP["Natural Language Log Analysis (NLP Engine)"]
        ADAPT["Adaptive AI Defense (Self-Learning Module)"]
        API["Next.js API Routes / Firebase Functions"]
        
        NET --> ML
        SYS --> NLP
        DB --> ML
        ML --> ADAPT
        NLP --> API
        ADAPT --> API
    end

    %% === Frontend Layer ===
    subgraph C["💻 Frontend Layer (Next.js + TypeScript)"]
        direction TB
        DASH["Real-time Threat Dashboard"]
        CHARTS["Interactive Charts (Recharts)"]
        UI["Responsive UI (ShadCN + Tailwind CSS)"]
        HOOKS["Custom Hooks & Utilities"]
        THEMES["Light/Dark Mode"]
        DASH --> CHARTS
        DASH --> UI
        DASH --> HOOKS
        UI --> THEMES
    end

    %% === Communication ===
    API --> DASH
    DASH <--> USER["Security Analyst / Admin"]

    %% === Project Structure ===
    subgraph D["📁 Project Structure (src/)"]
        APP["app/ - Pages & Layout"]
        COMPONENTS["components/ - Dashboard, Layout, Tools, UI"]
        AI["ai/flows - Genkit AI Flows"]
        LIB["lib/ - Utilities & Functions"]
        HOOKS_DIR["hooks/ - Custom React Hooks"]
    end

    %% === Relations between code structure and app layers ===
    D --> C
    D --> B

    %% === Deployment ===
    subgraph E["🚀 Deployment"]
        VERCEL["Vercel / Firebase Hosting"]
        BUILD["npm run build & start"]
    end
    C --> E
    B --> E
