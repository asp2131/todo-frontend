import { Task } from '@/types/task';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Pencil } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTaskStore } from '@/lib/store/use-task-store';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const { updateTask, removeTask, setSelectedTask } = useTaskStore();
  
  const handleToggleComplete = async () => {
    try {
      await updateTask(task.id, { 
        completed: !task.completed, 
        title: task.title, 
        color: task.color 
      });
    } catch (error) {
      console.error('Failed to toggle task completion:', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      setIsDeleting(true);
      await removeTask(task.id);
    } catch (error) {
      console.error('Failed to delete task:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTask(task);
    router.push(`/edit/${task.id}`);
  };

  return (
    <div 
      className={cn(
        "group bg-zinc-900 rounded-lg p-4",
        "border border-zinc-800 hover:border-zinc-700",
        "transition-all duration-200"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div 
            className={cn(
              "w-1.5 h-full self-stretch rounded-full",
              task.color === 'red' ? 'bg-red-500' : 
              task.color === 'blue' ? 'bg-blue-500' : 
              'bg-green-500'
            )}
          />
          <Checkbox 
            checked={task.completed}
            onCheckedChange={handleToggleComplete}
            className={cn(
              "h-5 w-5 border-2 border-zinc-700",
              "data-[state=checked]:border-purple-500 data-[state=checked]:bg-purple-500"
            )}
          />
          <p className={cn(
            "text-sm flex-1 min-w-0 truncate",
            task.completed && "line-through text-zinc-500"
          )}>
            {task.title}
          </p>
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleEdit}
            className="text-zinc-500 hover:text-zinc-300 p-1"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            disabled={isDeleting}
            onClick={handleDelete}
            className="text-zinc-500 hover:text-red-500 p-1"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}