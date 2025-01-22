import { useState } from "react";
import { useRouter } from "next/navigation";
import { Task, TaskColor } from "@/types/task";
import { Input } from "@/components/ui/input";
import { useTaskStore } from "@/lib/store/use-task-store";
import { Logo } from "@/components/logo";
import { ArrowLeft, Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskFormProps {
  task?: Task;
  isEditing?: boolean;
}

const colorOptions = [
  { value: 'red', class: 'bg-red-500' },
  { value: 'orange', class: 'bg-orange-500' },
  { value: 'yellow', class: 'bg-yellow-400' },
  { value: 'green', class: 'bg-green-500' },
  { value: 'blue', class: 'bg-blue-500' },
  { value: 'indigo', class: 'bg-indigo-500' },
  { value: 'violet', class: 'bg-violet-500' },
  { value: 'pink', class: 'bg-pink-500' },
  { value: 'brown', class: 'bg-amber-800' },
] as const;

export default function TaskForm({ task, isEditing }: TaskFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState(task?.title ?? "");
  const [color, setColor] = useState<TaskColor>(task?.color ?? "blue");
  const { addTask, updateTask, setSelectedTask } = useTaskStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setIsSubmitting(true);
      if (isEditing && task) {
        await updateTask(task.id, { 
          title, 
          color, 
          completed: task.completed 
        });
      } else {
        await addTask({ 
          title, 
          color, 
          completed: false 
        });
      }
      setSelectedTask(null);
      router.push("/");
    } catch (error) {
      console.error("Failed to save task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-zinc-50">
      <div className="max-w-[736px] mx-auto px-4">
        {/* Logo */}
        <div className="flex justify-center py-16">
          <Logo />
        </div>

        <div className="max-w-[540px] mx-auto space-y-6">
          {/* Back Button */}
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-[#4EA8DE] hover:text-[#4EA8DE]/90"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[#4EA8DE] text-base">
                Title
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Brush you teeth"
                className={cn(
                  "h-[54px] bg-[#262626] border-0",
                  "rounded text-white placeholder:text-[#808080]",
                  "focus:ring-1 focus:ring-[#4EA8DE]"
                )}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[#4EA8DE] text-base">
                Color
              </label>
              <div className="flex gap-2">
                {colorOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setColor(opt.value as TaskColor)}
                    className={cn(
                      "w-8 h-8 rounded-full relative",
                      opt.class,
                      color === opt.value && [
                        "ring-2 ring-white/70 ring-offset-2 ring-offset-[#0D0D0D]",
                        "after:content-['D'] after:absolute after:inset-0",
                        "after:flex after:items-center after:justify-center",
                        "after:text-white after:font-bold"
                      ]
                    )}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full bg-[#1E6F9F] hover:bg-[#1E6F9F]/90",
                "h-[52px] rounded",
                "flex items-center justify-center gap-2",
                "text-white font-semibold",
                "disabled:opacity-70"
              )}
            >
              {isEditing ? "Save" : "Add Task"}
              {isEditing ? (
                <Check className="h-5 w-5" />
              ) : (
                <Plus className="h-5 w-5" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}