import type { ComponentPropsWithRef } from 'react'

import { type VariantProps, tv } from 'tailwind-variants'

import { cn } from '@/lib/utils'

const badgeStyle = tv({
    base: 'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-md border px-2 py-0.5 font-medium text-xs transition-[color,box-shadow] invalid:border-danger invalid:ring-invalid focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring *:[svg]:pointer-events-none *:[svg]:size-3',
    variants: {
        variant: {
            primary: 'border-transparent bg-primary text-primary-fg [a&]:hover:bg-primary/90',
            secondary: 'border-transparent bg-secondary text-secondary-fg [a&]:hover:bg-secondary/90',
            danger: 'border-transparent bg-danger text-white focus-visible:ring-invalid dark:bg-danger/60 dark:focus-visible:ring-danger/40 [a&]:hover:bg-danger/90',
            outline: 'text-fg [a&]:hover:bg-muted [a&]:hover:text-muted-fg'
        }
    },
    defaultVariants: {
        variant: 'primary'
    }
})

const Badge = ({ className, variant, ...props }: ComponentPropsWithRef<'span'> & VariantProps<typeof badgeStyle>) => (
    <span data-badge className={cn(badgeStyle({ variant }), className)} {...props} />
)

export { Badge, badgeStyle }
