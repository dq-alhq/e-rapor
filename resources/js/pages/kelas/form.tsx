import { SearchableSelect } from '@/components/searchable-select';
import { Button, Form, Modal, Select, TextField } from '@/components/ui';
import { wait } from '@/lib/utils';
import { FormSetting, OverlayProps, SharedData } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import { IconSave } from 'hq-icons';

interface Props extends OverlayProps {
    form: FormSetting & { data: model.Kelas; options: number[] };
    tapel_aktif: model.Tapel;
}

export default function KelasForm({ form, isOpen, setIsOpen, tapel_aktif }: Props) {
    const { data: kelas, method, url, options } = form;
    const { data, setData, post, processing, errors } = useForm({
        _method: method,
        nama: kelas.nama ?? '',
        tingkat: kelas.tingkat ?? '1',
        wali_id: kelas.wali_id || '',
    });

    function onSubmit(e: { preventDefault: () => void }) {
        e.preventDefault();
        post(url, { onSuccess: () => onClose() });
    }

    function onClose() {
        setIsOpen(false);
        wait(300).then(() => router.get(prev_url ?? route('kelas.index')));
    }

    const { prev_url } = usePage<SharedData>().props.ziggy;

    return (
        <Modal.Content isOpen={isOpen} onOpenChange={onClose}>
            <Modal.Header>
                <Modal.Title>{form.title}</Modal.Title>
                <Modal.Description>Silakan isi form di bawah ini!</Modal.Description>
            </Modal.Header>
            <Form onSubmit={onSubmit} validationErrors={errors}>
                <Modal.Body>
                    <div className="grid grid-cols-4 items-start gap-4">
                        <TextField
                            className="col-span-full"
                            isReadOnly
                            label="Tahun Pelajaran"
                            value={tapel_aktif.tahun + '/' + (tapel_aktif.tahun + 1) + ' - Semester ' + tapel_aktif.semester}
                        />
                        <Select
                            className="col-span-full md:col-span-1"
                            label="Tingkat"
                            name="tingkat"
                            isDisabled={method == 'put'}
                            selectedKey={data.tingkat}
                            onSelectionChange={(v) => setData('tingkat', Number(v!))}
                            errorMessage={errors.tingkat}
                            isRequired
                            placeholder="Tingkat"
                        >
                            {options.map((option) => (
                                <Select.Item key={option} id={option}>
                                    <Select.Label>{option}</Select.Label>
                                </Select.Item>
                            ))}
                        </Select>
                        <TextField
                            className="col-span-full md:col-span-3"
                            type="text"
                            label="Nama"
                            name="nama"
                            value={data.nama}
                            onChange={(v) => setData('nama', v)}
                            errorMessage={errors.nama}
                            isRequired
                        />
                        <SearchableSelect
                            data="guru"
                            className="col-span-full"
                            label="Wali Kelas"
                            name="wali_id"
                            defaultSelectedKey={data.wali_id}
                            selectedKey={data.wali_id}
                            onSelectionChange={(v) => setData('wali_id', v!)}
                            errorMessage={errors.wali_id}
                        />
                    </div>
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
