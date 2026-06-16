# Module 2: Build a Web App from Scratch — Plan Mode

## 🎯 Goal
Create a complete web application using **only Copilot prompts** — no manual coding!

## 📋 Prerequisites
- VS Code with GitHub Copilot extension
- .NET 8 SDK installed
- Node.js 18+ installed

## 🚀 Exercise Flow

### Step 1: Create a New Project Folder
```bash
mkdir my-copilot-app
cd my-copilot-app
```

### Step 2: Open Copilot CLI & Enter Plan Mode
Your prompt will automatically enter plan mode. Use this prompt:

```
Create an ASP.NET Core 8 Web API with a React + TailwindCSS frontend for managing 
a team task board. Requirements:
- SQLite database with Entity Framework Core
- CRUD operations for tasks (title, description, status, assignee)
- Task statuses: Todo, In Progress, Done
- RESTful API with proper error handling
- Responsive UI with a Kanban-style board
- Dark mode support
```

### Step 3: Review the Plan
Copilot will generate a structured plan with:
- File structure
- Technology choices
- Implementation steps (todos)

**Read it carefully!** This is your chance to shape the architecture.

### Step 4: Provide Feedback (Optional)
If you want changes, type your feedback:
- "Also add JWT authentication"
- "Use PostgreSQL instead of SQLite"
- "Add pagination to the task list"
- "Include unit tests with xUnit"

### Step 5: Approve & Build
Approve the plan and watch Copilot create all the files.

### Step 6: Run & Test
```bash
# Backend
cd api
dotnet run

# Frontend (in another terminal)
cd frontend
npm install
npm run dev
```

### Step 7: Iterate!
Now add features through conversation:
- "Add a search bar to filter tasks"
- "Add input validation — task title must be 3-100 characters"  
- "Add a confirmation dialog before deleting a task"
- "Add drag-and-drop between task columns"

## ✅ Success Criteria
- [ ] App was created entirely through prompts (no manual file creation)
- [ ] Backend API is running and responding to requests
- [ ] Frontend displays tasks and supports CRUD operations
- [ ] At least 2 additional features were added through iteration
- [ ] You can explain the architecture Copilot chose and why
