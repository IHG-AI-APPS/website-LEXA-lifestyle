import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const baseStyles = "inline-flex items-center justify-center font-semibold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 rounded-xl"
    
    const variants = {
      primary: "bg-black text-white shadow-depth-lg hover:shadow-float-lg hover:-translate-y-1 active:translate-y-0 active:shadow-depth",
      secondary: "bg-accent text-black shadow-depth-lg hover:shadow-glow hover:-translate-y-1 active:translate-y-0 active:shadow-depth",
      outline: "border-2 border-gray-300 dark:border-zinc-600 text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:border-gray-400 dark:hover:border-zinc-500 shadow-sm hover:shadow",
      ghost: "text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 hover:shadow-depth-sm"
    }
    
    const sizes = {
      default: "px-8 py-3 text-sm h-12",
      sm: "px-6 py-2 text-xs h-10",
      lg: "px-10 py-4 text-base h-14"
    }
    
    return (
      <Comp
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
