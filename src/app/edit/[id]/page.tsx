'use client';

import { use } from 'react';
import TaskForm from '@/components/forms/task-form';
import { useTaskStore } from '@/lib/store/use-task-store';

export default function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { selectedTask } = useTaskStore();
  
  return <TaskForm task={selectedTask} isEditing />;
}