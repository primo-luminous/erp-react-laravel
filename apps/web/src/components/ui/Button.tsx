import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'gradient'
    | 'success'
    | 'warning'
    | 'error'
  size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl' | 'icon'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', loading = false, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group',
          {
            // Variants
            'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-soft hover:shadow-medium active:scale-95':
              variant === 'default',
            'bg-gradient-to-r from-error-500 to-error-600 hover:from-error-600 hover:to-error-700 text-white shadow-soft hover:shadow-medium active:scale-95':
              variant === 'destructive',
            'bg-white hover:bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-neutral-700 dark:text-gray-200 border border-neutral-200 dark:border-gray-600 shadow-soft hover:shadow-medium active:scale-95':
              variant === 'outline',
            'bg-neutral-100 hover:bg-neutral-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-neutral-700 dark:text-gray-200 shadow-soft hover:shadow-medium active:scale-95':
              variant === 'secondary',
            'text-neutral-600 dark:text-gray-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-gray-700 active:scale-95':
              variant === 'ghost',
            'text-primary-600 underline-offset-4 hover:underline hover:text-primary-700':
              variant === 'link',
            'bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 hover:from-primary-600 hover:via-secondary-600 hover:to-accent-600 text-white shadow-soft hover:shadow-glow active:scale-95':
              variant === 'gradient',
            'bg-gradient-to-r from-success-500 to-success-600 hover:from-success-600 hover:to-success-700 text-white shadow-soft hover:shadow-medium active:scale-95':
              variant === 'success',
            'bg-gradient-to-r from-warning-500 to-warning-600 hover:from-warning-600 hover:to-warning-700 text-white shadow-soft hover:shadow-medium active:scale-95':
              variant === 'warning',
          },
          {
            // Sizes
            'h-7 px-2 text-xs rounded-lg': size === 'xs',
            'h-8 px-3 text-sm rounded-lg': size === 'sm',
            'h-10 px-4 text-sm rounded-xl': size === 'default',
            'h-11 px-6 text-base rounded-xl': size === 'lg',
            'h-12 px-8 text-lg rounded-2xl': size === 'xl',
            'h-10 w-10 rounded-xl': size === 'icon',
          },
          className,
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-inherit">
            <div className="spinner h-4 w-4" />
          </div>
        )}
        <span className={cn('flex items-center gap-2', loading && 'opacity-0')}>
          {children}
        </span>
      </button>
    )
  },
)
Button.displayName = 'Button'
export { Button }