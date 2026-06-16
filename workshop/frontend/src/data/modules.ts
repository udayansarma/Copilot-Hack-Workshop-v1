export interface Exercise {
  title: string;
  description: string;
  steps: string[];
  hints: string[];
  codeSnippet?: string;
  language?: string;
  estimatedMinutes: number;
}

export interface ModuleData {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  icon: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  color: 'green' | 'blue' | 'orange' | 'purple';
  description: string;
  learningObjectives: string[];
  concepts: string[];
  exercises: Exercise[];
}

export const modules: ModuleData[] = [
  {
    id: 'welcome-setup',
    number: 1,
    title: 'Welcome & Setup',
    subtitle: 'Get your environment ready and meet Copilot',
    icon: '🚀',
    duration: '30 min',
    difficulty: 'Beginner',
    color: 'green',
    description:
      'Set up your development environment, verify GitHub Copilot is working, and take a quick tour of its core features: code completions, inline chat, and Copilot Chat panel.',
    learningObjectives: [
      'Verify VS Code + Copilot extension is configured',
      'Understand the difference between completions, inline chat, and Chat panel',
      'Generate your first C# project with Copilot assistance',
    ],
    concepts: ['Code Completions', 'Inline Chat', 'Chat Panel', 'Ghost Text'],
    exercises: [
      {
        title: 'Hello Copilot — Your First C# App',
        description:
          'Use Copilot to generate a C# console application that prints a greeting. Start typing and let Copilot complete the code for you.',
        steps: [
          'Open VS Code and create a new folder called "hello-copilot"',
          'Open the terminal and run: dotnet new console',
          'Open Program.cs and delete all existing code',
          'Type the comment: // Create a console app that asks for the user\'s name and greets them',
          'Watch Copilot suggest the implementation — press Tab to accept',
          'Run with: dotnet run',
        ],
        hints: [
          'If Copilot doesn\'t suggest, press Ctrl+Space to trigger completions',
          'Try opening Copilot Chat (Ctrl+Shift+I) and asking: "Create a greeting console app in C#"',
          'You can also use inline chat (Ctrl+I) directly in the editor',
        ],
        codeSnippet: `// Create a console app that asks for the user's name and greets them
Console.Write("What is your name? ");
string name = Console.ReadLine() ?? "World";
Console.WriteLine($"Hello, {name}! Welcome to the Copilot Hackathon! 🤖");`,
        language: 'csharp',
        estimatedMinutes: 10,
      },
      {
        title: 'Explore Copilot Features',
        description: 'Try each Copilot interaction mode and observe the differences.',
        steps: [
          'Ghost Text: Start typing a method and watch suggestions appear',
          'Inline Chat (Ctrl+I): Select code and ask "explain this" or "add error handling"',
          'Chat Panel (Ctrl+Shift+I): Ask "What design patterns should I use for a REST API?"',
          'Try @workspace to reference your project context in chat',
        ],
        hints: [
          'Ghost text is best for line-by-line coding',
          'Inline chat is great for targeted refactoring',
          'Chat panel excels at architectural questions and multi-file changes',
        ],
        estimatedMinutes: 15,
      },
    ],
  },
  {
    id: 'plan-mode-webapp',
    number: 2,
    title: 'Build a Web App from Scratch',
    subtitle: 'Use Plan Mode to create a full-stack app with zero manual coding',
    icon: '⭐',
    duration: '60 min',
    difficulty: 'Intermediate',
    color: 'blue',
    description:
      'The centerpiece exercise! Start from a blank slate, enter Copilot\'s Plan Mode, describe the app you want, review the generated plan, approve it, and watch Copilot scaffold a complete ASP.NET Core + React application. Then iterate with prompts to add features.',
    learningObjectives: [
      'Use Copilot CLI\'s plan mode to design an application architecture',
      'Review, refine, and approve an AI-generated implementation plan',
      'Scaffold a full-stack C# + React project through prompts alone',
      'Iterate on a running app by adding features through conversation',
    ],
    concepts: ['Plan Mode', 'Prompt Engineering', 'Iterative Development', 'Full-Stack Scaffolding'],
    exercises: [
      {
        title: 'Step 1 — Enter Plan Mode & Describe Your App',
        description:
          'Open Copilot CLI and start in plan mode. Describe the web app you want to build.',
        steps: [
          'Open Copilot CLI in a new empty directory',
          'Your prompt will be processed in plan mode automatically',
          'Type your prompt: "Create an ASP.NET Core 8 Web API with a React frontend for a team task manager. Include CRUD operations, SQLite database, and a clean responsive UI."',
          'Copilot will generate a structured implementation plan',
          'Read through every section of the plan carefully',
        ],
        hints: [
          'Be specific in your prompt — mention the tech stack, database, and key features',
          'The more context you give, the better the plan',
          'Example: mention "pagination", "search", "dark mode" if you want those features',
        ],
        codeSnippet: `// Example prompt for Plan Mode:
// 
// "Create an ASP.NET Core 8 Web API with a React + TailwindCSS frontend
// for managing a team task board. Requirements:
// - SQLite database with Entity Framework Core
// - CRUD operations for tasks (title, description, status, assignee)
// - Task statuses: Todo, In Progress, Done
// - RESTful API with proper error handling
// - Responsive UI with drag-and-drop between columns
// - Dark mode support"`,
        language: 'csharp',
        estimatedMinutes: 10,
      },
      {
        title: 'Step 2 — Review & Refine the Plan',
        description:
          'Copilot presents a plan with file structure, approach, and implementation steps. Review it, ask for changes, and approve when satisfied.',
        steps: [
          'Read the generated plan — it includes file structure, approach, and todos',
          'If something is missing, type feedback: "Also add JWT authentication" or "Use PostgreSQL instead"',
          'Copilot will update the plan based on your feedback',
          'When satisfied, approve the plan to start implementation',
        ],
        hints: [
          'Don\'t just approve blindly — the review step is where you shape the architecture',
          'Ask Copilot to explain trade-offs: "Why SQLite over PostgreSQL for this use case?"',
          'You can ask for the plan to be simplified or expanded',
        ],
        estimatedMinutes: 10,
      },
      {
        title: 'Step 3 — Watch Copilot Build & Then Iterate',
        description:
          'After approval, Copilot implements the plan. Then iterate by adding features through conversation.',
        steps: [
          'Copilot creates all the files from the plan — watch it work',
          'Once done, run the app: dotnet run (backend) and npm run dev (frontend)',
          'Open the browser and verify the app works',
          'Now iterate! Ask Copilot to: "Add a search bar to filter tasks"',
          'Then: "Add input validation — task title must be 3-100 characters"',
          'Then: "Add a confirmation dialog before deleting a task"',
        ],
        hints: [
          'Each prompt should focus on one feature at a time',
          'If something breaks, describe the error to Copilot — it can fix it',
          'Try: "The delete button doesn\'t work, here\'s the error: ..."',
        ],
        codeSnippet: `// What you'll end up with — a complete TaskController.cs:
[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _context;

    public TasksController(AppDbContext context) => _context = context;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks(
        [FromQuery] string? search,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        var query = _context.Tasks.AsQueryable();
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(t => t.Title.Contains(search));
        
        return await query
            .OrderByDescending(t => t.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }
}`,
        language: 'csharp',
        estimatedMinutes: 30,
      },
      {
        title: 'Step 4 — Debrief & Reflection',
        description:
          'You just built a full-stack app without writing a single line of code manually! Discuss what worked, what surprised you, and how this changes your workflow.',
        steps: [
          'Count how many files Copilot created for you',
          'Review the code quality — does it follow C# best practices?',
          'Discuss with your neighbor: What would you do differently?',
          'Think about: How could Plan Mode help with your real projects?',
        ],
        hints: [
          'Compare the generated code with your team\'s coding standards',
          'Notice: Copilot follows async/await, DI, and proper error handling',
          'Key insight: Plan Mode is most powerful for greenfield projects and prototyping',
        ],
        estimatedMinutes: 10,
      },
    ],
  },
  {
    id: 'modernize-legacy',
    number: 3,
    title: 'Modernizing Legacy C# Code',
    subtitle: 'Transform old-school C# into modern, maintainable code',
    icon: '🔄',
    duration: '45 min',
    difficulty: 'Intermediate',
    color: 'orange',
    description:
      'Learn to use Copilot as your modernization partner. Take legacy C# code with synchronous data access, tight coupling, and no error handling — and transform it into clean, modern C# with async/await, dependency injection, nullable reference types, and proper patterns.',
    learningObjectives: [
      'Use Copilot Chat to understand unfamiliar legacy code',
      'Refactor synchronous code to async/await patterns',
      'Introduce dependency injection where tight coupling exists',
      'Apply nullable reference types and modern C# features',
    ],
    concepts: ['Async/Await', 'Dependency Injection', 'Repository Pattern', 'Nullable Reference Types', 'Records'],
    exercises: [
      {
        title: 'Understand the Legacy Code',
        description:
          'Open the legacy data access layer and use Copilot to explain what it does, identify anti-patterns, and suggest improvements.',
        steps: [
          'Open exercises/module-3-legacy-code/LegacyDataAccess.cs',
          'Select all the code and use Copilot Chat: "Explain this code and list all anti-patterns"',
          'Ask: "What modern C# patterns should replace this?"',
          'Ask: "Create a migration plan from this legacy code to modern C#"',
        ],
        hints: [
          'Look for: SqlConnection created in every method, no using statements, string concatenation in SQL',
          'Copilot should identify: no async, no DI, SQL injection risk, no error handling',
        ],
        codeSnippet: `// LEGACY CODE — Full of anti-patterns!
public class CustomerDataAccess
{
    private string connectionString = "Server=.;Database=CRM;Trusted_Connection=True;";
    
    public DataTable GetCustomers()
    {
        SqlConnection conn = new SqlConnection(connectionString);
        conn.Open();
        SqlCommand cmd = new SqlCommand("SELECT * FROM Customers", conn);
        SqlDataAdapter adapter = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        adapter.Fill(dt);
        conn.Close();
        return dt;
    }
    
    public void AddCustomer(string name, string email)
    {
        SqlConnection conn = new SqlConnection(connectionString);
        conn.Open();
        SqlCommand cmd = new SqlCommand(
            "INSERT INTO Customers (Name, Email) VALUES ('" + name + "', '" + email + "')", conn);
        cmd.ExecuteNonQuery();
        conn.Close();
    }
}`,
        language: 'csharp',
        estimatedMinutes: 10,
      },
      {
        title: 'Modernize with Copilot',
        description:
          'Use Copilot to transform the legacy code step by step into modern C#.',
        steps: [
          'Ask Copilot: "Refactor this to use async/await, IDbConnection injection, and parameterized queries"',
          'Ask: "Create a Customer record type and ICustomerRepository interface"',
          'Ask: "Add nullable reference types and proper error handling"',
          'Ask: "Write xUnit tests for the new repository"',
          'Compare the before/after — notice the improvement in safety, readability, and testability',
        ],
        hints: [
          'Ask Copilot to do one transformation at a time — don\'t try to change everything at once',
          'Reference the CSharpExpert agent pattern: async naming, DI patterns, records for DTOs',
        ],
        codeSnippet: `// MODERN CODE — What Copilot should help you create:
public record Customer(int Id, string Name, string Email, DateTime CreatedAt);

public interface ICustomerRepository
{
    Task<IReadOnlyList<Customer>> GetAllAsync(CancellationToken ct = default);
    Task<Customer?> GetByIdAsync(int id, CancellationToken ct = default);
    Task<int> CreateAsync(Customer customer, CancellationToken ct = default);
}

public class CustomerRepository : ICustomerRepository
{
    private readonly IDbConnection _connection;
    
    public CustomerRepository(IDbConnection connection)
    {
        ArgumentNullException.ThrowIfNull(connection);
        _connection = connection;
    }
    
    public async Task<IReadOnlyList<Customer>> GetAllAsync(CancellationToken ct = default)
    {
        const string sql = "SELECT Id, Name, Email, CreatedAt FROM Customers";
        var results = await _connection.QueryAsync<Customer>(sql);
        return results.ToList().AsReadOnly();
    }
}`,
        language: 'csharp',
        estimatedMinutes: 30,
      },
    ],
  },
  {
    id: 'custom-instructions',
    number: 4,
    title: 'Custom Instructions & Standards',
    subtitle: 'Teach Copilot your team\'s coding standards',
    icon: '📋',
    duration: '45 min',
    difficulty: 'Intermediate',
    color: 'purple',
    description:
      'Learn to create custom instruction files that make Copilot follow your team\'s coding conventions automatically. Write .github/copilot-instructions.md for project-wide rules and .instructions.md files for file-pattern-specific guidance.',
    learningObjectives: [
      'Understand the instruction file hierarchy (repo → folder → file)',
      'Write effective copilot-instructions.md for C# projects',
      'Create pattern-specific .instructions.md files',
      'See how instructions change Copilot\'s suggestions in real-time',
    ],
    concepts: ['copilot-instructions.md', '.instructions.md', 'Coding Standards', 'Pattern Matching'],
    exercises: [
      {
        title: 'Create Project-Level Instructions',
        description:
          'Write a .github/copilot-instructions.md file that enforces your team\'s C# coding standards.',
        steps: [
          'Create .github/copilot-instructions.md in your Module 2 project',
          'Add rules for: async naming convention, DI patterns, error handling style',
          'Add rules for: nullable reference types, record types for DTOs',
          'Test by asking Copilot to generate a new service class — observe it follows your rules',
        ],
        hints: [
          'Be specific! "Use async/await" is less effective than "All async methods must end with Async suffix"',
          'Include examples of good and bad patterns',
          'Reference: github/awesome-copilot/instructions/ for community examples',
        ],
        codeSnippet: `# .github/copilot-instructions.md

## C# Coding Standards

### Async Programming
- All async methods MUST end with the \`Async\` suffix
- Always accept \`CancellationToken\` as the last parameter
- Use \`ConfigureAwait(false)\` in library code
- Never use \`async void\` except for event handlers

### Error Handling  
- Use \`ArgumentNullException.ThrowIfNull()\` for null checks
- Never catch base \`Exception\` — use specific types
- Always include context in exception messages

### Types & Patterns
- Use \`record\` types for DTOs and value objects
- Prefer \`IReadOnlyList<T>\` over \`List<T>\` in return types
- Use file-scoped namespaces
- Use primary constructors where appropriate

### Naming
- Interfaces: prefix with \`I\` (e.g., \`ICustomerRepository\`)
- Private fields: prefix with \`_\` (e.g., \`_logger\`)
- Constants: PascalCase (e.g., \`MaxRetryCount\`)`,
        language: 'markdown',
        estimatedMinutes: 20,
      },
      {
        title: 'Create Pattern-Specific Instructions',
        description:
          'Write .instructions.md files that apply different rules to different file types.',
        steps: [
          'Create a .instructions.md file in your Controllers/ folder',
          'Add API-specific rules: always return ActionResult<T>, use [ProducesResponseType]',
          'Create another .instructions.md in your Tests/ folder',
          'Add test-specific rules: use AAA pattern, one assert per test',
          'Generate code in each folder and verify Copilot follows the local instructions',
        ],
        hints: [
          '.instructions.md files apply to all files in the same directory and subdirectories',
          'They stack with the project-level instructions — more specific wins',
          'Try: "Generate a new controller for Products" in the Controllers/ folder',
        ],
        estimatedMinutes: 20,
      },
    ],
  },
  {
    id: 'agents-skills-mcp',
    number: 5,
    title: 'Agents, Skills, MCP & Hooks',
    subtitle: 'Extend Copilot with custom agents and tools',
    icon: '🤖',
    duration: '60 min',
    difficulty: 'Advanced',
    color: 'blue',
    description:
      'Dive into the extensibility layer of GitHub Copilot. Build custom agents that specialize in specific tasks, create skill packs, connect external tools via MCP (Model Context Protocol), and automate actions with hooks.',
    learningObjectives: [
      'Build a custom Copilot agent using .agent.md files',
      'Understand skills as reusable instruction bundles',
      'Connect external tools via MCP servers',
      'Create hooks for automated pre/post actions',
    ],
    concepts: ['Agents', 'Skills', 'MCP Servers', 'Hooks', 'Agentic Workflows'],
    exercises: [
      {
        title: 'Build a C# Code Review Agent',
        description:
          'Create a custom Copilot agent that specializes in reviewing C# code for legacy anti-patterns.',
        steps: [
          'Create a file: .github/agents/csharp-reviewer.agent.md',
          'Define the agent\'s persona, expertise, and behavior',
          'Include rules for detecting: SQL injection, sync-over-async, missing dispose',
          'Test the agent by asking it to review your Module 2 or Module 3 code',
          'Iterate on the agent\'s instructions based on the quality of reviews',
        ],
        hints: [
          'Look at the CSharpExpert agent in awesome-copilot for inspiration',
          'Good agents are specific — "Review C# for security issues" beats "Review code"',
          'Include example inputs and expected outputs in the agent file',
        ],
        codeSnippet: `---
name: "C# Legacy Code Reviewer"
description: Reviews C# code for legacy anti-patterns and suggests modern alternatives.
---

You are a senior C#/.NET architect specializing in legacy code modernization.

When reviewing code, check for these anti-patterns:
1. **SQL Injection**: String concatenation in SQL queries → use parameterized queries
2. **Sync-over-Async**: .Result or .Wait() calls → use await
3. **Missing Dispose**: IDisposable not in using blocks → add using/await using
4. **Tight Coupling**: Direct new() of dependencies → use DI
5. **DataTable Usage**: DataTable/DataSet → use strongly-typed models
6. **No Cancellation**: Missing CancellationToken → add to all async methods

For each issue found, provide:
- 🔴 Severity (Critical / Warning / Info)
- 📍 Location (method and line)
- 🔧 Fix with code example`,
        language: 'markdown',
        estimatedMinutes: 25,
      },
      {
        title: 'Create a Pre-Commit Hook',
        description:
          'Set up a Copilot hook that automatically runs dotnet format before every commit.',
        steps: [
          'Create .github/hooks/pre-commit-format.yml',
          'Configure it to run "dotnet format" on staged .cs files',
          'Test by making a poorly-formatted change and committing',
          'Verify the hook reformats the code automatically',
        ],
        hints: [
          'Hooks run during Copilot agent sessions, not git hooks',
          'They can be pre-action or post-action triggers',
          'See awesome-copilot/hooks for community examples',
        ],
        codeSnippet: `# .github/hooks/pre-commit-format.yml
name: Format C# Code
description: Runs dotnet format on staged C# files before commit
trigger:
  event: pre-commit
  file_patterns:
    - "**/*.cs"
steps:
  - name: Format
    run: dotnet format --include {{staged_files}}
  - name: Re-stage
    run: git add {{staged_files}}`,
        language: 'yaml',
        estimatedMinutes: 15,
      },
    ],
  },
  {
    id: 'hackathon',
    number: 6,
    title: 'Hackathon Challenge',
    subtitle: 'Put it all together — build something amazing!',
    icon: '🏆',
    duration: '60+ min',
    difficulty: 'Advanced',
    color: 'green',
    description:
      'Form teams of 3-5, pick a challenge card, and build something real using everything you\'ve learned. All challenges MUST start with Plan Mode. Present your creation for peer voting and glory!',
    learningObjectives: [
      'Apply all Copilot techniques in a real project',
      'Collaborate effectively with AI-assisted development',
      'Present and demo your work to peers',
    ],
    concepts: ['Team Collaboration', 'Plan Mode', 'Full-Stack Development', 'Presentation Skills'],
    exercises: [
      {
        title: 'Pick Your Challenge & Plan',
        description:
          'Choose a challenge card and use Plan Mode to create your implementation plan.',
        steps: [
          'Form a team of 3-5 people',
          'Go to the Hackathon page and pick a challenge card',
          'Open Copilot CLI in a new project folder',
          'Use Plan Mode to describe your approach and get a plan',
          'Review and refine the plan as a team',
          'Approve and start building!',
        ],
        hints: [
          'Divide work: one person handles backend, one frontend, one tests',
          'Use Copilot agents and instructions from Module 4 & 5',
          'Don\'t try to build everything — focus on a working demo',
        ],
        estimatedMinutes: 60,
      },
    ],
  },
];

