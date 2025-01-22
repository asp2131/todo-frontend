# Todo List App Frontend

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Before running the development server, make sure to set up your environment variables:

1. Copy the `.env.example` file to `.env`:
2. Set the `NEXT_PUBLIC_SERVER_URL` variable to the URL of the API server.
3. Make sure the API server is running.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Create, read, update, and delete tasks
- Mark tasks as completed
- Assign colors to tasks for better organization
- Track task completion statistics
- Responsive design for mobile and desktop

## Project Structure

```
├── components/          # Reusable UI components
│   ├── forms/          # Form-related components
│   ├── task-list/      # Task list and card components
│   └── ui/             # Basic UI components
├── lib/
│   ├── services/       # API service functions
│   └── store/          # Global state management
├── types/              # TypeScript type definitions
└── src/
    └── app/           # Next.js app router pages
```

## State Management

The app uses Zustand for state management. The task store (`useTaskStore`) handles:
- Fetching tasks from the API
- Adding new tasks
- Updating existing tasks
- Deleting tasks
- Managing loading states and errors

## API Integration

The app requires a backend API server that supports the following endpoints:
- `GET /tasks` - Fetch all tasks
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

## Task Features

Each task has the following properties:
- Title: The task description
- Color: Visual identifier (red, blue, green, etc.)
- Completion Status: Track whether the task is done
- ID: Unique identifier

