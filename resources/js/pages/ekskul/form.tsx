import { SearchableSelect } from '@/components/searchable-select';
import { Button, Form, Modal, Textarea, TextField } from '@/components/ui';
import { wait } from '@/lib/utils';
import { FormSetting, OverlayProps, SharedData } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { IconSave } from 'hq-icons';

interface Props extends OverlayProps {
    form: FormSetting & { data: model.Ekskul };
}

export default function EkskulForm({ form, isOpen, setIsOpen }: Props) {
    const { data: ekskul, method, url } = form;
    const { data, setData, post, processing, errors } = useForm({
        _method: method,
        nama: ekskul.nama || '',
        deskripsi: ekskul.deskripsi || '',
        guru_id: ekskul.guru_id || '',
    });

    function onSubmit(e: { preventDefault: () => void }) {
        e.preventDefault();
        post(url, {
            onSuccess: () => onClose(),
        });
    }

    function onClose() {
        setIsOpen(false);
        wait(300).then(() => router.get(prev_url ?? route('ekskul.index')));
    }

    const { prev_url } = usePage<SharedData>().props.ziggy;

    return (
        <>
            <Head title={form.title} />
            <div className="p-6">
                <Modal.Content isOpen={isOpen} onOpenChange={onClose}>
                    <Modal.Header>
                        <Modal.Title>{form.title}</Modal.Title>
                        <Modal.Description>Silakan isi form di bawah ini!</Modal.Description>
                    </Modal.Header>
                    <Form onSubmit={onSubmit} validationErrors={errors}>
                        <Modal.Body className="space-y-4">
                            <TextField
                                type="text"
                                label="Nama"
                                name="nama"
                                autoFocus
                                value={data.nama}
                                onChange={(v) => setData('nama', v)}
                                errorMessage={errors.nama}
                                isRequired
                            />
                            <Textarea
                                type="text"
                                label="Deskripsi"
                                name="deskripsi"
                                value={data.deskripsi}
                                onChange={(v) => setData('deskripsi', v)}
                                errorMessage={errors.deskripsi}
                            />
                            <SearchableSelect
                                data="guru"
                                label="Guru"
                                name="guru_id"
                                selectedKey={data.guru_id}
                                onSelectionChange={(v) => setData('guru_id', v!)}
                                errorMessage={errors.guru_id}
                                isRequired
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button isPending={processing} type="submit">
                                <IconSave />
                                Simpan
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Content>
            </div>
        </>
    );
}
