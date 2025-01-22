'use client';

import { use } from 'react';
import TaskForm from '@/components/forms/task-form';

export default function CreatePage({ params }: { params: Promise<{ action: string }> }) {
  const resolvedParams = use(params);
  return <TaskForm />;
}