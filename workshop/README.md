# GitHub Copilot Hackathon Workshop

> **4+ hours** of hands-on content for **~70 C#/.NET developers** to hack GitHub Copilot capabilities.

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** — for the workshop portal
- **.NET 8 SDK** — for C# exercises
- **VS Code** with GitHub Copilot extension
- **GitHub account** with Copilot access

### Run the Workshop Portal

```bash
cd workshop

# Install dependencies
npm install

# Start both frontend and backend
npm run dev
```

The portal opens at **http://localhost:5173**. The API runs on port 3001.

## 📋 Workshop Agenda

| Module | Title | Duration | Focus |
|--------|-------|----------|-------|
| 1 | Welcome & Setup | 30 min | Environment, Copilot basics |
| 2 | **Build a Web App from Scratch** ⭐ | 60 min | Plan Mode, scaffolding, iteration |
| 3 | Modernizing Legacy C# | 45 min | Async, DI, refactoring |
| 4 | Custom Instructions | 45 min | copilot-instructions.md, standards |
| 5 | Agents, Skills, MCP & Hooks | 60 min | Custom agents, hooks |
| 6 | Hackathon Challenge | 60+ min | Team competition, Plan Mode |

## 🎯 Key Feature: Plan Mode Experience

**Module 2** is the centerpiece — participants create a complete ASP.NET Core + React web app from scratch using only Copilot prompts:

1. Enter Plan Mode → describe the app
2. Review the generated plan → provide feedback
3. Approve → Copilot scaffolds everything
4. Iterate → add features through conversation
5. Run & test → a complete app with zero manual coding

## 👥 Facilitator Tips

### Before the Workshop
- [ ] Verify all participant machines have VS Code, Copilot, .NET 8, Node.js
- [ ] Run `npm install` and test the portal locally
- [ ] Pre-clone this repo on a shared drive or provide the GitHub link
- [ ] Test the exercises on your machine end-to-end
- [ ] Prepare a backup hotspot — Copilot needs internet

### During the Workshop
- **Module 1**: Walk through setup as a group. Ensure everyone's Copilot is responding.
- **Module 2**: Do a live demo first, then let participants try. This is the "wow" moment.
- **Module 3**: Pair up participants who are stuck — legacy code resonates with experienced devs.
- **Module 4**: Show the before/after difference of having instructions files.
- **Module 5**: This is advanced — have 2-3 helpers circulating.
- **Module 6**: Keep energy high! Use the timer. Walk around and help teams get unstuck.

### Timing
- Start with 5 min buffer per module
- Module 2 always runs long — that's fine, it's the best part
- Module 6 can expand or contract based on available time
- Build in a 15-min break between Modules 3 and 4

### For Legacy-Background Participants
- Emphasize: "Copilot understands your existing code — it meets you where you are"
- Module 3 is designed specifically for developers familiar with DataTable, SqlConnection, etc.
- Highlight how instructions let teams encode their standards so Copilot follows them

## 📁 Repository Structure

```
workshop/
├── frontend/           # React + Vite + TailwindCSS portal
├── backend/            # Express + SQLite progress tracking API
├── exercises/          # Starter code for each module
│   ├── module-2-plan-mode/
│   ├── module-3-legacy-code/
│   ├── module-4-instructions/
│   └── module-5-agents/
└── package.json        # Root workspace
```

## 🔗 Resources
- [awesome-copilot](https://github.com/github/awesome-copilot) — Community agents, instructions, skills
- [GitHub Copilot Docs](https://docs.github.com/copilot)
- [C# Expert Agent](https://github.com/github/awesome-copilot/blob/main/agents/CSharpExpert.agent.md)

## 📄 License
This workshop content is provided for educational use.
