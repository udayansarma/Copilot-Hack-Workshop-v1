# 🤖 GitHub Copilot Hackathon Workshop

> **4+ hours** of hands-on content for **~70 C#/.NET developers** to hack GitHub Copilot capabilities.

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/udayansarma/Copilot-Hack-Workshop-v1.git
cd Copilot-Hack-Workshop-v1/workshop

# Install dependencies
npm install

# Start both frontend and backend
npm run dev
```

The workshop portal opens at **http://localhost:5173**. The API runs on port **3001**.

## 📋 Workshop Modules

| # | Module | Duration | Focus |
|---|--------|----------|-------|
| 1 | Welcome & Setup | 30 min | Environment check, Copilot basics |
| 2 | **Build a Web App from Scratch** ⭐ | 60 min | Plan Mode — scaffold a full-stack C# app via prompts |
| 3 | Modernizing Legacy C# | 45 min | Async, DI, refactoring with Copilot Chat |
| 4 | Custom Instructions | 45 min | `.github/copilot-instructions.md`, team standards |
| 5 | Agents, Skills, MCP & Hooks | 60 min | Build agents, MCP servers, pre-commit hooks |
| 6 | Hackathon Challenge | 60+ min | Team competition with live leaderboard |

## 🎯 Key Feature: Plan Mode

**Module 2** is the centerpiece — participants create a complete ASP.NET Core + React web app from scratch using only Copilot prompts. No manual coding required.

## 📁 Repository Structure

```
├── workshop/
│   ├── frontend/           # React + Vite + TailwindCSS workshop portal
│   ├── backend/            # Express + SQLite progress tracking API
│   ├── exercises/          # Starter code & instructions per module
│   │   ├── module-2-plan-mode/
│   │   ├── module-3-legacy-code/    # Legacy C# with 8 anti-patterns
│   │   ├── module-4-instructions/   # copilot-instructions.md template
│   │   ├── module-5-agents/         # Code review agent example
│   │   └── awesome-copilot-guide/   # Integration guide for awesome-copilot
│   ├── package.json        # Root workspace (npm install here)
│   └── README.md           # Facilitator guide with agenda & tips
├── .github/
│   └── copilot-instructions.md  # Meta-example for the workshop repo
└── README.md               # ← You are here
```

## 📋 Prerequisites

- **Node.js 18+** — for the workshop portal
- **.NET 8 SDK** — for C# exercises
- **VS Code** with GitHub Copilot extension
- **GitHub account** with Copilot access

## 🔗 Resources

- [awesome-copilot](https://github.com/github/awesome-copilot) — Community agents, instructions, skills, plugins, hooks & workflows
- [GitHub Copilot Docs](https://docs.github.com/copilot)
- [C# Expert Agent](https://github.com/github/awesome-copilot/blob/main/agents/CSharpExpert.agent.md)

## 👥 Facilitators

See [`workshop/README.md`](workshop/README.md) for the full facilitator guide with timing, tips, and preparation checklist.

## 📄 License

This workshop content is provided for educational use.
