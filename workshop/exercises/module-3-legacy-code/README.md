# Module 3: Modernize Legacy C# Code

## 🎯 Goal
Use GitHub Copilot to transform `LegacyDataAccess.cs` from old-school C# into modern, safe, testable code.

## 🔍 Anti-Patterns to Find

Open `LegacyDataAccess.cs` and use Copilot Chat to identify these issues:

| # | Anti-Pattern | Risk |
|---|-------------|------|
| 1 | Hardcoded connection string | Can't change per environment |
| 2 | SQL string concatenation | **SQL Injection vulnerability** |
| 3 | No `using` statements | Connection leaks on exception |
| 4 | Synchronous data access | Blocks threads, kills scalability |
| 5 | Returns `DataTable` | No type safety, no IntelliSense |
| 6 | Business logic in data layer | Untestable, violates SRP |
| 7 | No error handling | Silent failures, data corruption |
| 8 | No cancellation support | Can't cancel long-running queries |

## 🛠️ Exercise Steps

### Step 1: Understand the Code
```
Select all code → Copilot Chat: "Explain this code and list all anti-patterns"
```

### Step 2: Create Modern Types
```
Copilot Chat: "Create a Customer record type and ICustomerRepository interface with async methods"
```

### Step 3: Implement Modern Repository
```
Copilot Chat: "Implement CustomerRepository using Dapper, async/await, DI, and parameterized queries"
```

### Step 4: Write Tests
```
Copilot Chat: "Write xUnit tests for the new CustomerRepository"
```

## ✅ Success Criteria
- [ ] No SQL injection vulnerabilities
- [ ] All methods are async with CancellationToken
- [ ] Uses dependency injection (IDbConnection)
- [ ] Strongly-typed models (no DataTable)
- [ ] Proper error handling and resource disposal
- [ ] Unit tests with mocked dependencies
