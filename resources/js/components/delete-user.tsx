import { useForm } from '@inertiajs/react';
import type React from 'react';
import { useRef } from 'react';

import HeadingSmall from '@/components/heading-small';
import { Button, Form, Modal, Note, TextField } from '@/components/ui';
import { IconUserX } from 'hq-icons';

export default function DeleteUser() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm<Required<{ password: string }>>({ password: '' });

    const deleteUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => reset(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        clearErrors();
        reset();
    };

    return (
        <div className="space-y-6">
            <HeadingSmall title="Delete account" description="Delete your account and all of its resources" />
            <Note variant="danger" className="font-medium">
                Please proceed with caution, this cannot be undone.
            </Note>

            <Modal onOpenChange={closeModal}>
                <Button variant="danger">Delete account</Button>
                <Modal.Content role="alertdialog">
                    <Form onSubmit={deleteUser} validationErrors={errors}>
                        <Modal.Header>
                            <Modal.Title>Are you sure you want to delete your account?</Modal.Title>
                            <Modal.Description>
                                Once your account is deleted, all of its resources and data will also be permanently deleted.
                            </Modal.Description>
                        </Modal.Header>
                        <Modal.Body>
                            <TextField
                                aria-label="Password"
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(v) => setData('password', v)}
                                placeholder="Password"
                                autoComplete="current-password"
                                errorMessage={errors.password}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="outline" slot="close">
                                Cancel
                            </Button>
                            <Button variant="danger" type="submit" isPending={processing} isDisabled={processing}>
                                <IconUserX />
                                Delete Account
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Content>
            </Modal>
        </div>
    );
}
