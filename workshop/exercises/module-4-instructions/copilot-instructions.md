# C# Coding Standards — Template

## Async Programming
- All async methods MUST end with the `Async` suffix
- Always accept `CancellationToken` as the last parameter
- Use `ConfigureAwait(false)` in library code
- Never use `async void` except for event handlers

## Error Handling
- Use `ArgumentNullException.ThrowIfNull()` for null checks
- Never catch base `Exception` — use specific exception types
- Always include context in exception messages

## Types & Patterns
- Use `record` types for DTOs and value objects
- Prefer `IReadOnlyList<T>` over `List<T>` in return types
- Use file-scoped namespaces

## Naming
- Interfaces: prefix with `I`
- Private fields: prefix with `_`
- Constants: PascalCase
- Async methods: suffix with `Async`
