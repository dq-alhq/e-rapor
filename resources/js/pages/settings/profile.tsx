import type { BreadcrumbItem, SharedData } from "@/types"
import { Head, Link, useForm, usePage } from "@inertiajs/react"
import type { FormEventHandler } from "react"

import DeleteUser from "@/components/delete-user"
import HeadingSmall from "@/components/heading-small"
import { Form, Note, TextField, toast } from "@/components/ui"
import { Button } from "@/components/ui/button"
import AppLayout from "@/layouts/app-layout"
import SettingsLayout from "@/layouts/settings/layout"
import { IconSave } from "hq-icons"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Profile settings",
        href: "/settings/profile",
    },
]

type ProfileForm = {
    name: string
    email: string
}

export default function Profile({
    mustVerifyEmail,
    status,
}: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props

    const { data, setData, patch, errors, processing } = useForm<Required<ProfileForm>>({
        name: auth.user.name,
        email: auth.user.email,
    })

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        patch(route("profile.update"), {
            preserveScroll: true,
            onSuccess: () => toast.success("Profile updated successfully."),
        })
    }

    return (
        <>
            <Head title="Profile settings" />
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Profile information"
                        description="Update your name and email address"
                    />

                    <Form onSubmit={submit} className="space-y-4" validationErrors={errors}>
                        <TextField
                            label="Name"
                            id="name"
                            value={data.name}
                            onChange={(v) => setData("name", v)}
                            isRequired
                            autoComplete="name"
                            placeholder="Full name"
                            errorMessage={errors.name}
                        />
                        <TextField
                            label="Email"
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(v) => setData("email", v)}
                            isRequired
                            autoComplete="email"
                            placeholder="Email address"
                            errorMessage={errors.email}
                        />

                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="-mt-4 text-muted-foreground text-sm">
                                    Your email address is unverified.
                                    <Link
                                        href={route("verification.send")}
                                        method="post"
                                        as="button"
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                    >
                                        Click here to resend the verification email.
                                    </Link>
                                </p>

                                {status === "verification-link-sent" && (
                                    <Note variant="success">
                                        A new verification link has been sent to the email address
                                    </Note>
                                )}
                            </div>
                        )}

                        <Button type="submit" isPending={processing} isDisabled={processing}>
                            <IconSave />
                            Save
                        </Button>
                    </Form>
                </div>

                <DeleteUser />
            </SettingsLayout>
        </>
    )
}

Profile.layout = (page: React.ReactNode) => <AppLayout breadcrumbs={breadcrumbs} children={page} />
