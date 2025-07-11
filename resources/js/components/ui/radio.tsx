import type { ReactNode, Ref } from 'react'

import type { RadioGroupProps as RACRadioGroupProps, RadioProps as RACRadioProps } from 'react-aria-components'
import { Radio as RACRadio, RadioGroup as RACRadioGroup, composeRenderProps } from 'react-aria-components'

import { cn } from '@/lib/utils'
import { Description, FieldError, type FieldProps, Label } from './form'

interface RadioGroupProps extends RACRadioGroupProps, FieldProps {}

const RadioGroup = ({ label, description, errorMessage, className, children, ...props }: RadioGroupProps) => {
    return (
        <RACRadioGroup
            {...props}
            isInvalid={!!errorMessage || props.isInvalid}
            className={composeRenderProps(className, (className) => cn('group/field flex flex-col gap-2', className))}
        >
            {(values) => (
                <>
                    {label && <Label>{label}</Label>}
                    <div
                        className={cn(
                            'flex',
                            values.orientation === 'horizontal' ? 'flex-wrap gap-2 sm:gap-4' : 'flex-col gap-2'
                        )}
                    >
                        {typeof children === 'function' ? children(values) : children}
                    </div>
                    {description && <Description>{description}</Description>}
                    <FieldError>{errorMessage}</FieldError>
                </>
            )}
        </RACRadioGroup>
    )
}

interface RadioProps extends RACRadioProps, Omit<FieldProps, 'errorMessage'> {
    children?: ReactNode
    ref?: Ref<HTMLLabelElement>
}

const Radio = ({ label, description, className, children, ref, ...props }: RadioProps) => {
    return (
        <RACRadio
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
            {(values) => (
                <>
                    <div
                        className={cn(
                            'size-4 shrink-0 rounded-full border bg-bg transition',
                            'group-hover/box:border-primary/70',
                            'group-focus/box:border-primary group-focus/box:group-has-invalid/box:border-danger',
                            'group-focus-visible/box:border-primary group-focus-visible/box:ring-4 group-focus-visible/box:ring-ring group-focus-visible/box:group-has-invalid/box:border-danger',
                            'group-has-invalid/box:border-danger/70 group-has-invalid/box:ring-invalid group-has-invalid/box:group-hover/box:border-danger/70',
                            values.isSelected && 'border-[5px] border-primary group-has-invalid/box:border-danger'
                        )}
                    />
                    <div className='flex flex-col gap-y-1.5'>
                        <span className='not-last:text-sm/4 text-sm'>{label ?? children}</span>
                        {description && <Description>{description}</Description>}
                    </div>
                </>
            )}
        </RACRadio>
    )
}

export { Radio, RadioGroup }
