import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold uppercase tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lexa-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    
    const variants = {
      primary: "bg-lexa-gold text-lexa-black hover:bg-[#d4a530] active:scale-95",
      secondary: "bg-lexa-black text-white hover:bg-gray-900 active:scale-95",
      outline: "border-2 border-lexa-gold text-lexa-gold hover:bg-lexa-gold hover:text-lexa-black",
      ghost: "text-lexa-black hover:bg-gray-100"
    }
    
    const sizes = {
      default: "px-8 py-3 text-sm",
      sm: "px-6 py-2 text-xs",
      lg: "px-10 py-4 text-base"
    }
    
    return (
      <button
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