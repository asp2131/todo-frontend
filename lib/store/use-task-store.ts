// lib/store/use-task-store.ts
import { create } from 'zustand';
import { Task, TaskCreateInput, TaskUpdateInput } from '@/types/task';
import { createTask, deleteTask, getTasks, updateTask } from '@/lib/services/tasks';

interface TaskStore {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  selectedTask: Task | null;
  // Actions
  fetchTasks: () => Promise<void>;
  addTask: (task: TaskCreateInput) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
  updateTask: (id: string, task: TaskUpdateInput) => Promise<void>;
  setSelectedTask: (task: Task | null) => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,
  selectedTask: null,

  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const tasks = await getTasks();
      set({ tasks, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch tasks', isLoading: false });
    }
  },

  addTask: async (taskData: TaskCreateInput) => {
    set({ isLoading: true, error: null });
    try {
      const newTask = await createTask(taskData);
      set(state => ({
        tasks: [...state.tasks, newTask],
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to create task', isLoading: false });
    }
  },

  removeTask: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await deleteTask(id);
      set(state => ({
        tasks: state.tasks.filter(task => task.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to delete task', isLoading: false });
    }
  },

  updateTask: async (id: string, taskData: TaskUpdateInput) => {
    set({ isLoading: true, error: null });
    try {
      const updatedTask = await updateTask(id, taskData);
      set(state => ({
        tasks: state.tasks.map(task => 
          task.id === id ? { ...task, ...updatedTask } : task
        ),
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update task', isLoading: false });
    }
  },

  setSelectedTask: (task: Task | null) => {
    set({ selectedTask: task });
  }
}));