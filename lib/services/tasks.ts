import { Task, TaskCreateInput, TaskUpdateInput } from "@/types/task";

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tasks`);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export async function getTask(id: number): Promise<Task> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tasks/${id}`)
    return response.json()
  }

export async function createTask(task: TaskCreateInput): Promise<Task> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

export async function updateTask(
  id: string,
  task: TaskUpdateInput
): Promise<Task> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}

export async function deleteTask(id: string): Promise<void> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tasks/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete task");
}
