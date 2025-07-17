import { SearchableSelect } from '@/components/searchable-select';
import { Button, buttonStyle, Card, Form, Link, TextField } from '@/components/ui';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, FormSetting, OverlayProps, SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { IconArrowLeft, IconSave } from 'hq-icons';

interface Props extends OverlayProps {
    form: FormSetting & { data: model.Mapel };
}

export default function MapelForm({ form }: Props) {
    const { data: mapel, method, url } = form;
    const { data, setData, post, processing, errors } = useForm({
        _method: method,
        kelompok_mapel_id: mapel.kelompok_mapel_id || '',
        nama: mapel.nama || '',
        singkatan: mapel.singkatan || '',
    });

    function onSubmit(e: { preventDefault: () => void }) {
        e.preventDefault();
        post(url);
    }

    const { prev_url } = usePage<SharedData>().props.ziggy;

    return (
        <>
            <Head title={form.title} />
            <div className="p-6">
                <Card>
                    <Card.Header>
                        <Card.Title>{form.title}</Card.Title>
                        <Card.Description>Silakan isi form di bawah ini!</Card.Description>
                        <Card.Action>
                            <Link className={buttonStyle({ variant: 'outline' })} href={prev_url ?? route('mapel.index')}>
                                <IconArrowLeft />
                                Kembali
                            </Link>
                        </Card.Action>
                    </Card.Header>
                    <Form onSubmit={onSubmit} validationErrors={errors}>
                        <Card.Content>
                            <div className="grid grid-cols-4 items-start gap-4">
                                <SearchableSelect
                                    className="col-span-full"
                                    data="kelompok-mapel"
                                    label="Kelompok"
                                    name="kelompok_mapel_id"
                                    selectedKey={data.kelompok_mapel_id}
                                    onSelectionChange={(v) => setData('kelompok_mapel_id', v!)}
                                    errorMessage={errors.kelompok_mapel_id}
                                    isRequired
                                />
                                <TextField
                                    className="col-span-full md:col-span-1"
                                    type="text"
                                    maxLength={3}
                                    label="Singkatan"
                                    name="singkatan"
                                    value={data.singkatan}
                                    onChange={(v) => setData('singkatan', v)}
                                    errorMessage={errors.singkatan}
                                    isRequired
                                />
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
                            </div>
                        </Card.Content>
                        <Card.Footer>
                            <Button isPending={processing} type="submit">
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
    { title: 'Data Mapel', href: '/mapel' },
    { title: 'Edit Mapel', href: '/mapel' },
];

MapelForm.layout = (page: React.ReactNode) => <AppLayout children={page} breadcrumbs={breadcrumbs} />;
