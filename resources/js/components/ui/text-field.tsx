import { cn } from '@/lib/utils';

import { IconEye, IconEyeClosed, IconLoaderCircle } from 'hq-icons';
import { type ReactNode, type Ref, useState } from 'react';
import {
    Button,
    composeRenderProps,
    Input,
    TextField as RACTextField,
    type TextFieldProps as RACTextFieldProps
} from 'react-aria-components';
import type { FieldProps } from './form';
import { Description, FieldError, FieldGroup, Label } from './form';

interface TextFieldProps extends RACTextFieldProps, FieldProps {
    prefix?: ReactNode;
    suffix?: ReactNode;
    isPending?: boolean;
    placeholder?: string;
    ref?: Ref<HTMLInputElement>;
}

const TextField = ({
                       label,
                       placeholder,
                       description,
                       errorMessage,
                       className,
                       type,
                       ref,
                       ...props
                   }: TextFieldProps) => {
    const [masked, setMasked] = useState<boolean>(type === 'password');
    const inputType = type === 'password' ? (masked ? 'password' : 'text') : type;

    return (
        <RACTextField
            type={inputType}
            className={composeRenderProps(className, (className) =>
                cn('group/field flex flex-col gap-y-1.5', className)
            )}
            ref={ref}
            {...props}
        >
            {(values) => (
                <>
                    {label && <Label>{label}</Label>}
                    <FieldGroup
                        isInvalid={!!errorMessage || values.isInvalid}
                        isDisabled={values.isDisabled}
                        data-loading={props.isPending ? 'true' : undefined}
                    >
                        {props.prefix ? (
                            <span data-prefix className="ml-2 text-muted-fg has-[button]:ml-0">
                                {props.prefix}
                            </span>
                        ) : null}
                        <Input placeholder={placeholder} />
                        {type === 'password' ? (
                            <Button
                                type="button"
                                aria-label="Toggle visibility"
                                onPress={() => setMasked((e) => !e)}
                                className="mr-2 inline-flex items-center justify-center text-muted-fg outline-hidden focus-visible:text-primary"
                            >
                                <IconEye
                                    aria-hidden
                                    className={cn('size-4 scale-0 transition-transform', masked && 'scale-100')}
                                />
                                <IconEyeClosed
                                    aria-hidden
                                    className={cn(
                                        'absolute size-4 scale-0 transition-transform',
                                        !masked && 'scale-100'
                                    )}
                                />
                            </Button>
                        ) : props.isPending ? (
                            <IconLoaderCircle className="mr-2 size-3.5 animate-spin text-muted-fg" data-suffix />
                        ) : props.suffix ? (
                            <span data-suffix className="mr-2 text-muted-fg has-[button]:mr-0">
                                {props.suffix}
                            </span>
                        ) : null}
                    </FieldGroup>
                    {description && <Description>{description}</Description>}
                    <FieldError>{errorMessage}</FieldError>
                </>
            )}
        </RACTextField>
    );
};

export { TextField };
