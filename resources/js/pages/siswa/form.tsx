import { SearchableSelect } from '@/components/searchable-select';
import { Button, buttonStyle, Card, DatePicker, Form, Header, Link, NumberField, Radio, RadioGroup, TextField } from '@/components/ui';
import { UploadFoto } from '@/components/upload-foto';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, FormSetting, SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { getLocalTimeZone, parseDate, today } from '@internationalized/date';
import { IconArrowLeft, IconSave } from 'hq-icons';

interface Props {
    siswa: model.Siswa;
    form: FormSetting;
}

export default function SiswaForm({ siswa, form }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: form.method,
        nama: siswa.nama || '',
        jk: siswa.jk || 'l',
        nik: siswa.nik || '',
        nis: siswa.nis || '',
        nisn: siswa.nisn || '',
        tempat_lahir: siswa.tempat_lahir || '',
        tanggal_lahir: siswa.tanggal_lahir ?? today(getLocalTimeZone()).toString(),
        telepon: siswa.telepon || '',
        alamat: siswa.alamat || '',
        wilayah_id: siswa.wilayah_id || '',
        avatar: siswa.avatar || (null as File | null),
        status_dalam_keluarga: siswa.status_dalam_keluarga || '1',
        anak_ke: siswa.anak_ke || 1,
        nama_ayah: siswa.nama_ayah || '',
        pekerjaan_ayah: siswa.pekerjaan_ayah || '',
        nama_ibu: siswa.nama_ibu || '',
        pekerjaan_ibu: siswa.pekerjaan_ibu || '',
        nama_wali: siswa.nama_wali || '',
        pekerjaan_wali: siswa.pekerjaan_wali || '',
        telepon_wali: siswa.telepon_wali || '',
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
                        <UploadFoto value={siswa.avatar || ''} onChange={(v) => setData('avatar', v)} />
                    </Card.Content>
                </Card>
                <Card className="h-fit lg:col-span-3">
                    <Card.Header>
                        <Card.Title>{form.title}</Card.Title>
                        <Card.Description>Silakan isi form dibawah ini</Card.Description>
                        <Card.Action>
                            <Link className={buttonStyle({ variant: 'outline' })} href={prev_url ?? route('siswa.index')}>
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
                                    label="NIS"
                                    name="nis"
                                    value={data.nis}
                                    onChange={(v) => setData('nis', v)}
                                    errorMessage={errors.nis}
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
                                    label="NISN"
                                    name="nisn"
                                    value={data.nisn}
                                    onChange={(v) => setData('nisn', v)}
                                    errorMessage={errors.nisn}
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
                                <NumberField
                                    className="col-span-full md:col-span-2"
                                    label="Anak Ke"
                                    name="anak_ke"
                                    value={data.anak_ke}
                                    onChange={(v) => setData('anak_ke', v)}
                                    errorMessage={errors.anak_ke}
                                />
                                <RadioGroup
                                    className="col-span-full md:col-span-2"
                                    name="status_dalam_keluarga"
                                    label="Status Dalam Keluarga"
                                    value={String(data.status_dalam_keluarga)}
                                    onChange={(v) => setData('status_dalam_keluarga', v)}
                                    orientation="horizontal"
                                    isRequired
                                >
                                    <Radio value="1" label="Anak Kandung" />
                                    <Radio value="2" label="Anak Tiri" />
                                    <Radio value="3" label="Anak Angkat" />
                                </RadioGroup>
                                <Header className="col-span-full my-4">Data Orang Tua Siswa</Header>
                                <TextField
                                    className="col-span-full md:col-span-2"
                                    type="text"
                                    label="Nama Ayah"
                                    name="nama_ayah"
                                    value={data.nama_ayah}
                                    onChange={(v) => setData('nama_ayah', v)}
                                    errorMessage={errors.nama_ayah}
                                />
                                <TextField
                                    className="col-span-full md:col-span-2"
                                    type="text"
                                    label="Pekerjaan Ayah"
                                    name="pekerjaan_ayah"
                                    value={data.pekerjaan_ayah}
                                    onChange={(v) => setData('pekerjaan_ayah', v)}
                                    errorMessage={errors.pekerjaan_ayah}
                                />
                                <TextField
                                    className="col-span-full md:col-span-2"
                                    type="text"
                                    label="Nama Ibu"
                                    name="nama_ibu"
                                    value={data.nama_ibu}
                                    onChange={(v) => setData('nama_ibu', v)}
                                    errorMessage={errors.nama_ibu}
                                />
                                <TextField
                                    className="col-span-full md:col-span-2"
                                    type="text"
                                    label="Pekerjaan Ibu"
                                    name="pekerjaan_ibu"
                                    value={data.pekerjaan_ibu}
                                    onChange={(v) => setData('pekerjaan_ibu', v)}
                                    errorMessage={errors.pekerjaan_ibu}
                                />
                                <TextField
                                    className="col-span-full md:col-span-2"
                                    type="text"
                                    label="Nama Wali"
                                    name="nama_wali"
                                    value={data.nama_wali}
                                    onChange={(v) => setData('nama_wali', v)}
                                    errorMessage={errors.nama_wali}
                                />
                                <TextField
                                    className="col-span-full md:col-span-2"
                                    type="text"
                                    label="Pekerjaan Wali"
                                    name="pekerjaan_wali"
                                    value={data.pekerjaan_wali}
                                    onChange={(v) => setData('pekerjaan_wali', v)}
                                    errorMessage={errors.pekerjaan_wali}
                                />
                                <TextField
                                    className="col-span-full md:col-span-2"
                                    type="text"
                                    label="Telepon Wali"
                                    name="telepon_wali"
                                    value={data.telepon_wali}
                                    onChange={(v) => setData('telepon_wali', v)}
                                    errorMessage={errors.telepon_wali}
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
    { title: 'Data Siswa', href: '/siswa' },
    { title: 'Edit Siswa', href: '/siswa' },
];

SiswaForm.layout = (page: React.ReactNode) => <AppLayout children={page} breadcrumbs={breadcrumbs} />;
