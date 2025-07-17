import { SearchableSelect } from '@/components/searchable-select';
import { Button, Form, Modal, TextField } from '@/components/ui';
import { wait } from '@/lib/utils';
import { OverlayProps } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { IconSave } from 'hq-icons';

interface Props extends OverlayProps {
    mapel: model.Mapel;
    kelas: model.Kelas;
    guru: number | string;
}

export default function PembelajaranForm({ mapel, kelas, guru, isOpen, setIsOpen }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        guru_id: guru || '',
    });

    function onSubmit(e: { preventDefault: () => void }) {
        e.preventDefault();
        put(route('pembelajaran.mapel', [mapel.id, kelas.id]), {
            onSuccess: () => onClose(),
        });
    }

    function onClose() {
        setIsOpen(false);
        wait(300).then(() => router.get(route('mapel.show', mapel.id)));
    }

    return (
        <Modal.Content isOpen={isOpen} onOpenChange={onClose}>
            <Modal.Header>
                <Modal.Title>Pembelajaran</Modal.Title>
                <Modal.Description>Silakan atur pembelajaran di bawah ini!</Modal.Description>
            </Modal.Header>
            <Form onSubmit={onSubmit} validationErrors={errors}>
                <Modal.Body className="space-y-4">
                    <TextField isReadOnly label="Mata Pelajaran" name="mapel" value={mapel.nama} />
                    <TextField isReadOnly label="Kelas" name="kelas" value={kelas.nama} />
                    <SearchableSelect
                        data="guru-mapel"
                        additional={`mapel=${mapel.id}`}
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
    );
}
