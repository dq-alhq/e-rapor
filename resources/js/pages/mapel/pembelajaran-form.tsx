import { SearchableSelect } from '@/components/searchable-select';
import { Button, Form, Sheet, TextField } from '@/components/ui';
import { wait } from '@/lib/utils';
import { OverlayProps } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { IconSave } from 'hq-icons';

interface Props extends OverlayProps {
    mapel: model.Mapel;
    form: {
        kelas: model.Kelas;
        guru: model.Guru;
    };
}

export default function PembelajaranForm({ mapel, form, isOpen, setIsOpen }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        guru_id: form.guru.id || '',
    });

    function onSubmit(e: { preventDefault: () => void }) {
        e.preventDefault();
        put(route('pembelajaran.mapel', [mapel.id, form.kelas.id]), {
            onSuccess: () => onClose(),
        });
    }

    function onClose() {
        setIsOpen(false);
        wait(300).then(() => router.get(route('mapel.show', mapel.id)));
    }

    return (
        <Sheet.Content isOpen={isOpen} onOpenChange={onClose}>
            <Sheet.Header>
                <Sheet.Title>Pembelajaran</Sheet.Title>
                <Sheet.Description>Silakan atur pembelajaran di bawah ini!</Sheet.Description>
            </Sheet.Header>
            <Form onSubmit={onSubmit} validationErrors={errors}>
                <Sheet.Body className="space-y-4">
                    <TextField isReadOnly label="Mata Pelajaran" name="mapel" value={mapel.nama} />
                    <TextField isReadOnly label="Kelas" name="kelas" value={form.kelas.nama} />
                    <SearchableSelect
                        data="guru"
                        label="Guru"
                        name="guru_id"
                        selectedKey={data.guru_id}
                        onSelectionChange={(v) => setData('guru_id', v!)}
                        errorMessage={errors.guru_id}
                        isRequired
                    />
                </Sheet.Body>
                <Sheet.Footer>
                    <Button isPending={processing} type="submit">
                        <IconSave />
                        Simpan
                    </Button>
                </Sheet.Footer>
            </Form>
        </Sheet.Content>
    );
}
