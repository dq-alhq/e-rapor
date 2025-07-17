import { Button, Form, Link, TextField } from '@/components/ui';
import AuthLayout from '@/layouts/auth-layout';
import { Head, useForm } from '@inertiajs/react';
import { IconUserPlus } from 'hq-icons';
import type { FormEventHandler } from 'react';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register" />
            <Form className="flex flex-col gap-4" onSubmit={submit} validationErrors={errors}>
                <TextField
                    label="Name"
                    id="name"
                    type="text"
                    isRequired
                    autoFocus
                    autoComplete="name"
                    value={data.name}
                    onChange={(v) => setData('name', v)}
                    isDisabled={processing}
                    placeholder="Full name"
                    errorMessage={errors.name}
                />
                <TextField
                    label="Email"
                    id="email"
                    type="email"
                    isRequired
                    autoComplete="email"
                    value={data.email}
                    onChange={(v) => setData('email', v)}
                    isDisabled={processing}
                    placeholder="email@example.com"
                    errorMessage={errors.email}
                />

                <TextField
                    label="Password"
                    id="password"
                    type="password"
                    isRequired
                    autoComplete="new-password"
                    value={data.password}
                    onChange={(v) => setData('password', v)}
                    isDisabled={processing}
                    placeholder="Password"
                    errorMessage={errors.password}
                />

                <TextField
                    label="Confirm password"
                    id="password_confirmation"
                    type="password"
                    isRequired
                    autoComplete="new-password"
                    value={data.password_confirmation}
                    onChange={(v) => setData('password_confirmation', v)}
                    isDisabled={processing}
                    placeholder="Confirm password"
                    errorMessage={errors.password_confirmation}
                />

                <Button type="submit" className="mt-2 w-full" isDisabled={processing} isPending={processing}>
                    <IconUserPlus />
                    Create account
                </Button>
                <div className="text-center text-sm text-muted-fg">
                    Already have an account?{' '}
                    <Link className="hover:text-fg" href={route('login')}>
                        Log in
                    </Link>
                </div>
            </Form>
        </>
    );
}

Register.layout = (page: React.ReactNode) => (
    <AuthLayout title="Create an account" description="Enter your details below to create your account" children={page} />
);