export interface ChallengeCard {
  id: string;
  title: string;
  description: string;
  difficulty: 'Standard' | 'Advanced' | 'Expert';
  tags: string[];
  suggestedPrompt: string;
}

export const challengeCards: ChallengeCard[] = [
  {
    id: 'legacy-api',
    title: '🏗️ Legacy API Modernizer',
    description:
      'Take the provided legacy WCF-style API and modernize it to ASP.NET Core 8 with proper REST conventions, OpenAPI docs, and unit tests.',
    difficulty: 'Standard',
    tags: ['C#', 'API', 'Refactoring'],
    suggestedPrompt:
      'Create an ASP.NET Core 8 Web API that replaces a legacy WCF service for customer management. Include Swagger/OpenAPI, input validation, and xUnit tests.',
  },
  {
    id: 'dashboard',
    title: '📊 Real-Time Dashboard',
    description:
      'Build a real-time monitoring dashboard with SignalR for live updates, showing system metrics in a beautiful responsive UI.',
    difficulty: 'Advanced',
    tags: ['C#', 'SignalR', 'React', 'Real-time'],
    suggestedPrompt:
      'Create an ASP.NET Core app with SignalR and a React frontend that displays a real-time dashboard of server metrics (CPU, memory, requests/sec) with auto-updating charts.',
  },
  {
    id: 'agent-builder',
    title: '🤖 Custom Agent Suite',
    description:
      'Build a suite of 3+ custom Copilot agents tailored for your team: code reviewer, doc generator, test writer.',
    difficulty: 'Standard',
    tags: ['Agents', 'Instructions', 'Automation'],
    suggestedPrompt:
      'Create a collection of Copilot agent files: a C# code reviewer, an API documentation generator, and a test scaffolder. Each should have specific rules and examples.',
  },
  {
    id: 'fullstack-app',
    title: '🌐 Full-Stack CRUD App',
    description:
      'Build a complete full-stack application from scratch using only Copilot prompts. Must include auth, CRUD, validation, and tests.',
    difficulty: 'Advanced',
    tags: ['C#', 'React', 'Full-Stack', 'Plan Mode'],
    suggestedPrompt:
      'Build a full-stack inventory management system: ASP.NET Core 8 API + React frontend, with JWT auth, CRUD for products & categories, search, pagination, and xUnit tests.',
  },
  {
    id: 'cli-tool',
    title: '⚡ Developer CLI Tool',
    description:
      'Build a CLI tool in C# that helps developers with common tasks: project scaffolding, code analysis, or dependency auditing.',
    difficulty: 'Standard',
    tags: ['C#', 'CLI', 'Tools'],
    suggestedPrompt:
      'Create a C# CLI tool using System.CommandLine that analyzes a .NET solution for code quality: checks for async anti-patterns, missing null checks, and generates a report.',
  },
  {
    id: 'microservices',
    title: '🔮 Microservices Starter',
    description:
      'Design and build a microservices architecture with 2-3 services, API gateway, and service communication via message queue.',
    difficulty: 'Expert',
    tags: ['C#', 'Microservices', 'Architecture'],
    suggestedPrompt:
      'Design a microservices architecture with: an Order Service, Inventory Service, and API Gateway using ASP.NET Core. Use RabbitMQ for inter-service communication and Docker Compose for orchestration.',
  },
];
