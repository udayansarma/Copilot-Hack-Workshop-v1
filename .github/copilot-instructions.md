# Copilot Instructions for This Workshop Repo

This repository is a GitHub Copilot Hackathon Workshop designed for C#/.NET developers.

## General Guidelines
- This is a **workshop/educational** repository — code examples should be clear and well-commented
- Frontend is React + TypeScript + TailwindCSS
- Backend is Express.js + SQLite (lightweight, no-config)
- Exercise files use C# with .NET 8 conventions

## When Generating C# Code
- Use modern C# 12+ features (file-scoped namespaces, primary constructors, records)
- Follow async/await best practices (CancellationToken, Async suffix)
- Use dependency injection and the repository pattern
- Prefer `IReadOnlyList<T>` over `List<T>` for return types
- Use `ArgumentNullException.ThrowIfNull()` for null guards
- Use parameterized queries — NEVER concatenate SQL strings

## When Generating TypeScript/React Code
- Use functional components with hooks
- Use TailwindCSS utility classes — no external CSS
- Follow the project's GitHub-dark theme (colors defined in tailwind.config.js)
- Components should be responsive (mobile-first)

## When Generating Documentation
- Use clear, step-by-step instructions
- Include code examples for every concept
- Target audience: C# developers coming from legacy backgrounds
- Be encouraging — this is a learning environment
