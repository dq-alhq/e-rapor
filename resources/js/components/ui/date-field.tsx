import type { ReactNode, Ref } from 'react'

import {
    type DateInputProps,
    DateSegment,
    type DateValue,
    DateField as RACDateField,
    type DateFieldProps as RACDateFieldProps,
    DateInput as RACDateInput,
    composeRenderProps
} from 'react-aria-components'

import { cn } from '@/lib/utils'
import { Description, FieldError, FieldGroup, type FieldProps, Label } from './form'

interface DateFieldProps<T extends DateValue> extends RACDateFieldProps<T>, FieldProps {
    prefix?: ReactNode
    suffix?: ReactNode
    ref?: Ref<HTMLDivElement>
}

const DateField = <T extends DateValue>({
    prefix,
    suffix,
    label,
    description,
    errorMessage,
    className,
    ref,
    ...props
}: DateFieldProps<T>) => {
    return (
        <RACDateField
            isInvalid={props.isInvalid || !!errorMessage}
            className={composeRenderProps(className, (className) =>
                cn('group/field flex flex-col gap-y-1.5', className)
            )}
            ref={ref}
            {...props}
        >
            {label && <Label>{label}</Label>}
            <FieldGroup>
                {prefix ? <span data-slot='prefix'>{prefix}</span> : null}
                <DateInput />
                {suffix ? <span data-slot='suffix'>{suffix}</span> : null}
            </FieldGroup>
            {description && <Description>{description}</Description>}
            <FieldError>{errorMessage}</FieldError>
        </RACDateField>
    )
}

const DateInput = ({ className, ...props }: Omit<DateInputProps, 'children'>) => {
    return (
        <RACDateInput
            className={composeRenderProps(className, (className) =>
                cn('bg-transparent p-2 text-base disabled:opacity-50 lg:text-sm', className)
            )}
            {...props}
        >
            {(segment) => (
                <DateSegment
                    segment={segment}
                    className={cn(
                        'inline shrink-0 rounded-sm p-0.5 type-literal:px-0 text-fg tabular-nums tracking-wider caret-transparent outline-0 sm:text-sm sm:uppercase',
                        segment.isPlaceholder && 'text-muted-fg',
                        'focus:font-bold focus:text-primary',
                        'invalid:not-type-literal:text-danger invalid:focus:text-primary-fg'
                    )}
                />
            )}
        </RACDateInput>
    )
}

export { DateField, DateInput }
