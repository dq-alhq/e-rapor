import type { BreadcrumbItem, SharedData } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import type { FormEventHandler } from 'react';

import HeadingSmall from '@/components/heading-small';
import { Form, Note, TextField } from '@/components/ui';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { IconSave } from 'hq-icons';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

type ProfileForm = {
    name: string;
    username: string;
    email: string;
};

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, patch, errors, processing } = useForm<Required<ProfileForm>>({
        name: auth.user.name,
        username: auth.user.username,
        email: auth.user.email,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Pengaturan Profil" />
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Informasi Profil" description="Profil ini diguanakan untuk login" />
                    <Form onSubmit={submit} className="space-y-4" validationErrors={errors}>
                        <TextField
                            label="Nama"
                            id="name"
                            value={data.name}
                            onChange={(v) => setData('name', v)}
                            isRequired
                            autoComplete="name"
                            placeholder="Nama Lengkap"
                            errorMessage={errors.name}
                        />
                        <TextField
                            label="Username"
                            id="username"
                            value={data.username}
                            onChange={(v) => setData('username', v)}
                            isRequired
                            autoComplete="username"
                            placeholder="Username"
                            errorMessage={errors.username}
                        />
                        <TextField
                            label="Email"
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(v) => setData('email', v)}
                            isRequired
                            autoComplete="email"
                            placeholder="Email"
                            errorMessage={errors.email}
                        />

                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="text-muted-foreground -mt-4 text-sm">
                                    Your email address is unverified.
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                    >
                                        Click here to resend the verification email.
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && <Note>A new verification link has been sent to the email address</Note>}
                            </div>
                        )}

                        <Button type="submit" isPending={processing} isDisabled={processing}>
                            <IconSave />
                            Simpan
                        </Button>
                    </Form>
                </div>
            </SettingsLayout>
        </>
    );
}

Profile.layout = (page: React.ReactNode) => <AppLayout breadcrumbs={breadcrumbs} children={page} />;
