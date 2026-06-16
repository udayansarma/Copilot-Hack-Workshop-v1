export interface AwesomeCopilotResource {
  name: string;
  description: string;
  installCommand: string;
  type: 'agent' | 'instruction' | 'skill' | 'plugin' | 'hook' | 'workflow';
  url: string;
}

export interface CapabilitySection {
  id: string;
  icon: string;
  title: string;
  description: string;
  howItWorks: string[];
  resources: AwesomeCopilotResource[];
  exercise: {
    title: string;
    steps: string[];
  };
}

export const capabilitySections: CapabilitySection[] = [
  {
    id: 'agents',
    icon: '🤖',
    title: 'Agents — Specialized AI Assistants',
    description:
      'Agents are .agent.md files that specialize Copilot for specific tasks. They define a persona, expertise, and behavioral rules.',
    howItWorks: [
      'Each agent is a single markdown file with YAML frontmatter',
      'Place in your repo\'s .github/agents/ directory',
      'Agents can connect to MCP servers for external tool access',
      'Access via VS Code Chat or Copilot CLI',
    ],
    resources: [
      {
        name: 'C# Expert',
        description: 'Foundational agent for C#/.NET — covers async, SOLID, testing, performance',
        installCommand: 'curl -o .github/agents/CSharpExpert.agent.md https://raw.githubusercontent.com/github/awesome-copilot/main/agents/CSharpExpert.agent.md',
        type: 'agent',
        url: 'https://github.com/github/awesome-copilot/blob/main/agents/CSharpExpert.agent.md',
      },
      {
        name: '.NET Upgrade',
        description: 'Cleanup, modernization, and tech debt remediation for C#/.NET code',
        installCommand: 'curl -o .github/agents/dotnet-upgrade.agent.md https://raw.githubusercontent.com/github/awesome-copilot/main/agents/dotnet-upgrade.agent.md',
        type: 'agent',
        url: 'https://github.com/github/awesome-copilot/blob/main/agents/dotnet-upgrade.agent.md',
      },
      {
        name: '.NET Self-Learning Architect',
        description: 'Senior .NET architect for complex delivery — designs systems, captures lessons',
        installCommand: 'curl -o .github/agents/dotnet-self-learning-architect.agent.md https://raw.githubusercontent.com/github/awesome-copilot/main/agents/dotnet-self-learning-architect.agent.md',
        type: 'agent',
        url: 'https://github.com/github/awesome-copilot/blob/main/agents/dotnet-self-learning-architect.agent.md',
      },
      {
        name: 'API Architect',
        description: 'Mentors engineers on API design with guidance and working code',
        installCommand: 'curl -o .github/agents/api-architect.agent.md https://raw.githubusercontent.com/github/awesome-copilot/main/agents/api-architect.agent.md',
        type: 'agent',
        url: 'https://github.com/github/awesome-copilot/blob/main/agents/api-architect.agent.md',
      },
    ],
    exercise: {
      title: 'Install & Test the C# Expert Agent',
      steps: [
        'Create .github/agents/ directory in your project',
        'Download the C# Expert agent using the install command above',
        'Open VS Code Chat and invoke: @csharp-expert Review this controller for anti-patterns',
        'Compare responses with and without the agent active',
      ],
    },
  },
  {
    id: 'instructions',
    icon: '📋',
    title: 'Instructions — Team Coding Standards',
    description:
      'Instructions are .instructions.md files that automatically guide Copilot to follow your team\'s coding standards.',
    howItWorks: [
      'Project-level: .github/copilot-instructions.md — applies to entire repo',
      'Folder-level: .instructions.md — applies to that directory and subdirectories',
      'Task-specific: .github/instructions/*.instructions.md — applies via applyTo globs',
      'Instructions stack — more specific overrides general',
    ],
    resources: [
      {
        name: '.NET Framework Development',
        description: 'Project structure, C# language version, NuGet management, best practices',
        installCommand: 'curl -o .github/instructions/dotnet-framework.instructions.md https://raw.githubusercontent.com/github/awesome-copilot/main/instructions/dotnet-framework.instructions.md',
        type: 'instruction',
        url: 'https://github.com/github/awesome-copilot/blob/main/instructions/dotnet-framework.instructions.md',
      },
      {
        name: 'ASP.NET REST API Development',
        description: 'REST conventions, controller patterns, OpenAPI docs, error handling',
        installCommand: 'curl -o .github/instructions/aspnet-rest-apis.instructions.md https://raw.githubusercontent.com/github/awesome-copilot/main/instructions/aspnet-rest-apis.instructions.md',
        type: 'instruction',
        url: 'https://github.com/github/awesome-copilot/blob/main/instructions/aspnet-rest-apis.instructions.md',
      },
      {
        name: 'Azure Functions C#',
        description: 'Isolated worker model, bindings, DI in Azure Functions',
        installCommand: 'curl -o .github/instructions/azure-functions-csharp.instructions.md https://raw.githubusercontent.com/github/awesome-copilot/main/instructions/azure-functions-csharp.instructions.md',
        type: 'instruction',
        url: 'https://github.com/github/awesome-copilot/blob/main/instructions/azure-functions-csharp.instructions.md',
      },
      {
        name: 'Azure Durable Functions C#',
        description: 'Orchestrator functions, activity functions, fan-out/fan-in patterns',
        installCommand: 'curl -o .github/instructions/azure-durable-functions-csharp.instructions.md https://raw.githubusercontent.com/github/awesome-copilot/main/instructions/azure-durable-functions-csharp.instructions.md',
        type: 'instruction',
        url: 'https://github.com/github/awesome-copilot/blob/main/instructions/azure-durable-functions-csharp.instructions.md',
      },
      {
        name: '.NET Framework Upgrade Specialist',
        description: 'Progressive migration from .NET Framework to modern .NET',
        installCommand: 'curl -o .github/instructions/dotnet-upgrade.instructions.md https://raw.githubusercontent.com/github/awesome-copilot/main/instructions/dotnet-upgrade.instructions.md',
        type: 'instruction',
        url: 'https://github.com/github/awesome-copilot/blob/main/instructions/dotnet-upgrade.instructions.md',
      },
    ],
    exercise: {
      title: 'Install & Compare Instructions',
      steps: [
        'Ask Copilot to generate a service class WITHOUT any instructions installed — save the output',
        'Download the ASP.NET REST API instructions using the command above',
        'Ask the same question again WITH instructions active',
        'Compare the two outputs — see how instructions change Copilot\'s behavior',
      ],
    },
  },
  {
    id: 'skills',
    icon: '🎯',
    title: 'Skills — Self-Contained Task Bundles',
    description:
      'Skills are folders with a SKILL.md file plus bundled assets (scripts, templates, reference data). They provide deep expertise for specialized tasks.',
    howItWorks: [
      'Each skill is a folder containing a SKILL.md instruction file',
      'Skills can include helper scripts, code templates, and reference data',
      'Install via GitHub CLI: gh skills install github/awesome-copilot <skill-name>',
      'Skills are loaded on-demand when relevant to a task',
    ],
    resources: [
      {
        name: '.NET Aspire',
        description: 'AppHost orchestration, service discovery, integrations, dashboard, deployment (9 reference files)',
        installCommand: 'gh skills install github/awesome-copilot aspire',
        type: 'skill',
        url: 'https://github.com/github/awesome-copilot/tree/main/skills/aspire',
      },
      {
        name: 'ASP.NET Minimal API + OpenAPI',
        description: 'Create Minimal API endpoints with proper OpenAPI documentation',
        installCommand: 'gh skills install github/awesome-copilot aspnet-minimal-api-openapi',
        type: 'skill',
        url: 'https://github.com/github/awesome-copilot/tree/main/skills/aspnet-minimal-api-openapi',
      },
      {
        name: 'App Insights Instrumentation',
        description: 'Instrument web apps for Azure Application Insights telemetry (ASP.NET Core, Node.js, Python)',
        installCommand: 'gh skills install github/awesome-copilot appinsights-instrumentation',
        type: 'skill',
        url: 'https://github.com/github/awesome-copilot/tree/main/skills/appinsights-instrumentation',
      },
      {
        name: 'Architecture Blueprint Generator',
        description: 'Analyze codebases to create architectural documentation with diagrams',
        installCommand: 'gh skills install github/awesome-copilot architecture-blueprint-generator',
        type: 'skill',
        url: 'https://github.com/github/awesome-copilot/tree/main/skills/architecture-blueprint-generator',
      },
      {
        name: 'AI-Ready Repo Setup',
        description: 'Generate AGENTS.md, copilot-instructions.md, CI workflows customized to your stack',
        installCommand: 'gh skills install github/awesome-copilot ai-ready',
        type: 'skill',
        url: 'https://github.com/github/awesome-copilot/tree/main/skills/ai-ready',
      },
    ],
    exercise: {
      title: 'Install the Aspire Skill',
      steps: [
        'Run: gh skills install github/awesome-copilot aspire',
        'Ask Copilot: "Set up an Aspire AppHost for my web API and database"',
        'Notice the deep Aspire knowledge in responses — accurate orchestration code',
        'Explore the bundled reference files the skill installed',
      ],
    },
  },
  {
    id: 'plugins',
    icon: '🔌',
    title: 'Plugins — Curated Agent+Skill Bundles',
    description:
      'Plugins bundle related agents and skills into themed packages — the easiest way to adopt a comprehensive toolkit.',
    howItWorks: [
      'Plugins are curated bundles of agents and skills for specific workflows',
      'Awesome Copilot is a default marketplace — no setup required',
      'Install via CLI: copilot plugin install <name>@awesome-copilot',
      'Browse in VS Code: Extensions view → @agentPlugins',
    ],
    resources: [
      {
        name: 'C# and .NET Development',
        description: 'Essential prompts, instructions, and chat modes for C#/.NET (9 items)',
        installCommand: 'copilot plugin install csharp-dotnet-development@awesome-copilot',
        type: 'plugin',
        url: 'https://github.com/github/awesome-copilot/tree/main/plugins/csharp-dotnet-development',
      },
      {
        name: 'OpenAPI → C#/.NET App',
        description: 'Generate production-ready .NET apps from OpenAPI specs (2 items)',
        installCommand: 'copilot plugin install openapi-to-application-csharp-dotnet@awesome-copilot',
        type: 'plugin',
        url: 'https://github.com/github/awesome-copilot/tree/main/plugins/openapi-to-application-csharp-dotnet',
      },
      {
        name: 'Copilot SDK',
        description: 'Build apps with the GitHub Copilot SDK in C#, Go, Node.js, Python',
        installCommand: 'copilot plugin install copilot-sdk@awesome-copilot',
        type: 'plugin',
        url: 'https://github.com/github/awesome-copilot/tree/main/plugins/copilot-sdk',
      },
      {
        name: 'Context Engineering',
        description: 'Maximize Copilot effectiveness through better context management (4 items)',
        installCommand: 'copilot plugin install context-engineering@awesome-copilot',
        type: 'plugin',
        url: 'https://github.com/github/awesome-copilot/tree/main/plugins/context-engineering',
      },
      {
        name: 'Project Planning',
        description: 'Feature breakdown, epic management, task organization (9 items)',
        installCommand: 'copilot plugin install project-planning@awesome-copilot',
        type: 'plugin',
        url: 'https://github.com/github/awesome-copilot/tree/main/plugins/project-planning',
      },
    ],
    exercise: {
      title: 'Install the C# Plugin',
      steps: [
        'Run: copilot plugin install csharp-dotnet-development@awesome-copilot',
        'Browse what got installed — agents and skills for C# development',
        'Ask Copilot to generate a service with EF Core — notice enhanced quality',
        'Try: copilot plugin install context-engineering@awesome-copilot for better prompts',
      ],
    },
  },
  {
    id: 'hooks',
    icon: '🪝',
    title: 'Hooks — Automated Session Actions',
    description:
      'Hooks are automated actions triggered during Copilot coding agent sessions — session start/end, tool usage, or prompts.',
    howItWorks: [
      'Each hook is a folder with hooks.json config + helper scripts',
      'Place in .github/hooks/ directory',
      'Events: sessionStart, sessionEnd, userPromptSubmitted, preToolUse, postToolUse',
      'Hooks run automatically during Copilot agent sessions',
    ],
    resources: [
      {
        name: 'Secrets Scanner',
        description: 'Scans modified files for leaked secrets and credentials at session end',
        installCommand: 'Copy hooks/secrets-scanner/ from awesome-copilot to .github/hooks/',
        type: 'hook',
        url: 'https://github.com/github/awesome-copilot/tree/main/hooks/secrets-scanner',
      },
      {
        name: 'Tool Guardian',
        description: 'Blocks dangerous operations (force push, DB drops) before execution',
        installCommand: 'Copy hooks/tool-guardian/ from awesome-copilot to .github/hooks/',
        type: 'hook',
        url: 'https://github.com/github/awesome-copilot/tree/main/hooks/tool-guardian',
      },
      {
        name: 'Dependency License Checker',
        description: 'Scans new dependencies for license compliance (GPL, AGPL)',
        installCommand: 'Copy hooks/dependency-license-checker/ from awesome-copilot to .github/hooks/',
        type: 'hook',
        url: 'https://github.com/github/awesome-copilot/tree/main/hooks/dependency-license-checker',
      },
      {
        name: 'Session Auto-Commit',
        description: 'Automatically commits and pushes changes when agent session ends',
        installCommand: 'Copy hooks/session-auto-commit/ from awesome-copilot to .github/hooks/',
        type: 'hook',
        url: 'https://github.com/github/awesome-copilot/tree/main/hooks/session-auto-commit',
      },
      {
        name: 'Governance Audit',
        description: 'Full audit trail — scans prompts for threats, logs all session activity',
        installCommand: 'Copy hooks/governance-audit/ from awesome-copilot to .github/hooks/',
        type: 'hook',
        url: 'https://github.com/github/awesome-copilot/tree/main/hooks/governance-audit',
      },
    ],
    exercise: {
      title: 'Install the Secrets Scanner',
      steps: [
        'Copy hooks/secrets-scanner/ from awesome-copilot to .github/hooks/',
        'Ensure scan script is executable: chmod +x .github/hooks/secrets-scanner/scan-secrets.sh',
        'Commit the hook to your repo',
        'Start a Copilot agent session, make changes, and check scanner output on session end',
      ],
    },
  },
  {
    id: 'workflows',
    icon: '⚡',
    title: 'Workflows — AI-Powered GitHub Actions',
    description:
      'Agentic Workflows are AI-powered automations defined in markdown that run coding agents inside GitHub Actions.',
    howItWorks: [
      'Each workflow is a .md file with YAML frontmatter + natural language instructions',
      'Install CLI: gh extension install github/gh-aw',
      'Compile to Actions: gh aw compile',
      'Triggers: schedules, events, slash commands',
    ],
    resources: [
      {
        name: 'Daily Issues Report',
        description: 'Daily summary of open issues and recent activity as a GitHub issue',
        installCommand: 'curl -o .github/workflows/daily-issues-report.md https://raw.githubusercontent.com/github/awesome-copilot/main/workflows/daily-issues-report.md && gh aw compile',
        type: 'workflow',
        url: 'https://github.com/github/awesome-copilot/blob/main/workflows/daily-issues-report.md',
      },
      {
        name: 'Relevance Check',
        description: 'Slash command to evaluate if an issue/PR is still relevant',
        installCommand: 'curl -o .github/workflows/relevance-check.md https://raw.githubusercontent.com/github/awesome-copilot/main/workflows/relevance-check.md && gh aw compile',
        type: 'workflow',
        url: 'https://github.com/github/awesome-copilot/blob/main/workflows/relevance-check.md',
      },
      {
        name: 'Weekly Comment Sync',
        description: 'Finds stale comments/README snippets and opens a draft PR with updates',
        installCommand: 'curl -o .github/workflows/weekly-comment-sync.md https://raw.githubusercontent.com/github/awesome-copilot/main/workflows/weekly-comment-sync.md && gh aw compile',
        type: 'workflow',
        url: 'https://github.com/github/awesome-copilot/blob/main/workflows/weekly-comment-sync.md',
      },
    ],
    exercise: {
      title: 'Install Daily Issues Report',
      steps: [
        'Install gh aw CLI: gh extension install github/gh-aw',
        'Download the workflow markdown file using the command above',
        'Compile: gh aw compile',
        'Commit both the .md and .lock.yml files',
        'Trigger manually: gh aw run daily-issues-report',
      ],
    },
  },
];
