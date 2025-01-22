// types/task.ts
export type Task = {
    id: string;
    title: string;
    color: TaskColor;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  
  export type TaskColor = 'red' | 'blue' | 'green';
  
  export type TaskCreateInput = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
  export type TaskUpdateInput = Partial<TaskCreateInput>;