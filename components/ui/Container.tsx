import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
  editorial?: boolean;
}

export function Container({
  children,
  className,
  size = "default",
  editorial = false,
}: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full mx-auto px-4 sm:px-6 lg:px-8",
        {
          "max-w-6xl": size === "default",
          "max-w-7xl": size === "wide",
          "max-w-4xl": size === "narrow",
          "pl-[clamp(1rem,8vw,12vw)] pr-4 sm:pr-6 lg:pr-8": editorial,
        },
        className
      )}
    >
      {children}
    </div>
  );
}
