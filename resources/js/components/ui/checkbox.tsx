import type { ReactNode, Ref } from 'react'

import { IconCheck, IconMinus } from 'hq-icons'
import type {
    CheckboxGroupProps as RACCheckboxGroupProps,
    CheckboxProps as RACCheckboxProps
} from 'react-aria-components'
import { Checkbox as RACCheckbox, CheckboxGroup as RACCheckboxGroup, composeRenderProps } from 'react-aria-components'

import { cn } from '@/lib/utils'
import { Description, FieldError, type FieldProps, Label } from './form'

interface CheckboxGroupProps extends RACCheckboxGroupProps, FieldProps {}

const CheckboxGroup = ({ className, children, label, description, errorMessage, ...props }: CheckboxGroupProps) => {
    return (
        <RACCheckboxGroup
            {...props}
            className={composeRenderProps(className, (className) => cn('group/field flex flex-col gap-2', className))}
        >
            {(values) => (
                <>
                    {label && <Label>{label}</Label>}
                    {typeof children === 'function' ? children(values) : children}
                    {description && <Description>{description}</Description>}
                    <FieldError>{errorMessage}</FieldError>
                </>
            )}
        </RACCheckboxGroup>
    )
}

interface CheckboxProps extends RACCheckboxProps, Omit<FieldProps, 'errorMessage'> {
    children?: ReactNode
    ref?: Ref<HTMLLabelElement>
}

const Checkbox = ({ className, children, label, description, ref, ...props }: CheckboxProps) => {
    return (
        <RACCheckbox
            ref={ref}
            className={composeRenderProps(className, (className) =>
                cn(
                    'group/box flex items-center gap-2',
                    {
                        'items-start': description
                    },
                    className
                )
            )}
            {...props}
        >
            {({ isSelected, isIndeterminate }) => (
                <>
                    <div
                        className={cn(
                            'flex size-4 shrink-0 items-center justify-center rounded-xs border shadow-xs transition',
                            'border-muted group-hover/box:border-primary/70 group-has-invalid/box:border-danger/70',
                            'group-selected/box:border-primary group-selected/box:bg-primary group-selected/box:text-primary-fg group-selected/box:group-has-invalid/box:border-danger/70 group-selected/box:group-has-invalid/box:bg-danger group-selected/box:group-has-invalid/box:text-danger-fg',
                            'group-focus/box:border-primary group-focus/box:group-has-invalid/box:border-danger/70',
                            'group-focus-visible/box:ring-4 group-focus-visible/box:ring-ring group-focus-visible/box:group-has-invalid/box:ring-invalid',
                            className
                        )}
                    >
                        {isIndeterminate ? (
                            <IconMinus className='size-3' />
                        ) : isSelected ? (
                            <IconCheck className='size-3' />
                        ) : null}
                    </div>

                    <div className='flex flex-col gap-y-1.5'>
                        <span className='not-last:text-sm/4 text-sm'>{label ?? children}</span>
                        {description && <Description>{description}</Description>}
                    </div>
                </>
            )}
        </RACCheckbox>
    )
}

export { Checkbox, CheckboxGroup }
