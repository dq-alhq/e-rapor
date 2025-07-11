import type { Ref } from 'react'
import {
    TextArea as RACTextArea,
    TextField as RACTextField,
    type TextFieldProps as RACTextFieldProps,
    composeRenderProps
} from 'react-aria-components'

import { cn } from '@/lib/utils'
import { Description, FieldError, type FieldProps, Label, fieldGroupStyle } from './form'

interface TextareaProps extends RACTextFieldProps, FieldProps {
    autoSize?: boolean
    placeholder?: string
    ref?: Ref<HTMLDivElement>
}

const Textarea = ({ className, placeholder, label, description, errorMessage, ref, ...props }: TextareaProps) => {
    return (
        <RACTextField
            ref={ref}
            className={composeRenderProps(className, (className) =>
                cn('group/field flex flex-col gap-y-1.5', className)
            )}
            {...props}
        >
            {label && <Label>{label}</Label>}
            <RACTextArea
                placeholder={placeholder}
                className={cn(
                    fieldGroupStyle(),
                    'h-auto min-h-14 w-full min-w-0 rounded-lg border bg-transparent p-2 text-base outline-hidden transition duration-200 sm:text-sm',
                    props.autoSize && 'field-sizing-content resize-none'
                )}
            />
            {description && <Description>{description}</Description>}
            <FieldError>{errorMessage}</FieldError>
        </RACTextField>
    )
}

export { Textarea }
