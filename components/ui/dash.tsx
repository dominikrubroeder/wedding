import { cn } from "@/lib/utils";

export function Dash({ className }: { className?: string }) {
  return <span className={cn("inline-flex h-px w-6 bg-border", className)} />;
}
