import type { ReactNode, Ref } from 'react'

import type {
    FieldErrorProps,
    FormProps,
    GroupProps,
    InputProps,
    LabelProps,
    TextProps,
    ValidationResult
} from 'react-aria-components'
import {
    Group,
    FieldError as RACFieldError,
    Form as RACForm,
    Input as RACInput,
    Label as RACLabel,
    Text,
    composeRenderProps
} from 'react-aria-components'

import { tv } from 'tailwind-variants'

const fieldGroupStyle = tv({
    base: [
        'flex h-9 items-center rounded-md border transition',
        'hover:border-primary/70 group-invalid/field:hover:border-danger/70!',
        'focus-within:border-primary focus-within:ring-4 focus-within:ring-ring',
        'group-open/field:border-primary group-open/field:ring-4 group-open/field:ring-ring',
        'group-has-focus-visible/field:border-primary group-has-focus-visible/field:ring-4 group-has-focus-visible/field:ring-ring',
        'group-has-focus-within/field:border-primary group-has-focus-within/field:ring-4 group-has-focus-within/field:ring-ring',
        'group-has-focus/field:border-primary group-has-focus/field:ring-4 group-has-focus/field:ring-ring',
        'group-invalid/field:group-open/field:ring-invalid group-invalid/field:group-has-focus-visible/field:ring-invalid group-invalid/field:group-has-focus-within/field:ring-invalid group-invalid/field:group-has-focus/field:ring-invalid',
        'group-invalid/field:group-open/field:border-danger group-invalid/field:group-has-focus-visible/field:border-danger group-invalid/field:group-has-focus-within/field:border-danger group-invalid/field:group-has-focus/field:border-danger',
        '**:[input]:w-full **:[input]:p-2 **:[input]:text-base **:[input]:outline-hidden sm:**:[input]:text-sm',
        'disabled:pointer-events-none'
    ]
})

const labelStyle = tv({
    base: [
        'w-fit cursor-default font-medium text-fg text-sm leading-none transition-colors',
        'group-open/field:text-primary group-has-focus-visible/field:text-primary group-has-focus-within/field:text-primary group-has-focus/field:text-primary',
        'group-invalid/field:text-danger! group-disabled/field:text-muted-fg! group-has-invalid/field:text-danger!',
        'group-disabled/field:text-muted-fg group-has-disabled/field:text-muted-fg'
    ]
})

const descriptionStyle = tv({
    base: 'text-pretty text-muted-fg text-sm'
})

const errorStyle = tv({
    base: 'text-danger text-sm/5'
})

const Form = (props: FormProps) => <RACForm {...props} />

interface FieldProps {
    label?: string
    description?: string
    errorMessage?: string | ((validation: ValidationResult) => string) | ReactNode
}

const Label = ({ className, ...props }: LabelProps) => (
    <RACLabel slot='label' {...props} className={labelStyle({ className })} />
)

const Description = ({ className, ...props }: TextProps) => (
    <Text {...props} slot='description' className={descriptionStyle({ className })} />
)

const FieldError = ({ className, ...props }: FieldErrorProps) => {
    return Array.isArray(props.children) ? (
        <RACFieldError {...props} className={composeRenderProps(className, (className) => errorStyle({ className }))}>
            <ul className='list-inside list-disc'>
                {props.children.map((child, index) => (
                    <li key={index}>{child}</li>
                ))}
            </ul>
        </RACFieldError>
    ) : (
        <RACFieldError {...props} className={composeRenderProps(className, (className) => errorStyle({ className }))} />
    )
}

const FieldGroup = ({ className, ref, ...props }: GroupProps & { ref?: Ref<HTMLDivElement> }) => {
    return (
        <Group
            ref={ref}
            className={composeRenderProps(className, (className) => fieldGroupStyle({ className }))}
            {...props}
        />
    )
}

const Input = ({ className, ref, ...props }: InputProps & { ref?: Ref<HTMLInputElement> }) => (
    <RACInput ref={ref} {...props} />
)

export {
    Description,
    FieldError,
    FieldGroup,
    Input,
    Label,
    descriptionStyle,
    errorStyle,
    fieldGroupStyle,
    labelStyle,
    type FieldProps
}

export { Form }
