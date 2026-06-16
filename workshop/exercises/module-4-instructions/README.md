# Module 4: Custom Instructions

## 🎯 Goal
Create instruction files that teach Copilot your team's C# coding standards.

## 📋 Exercise: Create copilot-instructions.md

Create a `.github/copilot-instructions.md` file in your project with rules like the template below.

### Template

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

## 🧪 Test It
1. Save the file
2. Ask Copilot to generate a new service class
3. Observe: Does it follow your rules?
4. Compare output WITH and WITHOUT the instructions file

## ✅ Success Criteria
- [ ] Instructions file is created and syntactically correct
- [ ] Copilot follows the rules when generating new code
- [ ] You can demonstrate the difference with/without instructions
