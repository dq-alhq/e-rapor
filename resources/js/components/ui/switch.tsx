import type { ReactNode, RefObject } from 'react'
import { Switch as RACSwitch, type SwitchProps as RACSwitchProps, composeRenderProps } from 'react-aria-components'

import { cn } from '@/lib/utils'
import { Label } from './form'

interface SwitchProps extends RACSwitchProps {
    ref?: RefObject<HTMLLabelElement>
}

const Switch = ({ children, className, ref, ...props }: SwitchProps) => {
    return (
        <RACSwitch
            ref={ref}
            className={composeRenderProps(className, (className) =>
                cn('group/switch inline-flex touch-none items-center sm:text-sm', className)
            )}
            {...props}
        >
            <div
                className={cn(
                    'mr-2 inline-flex h-5 w-8 items-center rounded-full border bg-muted px-0.5 transition',
                    'group-focus-visible/switch:border-primary group-focus-visible/switch:ring-2 group-focus-visible/switch:ring-ring group-focus-visible/switch:ring-offset-2',
                    'group-hover/switch:border-primary/70 group-selected/switch:bg-primary',
                    'cursor-pointer group-disabled/switch:cursor-default group-disabled/switch:opacity-50'
                )}
            >
                <span className='size-3.5 rounded-full bg-primary-fg shadow-sm transition-transform group-selected/switch:translate-x-3' />
            </div>
            <Label>{children as ReactNode}</Label>
        </RACSwitch>
    )
}

export { Switch }
