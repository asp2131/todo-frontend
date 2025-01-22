import { Rocket } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center justify-center gap-2">
      <Rocket className="h-6 w-6 text-blue-400" />
      <span className="text-2xl font-bold">
        <span className="text-blue-400">Todo</span>
        <span className="text-purple-400">App</span>
      </span>
    </div>
  );
}