import type { Ref } from 'react'

import { IconLoaderCircle } from 'hq-icons'
import { Button as RACButton, composeRenderProps } from 'react-aria-components'
import type { ButtonProps as RACButtonProps } from 'react-aria-components'
import { type VariantProps, tv } from 'tailwind-variants'

const buttonStyle = tv({
    base: [
        'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium text-sm outline-hidden transition-[box-shadow,opacity,color]',
        '**:[svg]:pointer-events-none **:[svg]:shrink-0',
        'focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-ring',
        'cursor-pointer disabled:pointer-events-none disabled:opacity-50'
    ],
    variants: {
        variant: {
            primary: 'bg-primary pressed:bg-primary/95 text-primary-fg shadow-xs hover:bg-primary/90',
            danger: 'bg-danger text-white shadow-xs hover:bg-danger/90 focus-visible:ring-danger/25',
            outline: 'border bg-bg pressed:bg-muted/50 text-fg shadow-xs hover:bg-muted/40',
            secondary: 'bg-secondary text-secondary-fg shadow-xs hover:bg-secondary/80',
            ghost: 'pressed:bg-muted/50 hover:bg-muted/40'
        },
        size: {
            xs: 'gap-x-1.5 px-2 text-xs [--height:theme(spacing.6)] [--width:auto] **:[svg]:size-3.5',
            sm: 'gap-x-1.5 px-3 text-sm [--height:theme(spacing.8)] [--width:auto] **:[svg]:size-4',
            md: 'gap-x-2 px-4 text-sm [--height:theme(spacing.9)] [--width:auto] **:[svg]:size-4',
            lg: 'gap-x-2.5 px-5 text-base [--height:theme(spacing.10)] [--width:auto] **:[svg]:size-5'
        },
        icon: {
            true: 'h-(--height) w-(--height) shrink-0 px-0',
            false: 'h-(--height) w-(--width)'
        },
        shape: {
            square: 'rounded-md',
            circle: 'rounded-full'
        },
        isPending: {
            true: 'pointer-events-none cursor-default opacity-50 *:data-[slot=icon]:hidden'
        }
    },
    defaultVariants: {
        variant: 'primary',
        size: 'md',
        shape: 'square'
    }
})

interface ButtonProps extends RACButtonProps, VariantProps<typeof buttonStyle> {
    ref?: Ref<HTMLButtonElement>
    isPending?: boolean
}

const Button = ({ className, children, variant, size, icon, isPending, ...props }: ButtonProps) => (
    <RACButton
        className={composeRenderProps(className, (className) =>
            buttonStyle({ variant, size, icon, isPending, className })
        )}
        {...props}
    >
        {(values) => (
            <>
                {isPending && <IconLoaderCircle data-slot='loader' className='animate-spin' />}
                {typeof children === 'function' ? children(values) : children}
            </>
        )}
    </RACButton>
)

export { Button, buttonStyle }
