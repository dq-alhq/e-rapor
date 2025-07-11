import type { Ref } from 'react'

import { IconChevronDown, IconChevronUp, IconMinus, IconPlus } from 'hq-icons'
import {
    Button,
    type ButtonProps,
    Input,
    NumberField as RACNumberField,
    type NumberFieldProps as RACNumberFieldProps,
    composeRenderProps
} from 'react-aria-components'

import { useIsMobile } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import { Description, FieldError, FieldGroup, type FieldProps, Label } from './form'

interface NumberFieldProps extends RACNumberFieldProps, FieldProps {
    placeholder?: string
    ref?: Ref<HTMLDivElement>
}

const NumberField = ({ label, placeholder, description, className, errorMessage, ref, ...props }: NumberFieldProps) => {
    const isMobile = useIsMobile()
    return (
        <RACNumberField
            className={composeRenderProps(className, (className) =>
                cn('group/field flex flex-col gap-y-1.5', className)
            )}
            ref={ref}
            {...props}
        >
            {label && <Label>{label}</Label>}
            <FieldGroup
                isInvalid={props.isInvalid || !!errorMessage}
                isDisabled={props.isDisabled}
                className='overflow-hidden'
            >
                {isMobile && (
                    <Stepper className='border-r' slot='decrement'>
                        <IconMinus />
                    </Stepper>
                )}
                <Input className='text-center tabular-nums sm:text-left' placeholder={placeholder} />
                {isMobile ? (
                    <Stepper className='border-s' slot='increment'>
                        <IconPlus />
                    </Stepper>
                ) : (
                    <div className='flex h-full flex-col divide-y border-s'>
                        <Stepper slot='increment' className='size-5'>
                            <IconChevronUp />
                        </Stepper>
                        <Stepper slot='decrement' className='size-5'>
                            <IconChevronDown />
                        </Stepper>
                    </div>
                )}
            </FieldGroup>
            {description && <Description>{description}</Description>}
            <FieldError>{errorMessage}</FieldError>
        </RACNumberField>
    )
}

interface StepperProps extends ButtonProps {
    slot: 'increment' | 'decrement'
    className?: string
}

const Stepper = ({ slot, className, ...props }: StepperProps) => {
    return (
        <Button
            className={composeRenderProps(className, (className, { isDisabled, isPressed }) =>
                cn(
                    'flex size-12 items-center justify-center text-muted-fg outline-hidden',
                    isPressed &&
                        'bg-primary text-primary-fg group-has-invalid/field:bg-danger group-has-invalid/field:text-danger-fg',
                    isDisabled && 'opacity-50',
                    className
                )
            )}
            slot={slot}
            {...props}
        />
    )
}

export { NumberField }
