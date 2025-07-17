import { SearchableSelect } from '@/components/searchable-select';
import { Button, buttonStyle, Card, DatePicker, Form, Link, Radio, RadioGroup, TextField } from '@/components/ui';
import { UploadFoto } from '@/components/upload-foto';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, FormSetting, SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { getLocalTimeZone, parseDate, today } from '@internationalized/date';
import { IconArrowLeft, IconSave } from 'hq-icons';

interface Props {
    guru: model.Guru;
    form: FormSetting;
}

export default function GuruForm({ guru, form }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: form.method,
        nama: guru.nama || '',
        jk: guru.jk || 'l',
        nip: guru.nip || '',
        nuptk: guru.nuptk || '',
        nik: guru.nik || '',
        tempat_lahir: guru.tempat_lahir || '',
        tanggal_lahir: guru.tanggal_lahir ?? today(getLocalTimeZone()).toString(),
        telepon: guru.telepon || '',
        alamat: guru.alamat || '',
        wilayah_id: guru.wilayah_id || '',
        avatar: guru.avatar || (null as File | null),
    });

    function onSubmit(e: { preventDefault: () => void }) {
        e.preventDefault();
        post(form.url);
    }

    const { prev_url } = usePage<SharedData>().props.ziggy;

    return (
        <>
            <Head title={form.title} />
            <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-4">
                <Card className="h-fit lg:col-span-1">
                    <Card.Content className="mt-6 flex flex-col items-center gap-2">
                        <UploadFoto value={guru.avatar || ''} onChange={(v) => setData('avatar', v)} />
                    </Card.Content>
                </Card>
                <Card className="h-fit lg:col-span-3">
                    <Card.Header>
                        <Card.Title>{form.title}</Card.Title>
                        <Card.Description>Silakan isi form dibawah ini</Card.Description>
                        <Card.Action>
                            <Link className={buttonStyle({ variant: 'outline' })} href={prev_url ?? route('guru.index')}>
                                <IconArrowLeft />
                                Kembali
                            </Link>
                        </Card.Action>
                    </Card.Header>
                    <Form onSubmit={onSubmit} validationErrors={errors}>
                        <Card.Content className="space-y-2">
                            <div className="grid grid-cols-4 items-start gap-4">
                                <TextField
                                    className="col-span-full md:col-span-3"
                                    type="text"
                                    label="Nama"
                                    name="nama"
                                    value={data.nama}
                                    autoFocus
                                    onChange={(v) => setData('nama', v)}
                                    errorMessage={errors.nama}
                                    isRequired
                                />
                                <TextField
                                    className="col-span-full md:col-span-1"
                                    type="text"
                                    label="NIP"
                                    name="nip"
                                    value={data.nip}
                                    onChange={(v) => setData('nip', v)}
                                    errorMessage={errors.nip}
                                />
                                <RadioGroup
                                    className="col-span-full"
                                    name="jk"
                                    label="Jenis Kelamin"
                                    value={data.jk}
                                    onChange={(v) => setData('jk', v)}
                                    orientation="horizontal"
                                    isRequired
                                >
                                    <Radio value="l" label="Laki-laki" />
                                    <Radio value="p" label="Perempuan" />
                                </RadioGroup>
                                <TextField
                                    className="col-span-full md:col-span-2"
                                    type="text"
                                    label="NUPTK"
                                    name="nuptk"
                                    value={data.nuptk}
                                    onChange={(v) => setData('nuptk', v)}
                                    errorMessage={errors.nuptk}
                                />
                                <TextField
                                    className="col-span-full md:col-span-2"
                                    type="text"
                                    label="NIK"
                                    name="nik"
                                    value={data.nik}
                                    onChange={(v) => setData('nik', v)}
                                    errorMessage={errors.nik}
                                />
                                <TextField
                                    className="col-span-full md:col-span-2"
                                    type="text"
                                    label="Tempat Lahir"
                                    name="tempat_lahir"
                                    value={data.tempat_lahir}
                                    onChange={(v) => setData('tempat_lahir', v)}
                                    errorMessage={errors.tempat_lahir}
                                />
                                <DatePicker
                                    className="col-span-full md:col-span-2"
                                    label="Tanggal Lahir"
                                    name="tanggal_lahir"
                                    value={parseDate(data.tanggal_lahir)}
                                    onChange={(v) => setData('tanggal_lahir', v!.toString())}
                                    errorMessage={errors.tanggal_lahir}
                                />
                                <TextField
                                    className="col-span-full"
                                    type="text"
                                    label="Telepon"
                                    name="telepon"
                                    value={data.telepon}
                                    onChange={(v) => setData('telepon', v)}
                                    errorMessage={errors.telepon}
                                />
                                <TextField
                                    className="col-span-full"
                                    type="text"
                                    label="Alamat"
                                    name="alamat"
                                    value={data.alamat}
                                    onChange={(v) => setData('alamat', v)}
                                    errorMessage={errors.alamat}
                                />
                                <SearchableSelect
                                    data="wilayah"
                                    className="col-span-full"
                                    name="wilayah_id"
                                    defaultSelectedKey={data.wilayah_id}
                                    selectedKey={data.wilayah_id}
                                    onSelectionChange={(v) => setData('wilayah_id', v!)}
                                    errorMessage={errors.wilayah_id}
                                />
                            </div>
                        </Card.Content>
                        <Card.Footer>
                            <Button className="ml-auto" type="submit" isDisabled={processing}>
                                <IconSave />
                                Simpan
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        </>
    );
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Data Guru', href: '/guru' },
    { title: 'Edit Guru', href: '/guru' },
];

GuruForm.layout = (page: React.ReactNode) => <AppLayout children={page} breadcrumbs={breadcrumbs} />;
