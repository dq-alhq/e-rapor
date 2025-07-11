import { Form, Link, TextField } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import AuthLayout from '@/layouts/auth-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { IconLogIn } from 'hq-icons';
import type { FormEventHandler } from 'react';

type LoginForm = {
    login: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        login: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    console.log(usePage().props);

    return (
        <>
            <Head title="Log in" />

            <Form className="flex flex-col gap-4" onSubmit={submit} validationErrors={errors}>
                <TextField
                    label="Username / Email"
                    name="login"
                    id="login"
                    isRequired
                    autoFocus
                    autoComplete="username"
                    value={data.login}
                    onChange={(v) => setData('login', v)}
                    errorMessage={errors.login}
                />
                <TextField
                    label="Password"
                    name="password"
                    id="password"
                    type="password"
                    isRequired
                    autoComplete="current-password"
                    value={data.password}
                    onChange={(v) => setData('password', v)}
                    errorMessage={errors.password}
                />

                <div className="flex items-center justify-between">
                    <Checkbox id="remember" name="remember" isSelected={data.remember} onChange={() => setData('remember', !data.remember)}>
                        Ingat Saya
                    </Checkbox>
                    {canResetPassword && (
                        <Link href={route('password.request')} className="text-sm/4 font-medium text-muted-fg hover:text-primary">
                            Lupa password?
                        </Link>
                    )}
                </div>

                <Button type="submit" className="mt-4 w-full" isPending={processing} isDisabled={processing}>
                    <IconLogIn />
                    Log in
                </Button>

                <div className="text-center text-sm text-muted-fg">
                    Don't have an account?{' '}
                    <Link className="hover:text-fg" href={route('register')}>
                        Sign up
                    </Link>
                </div>
            </Form>
            {status && <div className="text-success mb-4 text-center text-sm font-medium">{status}</div>}
        </>
    );
}

Login.layout = (page: React.ReactNode) => (
    <AuthLayout title="Masuk ke akun anda" description="Masukkan username/email dan password untuk login" children={page} />
);
