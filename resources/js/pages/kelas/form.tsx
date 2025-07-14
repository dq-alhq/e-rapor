import GuruSelect from '@/components/guru-select';
import { Button, Form, Modal, Select, TextField } from '@/components/ui';
import { wait } from '@/lib/utils';
import { FormSetting, OverlayProps } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { IconSave } from 'hq-icons';

interface Props extends OverlayProps {
    form: FormSetting & { data: model.Kelas };
    tapel_aktif: model.Tapel;
}

export default function KelasForm({ form, isOpen, setIsOpen, tapel_aktif }: Props) {
    const { data: kelas, method, url } = form;
    const { data, setData, post, processing, errors } = useForm({
        _method: method,
        nama: kelas.nama ?? '',
        tingkat: kelas.tingkat ?? '1',
        wali_id: kelas.wali_id ?? '',
    });

    function onSubmit(e: { preventDefault: () => void }) {
        e.preventDefault();
        post(url, { onSuccess: () => onClose() });
    }

    function onClose() {
        setIsOpen(false);
        wait(300).then(() => router.get(route('kelas.index')));
    }

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
                            autoFocus
                            selectedKey={data.tingkat.toString()}
                            onSelectionChange={(v) => setData('tingkat', v! as number)}
                            errorMessage={errors.tingkat}
                            isRequired
                        >
                            <Select.Item id={'1'}>1</Select.Item>
                            <Select.Item id={'2'}>2</Select.Item>
                            <Select.Item id={'3'}>3</Select.Item>
                            <Select.Item id={'4'}>4</Select.Item>
                            <Select.Item id={'5'}>5</Select.Item>
                            <Select.Item id={'6'}>6</Select.Item>
                            <Select.Item id={'7'}>7</Select.Item>
                            <Select.Item id={'8'}>8</Select.Item>
                            <Select.Item id={'9'}>9</Select.Item>
                            <Select.Item id={'10'}>10</Select.Item>
                            <Select.Item id={'11'}>11</Select.Item>
                            <Select.Item id={'12'}>12</Select.Item>
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
                        <GuruSelect
                            className="col-span-full"
                            name="wilayah_id"
                            defaultSelectedKey={data.wali_id}
                            selectedKey={data.wali_id}
                            onSelectionChange={(v) => setData('wali_id', v! as number)}
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
