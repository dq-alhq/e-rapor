import { Button, DatePicker, Form, Modal, NumberField, Radio, RadioGroup, TextField } from '@/components/ui';
import { wait } from '@/lib/utils';
import { FormSetting, OverlayProps } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { getLocalTimeZone, parseDate, today } from '@internationalized/date';
import { IconSave } from 'hq-icons';

interface Props extends OverlayProps {
    form: FormSetting & { data: model.Tapel };
}

export default function TapelForm({ form, isOpen, setIsOpen }: Props) {
    const { data: tapel, method, url } = form;
    const { data, setData, post, processing, errors } = useForm({
        _method: method,
        tahun: tapel.tahun ?? new Date().getFullYear(),
        semester: tapel.semester ?? '1',
        tempat_rapor: tapel.tempat_rapor ?? '',
        tanggal_rapor: tapel.tanggal_rapor ?? today(getLocalTimeZone()).toString(),
    });

    function onSubmit(e: { preventDefault: () => void }) {
        e.preventDefault();
        post(url, { onSuccess: () => onClose() });
    }

    function onClose() {
        setIsOpen(false);
        wait(300).then(() => router.get(route('tapel.index')));
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
                        <NumberField
                            className="col-span-full md:col-span-1"
                            label="Tahun"
                            name="tahun"
                            value={data.tahun}
                            onChange={(v) => setData('tahun', v)}
                            errorMessage={errors.tahun}
                            isRequired
                        />
                        <RadioGroup
                            className="col-span-full md:col-span-3"
                            name="semester"
                            label="Semester"
                            value={data.semester}
                            onChange={(v) => setData('semester', v)}
                            orientation="horizontal"
                            isRequired
                        >
                            <Radio value="1" label="Ganjil" />
                            <Radio value="2" label="Genap" />
                        </RadioGroup>
                        <TextField
                            className="col-span-full md:col-span-2"
                            type="text"
                            label="Tempat Rapor"
                            name="tempat_rapor"
                            value={data.tempat_rapor}
                            onChange={(v) => setData('tempat_rapor', v)}
                            errorMessage={errors.tempat_rapor}
                        />
                        <DatePicker
                            className="col-span-full md:col-span-2"
                            label="Tanggal Rapor"
                            name="tanggal_rapor"
                            value={parseDate(data.tanggal_rapor)}
                            onChange={(v) => setData('tanggal_rapor', v!.toString())}
                            errorMessage={errors.tanggal_rapor}
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
