# Module 4: Custom Instructions

> ⏱️ **Duration:** 45 minutes | 🎯 **Difficulty:** Beginner–Intermediate | 👥 **Format:** Individual

## 🎯 Goal

Create instruction files that teach Copilot your team's C# coding standards. See the measurable difference in Copilot's output when instructions are present vs. absent.

## 📐 How Instructions Work

```mermaid
graph TD
    subgraph "Instruction Types (Stack Together)"
        A["🏢 Project-Level\n.github/copilot-instructions.md\nApplies to entire repo"]
        B["📁 Folder-Level\n.instructions.md in any dir\nApplies to dir + subdirectories"]
        C["🎯 Task-Specific\n.github/instructions/*.instructions.md\napplyTo: glob patterns"]
    end
    
    A --> D["Combined Context\nSent to Copilot with every request"]
    B --> D
    C --> D
    D --> E["Copilot generates code\nfollowing ALL active instructions"]
    
    style A fill:#238636,color:#fff
    style B fill:#1f6feb,color:#fff
    style C fill:#8957e5,color:#fff
    style E fill:#238636,color:#fff
```

### Instruction Hierarchy

```mermaid
flowchart TD
    subgraph "Your Repository"
        ROOT[".github/copilot-instructions.md\n— Project-wide rules —\nAsync patterns, naming, security"]
        
        SRC["src/.instructions.md\n— Source code rules —\nArchitecture patterns, DI"]
        TESTS["tests/.instructions.md\n— Test rules —\nxUnit, AAA pattern, naming"]
        API["src/Api/.instructions.md\n— API rules —\nREST conventions, validation"]
        
        TASK1[".github/instructions/\ncsharp.instructions.md\napplyTo: '**/*.cs'"]
        TASK2[".github/instructions/\ntests.instructions.md\napplyTo: '**/*Tests.cs'"]
    end
    
    ROOT --> SRC
    ROOT --> TESTS
    SRC --> API
    ROOT --> TASK1
    ROOT --> TASK2
    
    style ROOT fill:#238636,color:#fff
    style TASK1 fill:#8957e5,color:#fff
    style TASK2 fill:#8957e5,color:#fff
```

> 💡 **Key insight:** More specific instructions override general ones. Instructions **stack** — Copilot sees all applicable instructions for the current file.

## 📋 Exercise 1: Create Project-Level Instructions (15 min)

### Step 1: Create the File

Create `.github/copilot-instructions.md` in your project root:

```bash
mkdir -p .github
```

### Step 2: Add Your Team's Standards

Use the template in `copilot-instructions.md` (provided in this folder), or write your own. Here's the recommended template for C#/.NET teams:

```markdown
# C# Coding Standards

## Async Programming
- All async methods MUST end with the `Async` suffix
- Always accept `CancellationToken` as the last parameter
- Use `ConfigureAwait(false)` in library code
- Never use `async void` except for event handlers

## Error Handling
- Use `ArgumentNullException.ThrowIfNull()` for null checks
- Never catch base `Exception` — use specific exception types
- Always include context in exception messages
- No silent catches — log and rethrow or let bubble

## Types & Patterns
- Use `record` types for DTOs and value objects
- Prefer `IReadOnlyList<T>` over `List<T>` in return types
- Use file-scoped namespaces
- Use primary constructors where appropriate (C# 12+)

## Naming
- Interfaces: prefix with `I` (e.g., `ICustomerRepository`)
- Private fields: prefix with `_` (e.g., `_logger`)
- Constants: PascalCase (e.g., `MaxRetryCount`)
- Async methods: suffix with `Async`

## Security
- Never concatenate strings for SQL queries — use parameterized queries
- Validate all input at the API boundary
- Use `[Authorize]` on all controllers by default
```

## 📋 Exercise 2: Test With vs. Without Instructions (15 min)

This is the key learning moment — seeing the **measurable difference**.

### Step 1: Generate Code WITHOUT Instructions

1. **Temporarily rename** your instructions file: `copilot-instructions.md` → `copilot-instructions.md.bak`
2. Open a new C# file and ask Copilot Chat:

```
Create a service class called OrderService that:
- Fetches orders from a database
- Calculates total revenue
- Sends email notifications for high-value orders
- Has proper error handling and logging
```

3. **Save the output** — paste it into a file called `OrderService_without.cs`

### Step 2: Generate Code WITH Instructions

1. **Rename back**: `copilot-instructions.md.bak` → `copilot-instructions.md`
2. Ask the **exact same prompt** again
3. **Save the output** as `OrderService_with.cs`

### Step 3: Compare Side by Side

Open both files and look for these differences:

```mermaid
graph LR
    subgraph "Without Instructions"
        W1["GetOrders()"]
        W2["List<Order>"]
        W3["catch (Exception)"]
        W4["No CancellationToken"]
    end
    
    subgraph "With Instructions"
        I1["GetOrdersAsync()"]
        I2["IReadOnlyList<Order>"]
        I3["catch (HttpRequestException)"]
        I4["CancellationToken ct"]
    end
    
    W1 -. "Async suffix" .-> I1
    W2 -. "IReadOnlyList" .-> I2
    W3 -. "Specific types" .-> I3
    W4 -. "CancellationToken" .-> I4
    
    style W1 fill:#da3633,color:#fff
    style W2 fill:#da3633,color:#fff
    style W3 fill:#da3633,color:#fff
    style W4 fill:#da3633,color:#fff
    style I1 fill:#238636,color:#fff
    style I2 fill:#238636,color:#fff
    style I3 fill:#238636,color:#fff
    style I4 fill:#238636,color:#fff
```

## 📋 Exercise 3: Create Task-Specific Instructions (10 min)

Create a file at `.github/instructions/api-controllers.instructions.md`:

```markdown
---
applyTo: "**/Controllers/**/*.cs"
---

# API Controller Standards

- All controllers inherit from `ControllerBase` (not `Controller`)
- Use `[ApiController]` and `[Route("api/[controller]")]` attributes
- Return `ActionResult<T>` from all endpoints
- Use `[ProducesResponseType]` to document all response codes
- Include `[Authorize]` unless explicitly public with `[AllowAnonymous]`
- Use `CreatedAtAction()` for POST responses (return 201, not 200)
- Accept `CancellationToken` in all async action methods
- Log entry/exit of each action using `ILogger`
```

Test it by asking Copilot to generate a new controller — it should follow all these rules automatically.

## 🎓 What You Learned

| Concept | Key Takeaway |
|---------|-------------|
| **Project-level instructions** | One file applies to every Copilot interaction in the repo |
| **Folder-level instructions** | Override project-level for specific directories |
| **Task-specific instructions** | Use `applyTo` glob patterns for file-type targeting |
| **Measurable impact** | Without instructions, Copilot guesses your conventions; with them, it follows them consistently |
| **Team scaling** | Instructions are committed to git — every team member benefits |

## ✅ Success Criteria

- [ ] Instructions file is created at `.github/copilot-instructions.md`
- [ ] Copilot follows the rules when generating new code
- [ ] You can demonstrate the difference with/without instructions
- [ ] At least one task-specific instruction file is created

## 🏆 Bonus Challenges

1. Create folder-level `.instructions.md` files for `src/` and `tests/` with different rules
2. Create instructions for a specific framework (e.g., Blazor, MAUI, Azure Functions)
3. Browse the [awesome-copilot instructions](https://github.com/github/awesome-copilot/tree/main/instructions) and install one relevant to your stack
