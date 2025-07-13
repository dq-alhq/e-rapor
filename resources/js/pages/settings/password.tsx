import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { type FormEventHandler, useRef } from 'react';

import HeadingSmall from '@/components/heading-small';
import { Form, TextField } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { IconSave } from 'hq-icons';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Password settings',
        href: '/settings/password',
    },
];

export default function Password() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <>
            <Head title="Pengaturan Profil" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Update password" description="Ubah password yang digunakan untuk login" />

                    <Form onSubmit={updatePassword} className="space-y-4" validationErrors={errors}>
                        <TextField
                            label="Password saat ini"
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(v) => setData('current_password', v)}
                            type="password"
                            autoComplete="current-password"
                            errorMessage={errors.current_password}
                        />
                        <TextField
                            label="Password baru"
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(v) => setData('password', v)}
                            type="password"
                            autoComplete="new-password"
                            errorMessage={errors.password}
                        />

                        <TextField
                            label="Konfirmasi password baru"
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(v) => setData('password_confirmation', v)}
                            type="password"
                            autoComplete="new-password"
                            errorMessage={errors.password_confirmation}
                        />

                        <Button type="submit" isDisabled={processing} isPending={processing}>
                            <IconSave />
                            Simpan
                        </Button>
                    </Form>
                </div>
            </SettingsLayout>
        </>
    );
}

Password.layout = (page: React.ReactNode) => <AppLayout breadcrumbs={breadcrumbs} children={page} />;
