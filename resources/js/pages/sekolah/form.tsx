import { SearchableSelect } from '@/components/searchable-select';
import { Button, buttonStyle, Card, Form, Link, Select, TextField } from '@/components/ui';
import { UploadFoto } from '@/components/upload-foto';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, FormSetting } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { IconArrowLeft, IconSave } from 'hq-icons';

interface Props {
    sekolah: model.Sekolah;
    form: FormSetting;
}

export default function SekolahForm({ sekolah, form }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: form.method,
        nama: sekolah.nama || '',
        jenjang: sekolah.jenjang || '',
        npsn: sekolah.npsn || '',
        nis: sekolah.nis || '',
        nss: sekolah.nss || '',
        nds: sekolah.nds || '',
        alamat: sekolah.alamat || '',
        wilayah_id: sekolah.wilayah_id || '',
        kodepos: sekolah.kodepos || '',
        telepon: sekolah.telepon || '',
        email: sekolah.email || '',
        logo: sekolah.logo || (null as File | null),
        kepsek_id: sekolah.kepsek.id || '',
    });

    function onSubmit(e: { preventDefault: () => void }) {
        e.preventDefault();
        post(form.url);
    }

    return (
        <>
            <Head title={form.title} />
            <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-4">
                <Card className="h-fit lg:col-span-1">
                    <Card.Content className="mt-6 flex flex-col items-center gap-2">
                        <UploadFoto label="Upload Logo" value={sekolah.logo || ''} onChange={(v) => setData('logo', v)} />
                    </Card.Content>
                </Card>
                <Card className="h-fit lg:col-span-3">
                    <Card.Header>
                        <Card.Title>{form.title}</Card.Title>
                        <Card.Description>Silakan isi form dibawah ini</Card.Description>
                        <Card.Action>
                            <Link className={buttonStyle({ variant: 'outline' })} href={route('sekolah.index')}>
                                <IconArrowLeft />
                                Kembali
                            </Link>
                        </Card.Action>
                    </Card.Header>
                    <Form onSubmit={onSubmit} validationErrors={errors}>
                        <Card.Content className="space-y-2">
                            <div className="grid grid-cols-3 items-start gap-4">
                                <TextField
                                    className="col-span-full md:col-span-2"
                                    type="text"
                                    label="Nama"
                                    name="nama"
                                    value={data.nama}
                                    autoFocus
                                    onChange={(v) => setData('nama', v)}
                                    errorMessage={errors.nama}
                                    isRequired
                                />
                                <Select
                                    label="Jenjang"
                                    className="col-span-full md:col-span-1"
                                    name="jenjang"
                                    defaultSelectedKey={data.jenjang}
                                    selectedKey={data.jenjang}
                                    onSelectionChange={(v) => setData('jenjang', String(v!))}
                                    errorMessage={errors.jenjang}
                                    isRequired
                                >
                                    <Select.Item id="TK/PAUD">TK/PAUD</Select.Item>
                                    <Select.Item id="SD/MI">SD/MI</Select.Item>
                                    <Select.Item id="SMP/MTs">SMP/MTs</Select.Item>
                                    <Select.Item id="SMA/MA/SMK">SMA/MA/SMK</Select.Item>
                                </Select>
                                <TextField
                                    className="col-span-full"
                                    type="text"
                                    label="NPSN"
                                    name="npsn"
                                    value={data.npsn}
                                    onChange={(v) => setData('npsn', v)}
                                    errorMessage={errors.npsn}
                                />
                                <TextField
                                    className="col-span-full md:col-span-1"
                                    type="text"
                                    label="NIS"
                                    name="nis"
                                    value={data.nis}
                                    onChange={(v) => setData('nis', v)}
                                    errorMessage={errors.nis}
                                />
                                <TextField
                                    className="col-span-full md:col-span-1"
                                    type="text"
                                    label="NSS"
                                    name="nss"
                                    value={data.nss}
                                    onChange={(v) => setData('nss', v)}
                                    errorMessage={errors.nss}
                                />
                                <TextField
                                    className="col-span-full md:col-span-1"
                                    type="text"
                                    label="NDS"
                                    name="nds"
                                    value={data.nds}
                                    onChange={(v) => setData('nds', v)}
                                    errorMessage={errors.nds}
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
                                <TextField
                                    className="col-span-full md:col-span-1"
                                    type="text"
                                    label="Kode Pos"
                                    name="kodepos"
                                    value={data.kodepos}
                                    onChange={(v) => setData('kodepos', v)}
                                    errorMessage={errors.kodepos}
                                />
                                <TextField
                                    className="col-span-full md:col-span-1"
                                    type="text"
                                    label="Telepon"
                                    name="telepon"
                                    value={data.telepon}
                                    onChange={(v) => setData('telepon', v)}
                                    errorMessage={errors.telepon}
                                />
                                <TextField
                                    className="col-span-full"
                                    type="email"
                                    label="Email"
                                    name="email"
                                    value={data.email}
                                    onChange={(v) => setData('email', v)}
                                    errorMessage={errors.email}
                                />
                                <SearchableSelect
                                    data="guru"
                                    className="col-span-full"
                                    name="kepsek_id"
                                    defaultSelectedKey={data.kepsek_id}
                                    selectedKey={data.kepsek_id}
                                    onSelectionChange={(v) => setData('kepsek_id', v!)}
                                    errorMessage={errors.kepsek_id}
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
    { title: 'Data Sekolah', href: '/sekolah' },
    { title: 'Edit Sekolah', href: '/sekolah' },
];

SekolahForm.layout = (page: React.ReactNode) => <AppLayout children={page} breadcrumbs={breadcrumbs} />;
