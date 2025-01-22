'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTaskStore } from '@/lib/store/use-task-store';
import TaskCard from '@/components/task-list/task-card';
import { cn } from '@/lib/utils';
import { CirclePlus } from 'lucide-react';
import { Logo } from '@/components/logo';
import { ClipboardList } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { tasks, isLoading, error, fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="py-6">
          <Logo />
        </div>

        {/* Create Task Button */}
        <button
          onClick={() => router.push('/create')}
          className={cn(
            "w-full bg-[#1E6F9F] hover:bg-[#3182CE] transition-colors",
            "h-[52px] rounded flex items-center justify-center gap-2",
            "text-white font-bold text-sm"
          )}
        >
          Create Task
          <CirclePlus className="h-4 w-4" strokeWidth={3} />
        </button>

        {/* Task Stats */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-blue-400">Tasks</span>
            <span className="bg-zinc-800 px-2 py-0.5 rounded-full text-sm">
              {tasks.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple-400">Completed</span>
            <span className="bg-zinc-800 px-2 py-0.5 rounded-full text-sm">
              {completedTasks} of {tasks.length}
            </span>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <div className="border border-zinc-800 rounded-lg p-16 flex flex-col items-center gap-4">
              <ClipboardList className="h-12 w-12 text-zinc-700" />
              <div className="text-center space-y-1">
                <p className="text-zinc-300 font-medium">
                  You don't have any tasks registered yet.
                </p>
                <p className="text-zinc-500">
                  Create tasks and organize your to-do items.
                </p>
              </div>
            </div>
          ) : (
            tasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}