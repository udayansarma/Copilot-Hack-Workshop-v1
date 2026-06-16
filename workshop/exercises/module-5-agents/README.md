# Module 5: Agents, Skills, MCP & Hooks

## 🎯 Goal
Build a custom Copilot agent for C# code review and create a pre-commit hook.

## 📋 Exercise 1: Build a Code Review Agent

Create a file at `.github/agents/csharp-reviewer.agent.md`:

```markdown
---
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
- 🔧 Fix with code example
```

### Test the Agent
1. Save the agent file
2. Open the legacy code from Module 3
3. Invoke the agent and ask it to review the code
4. Verify it catches the anti-patterns

## 📋 Exercise 2: Create a Pre-Commit Hook

Create `.github/hooks/pre-commit-format.yml`:

```yaml
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
    run: git add {{staged_files}}
```

## ✅ Success Criteria
- [ ] Agent file is valid and loadable
- [ ] Agent detects at least 3 anti-patterns in legacy code
- [ ] Hook runs dotnet format before commits
