import DataOptions from '@/components/data-options';
import Paginator from '@/components/paginator';
import { Button, buttonStyle, Card, Header, Link, Modal } from '@/components/ui';
import AppLayout from '@/layouts/app-layout';
import TapelForm from '@/pages/tapel/form';
import type { BreadcrumbItem, FormSetting, Paginate } from '@/types';
import { Head } from '@inertiajs/react';
import { IconCalendarCheck, IconCalendarCog, IconCalendarPlus } from 'hq-icons';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Data Tapel', href: '/tapel' },
];

interface Props {
    tapels: Paginate & { data: model.Tapel[] };
    form: FormSetting & { data: model.Tapel };
}

export default function Tapel({ tapels, form }: Props) {
    const { data, meta, links, attributes } = tapels;
    const [openForm, setOpenForm] = useState(route().current() === 'tapel.create' || route().current() === 'tapel.edit');
    return (
        <>
            <Head title="Data Tahun Pelajaran" />
            <div className="flex h-[calc(100vh-4.1rem)] flex-1 flex-col rounded-xl p-6">
                <Header className="mb-6">
                    <Header.Title>Daftar Tahun Pelajaran</Header.Title>
                    <Header.Description>Daftar Tahun Pelajaran yang telah dibuat</Header.Description>
                    <Header.Action>
                        <Link href={route('tapel.create')} className={buttonStyle({ size: 'sm' })}>
                            <IconCalendarPlus />
                            Tambah Tapel
                        </Link>
                    </Header.Action>
                </Header>
                <DataOptions attributes={attributes} />
                <div className="grid gap-4 lg:grid-cols-2">
                    {data?.map((tapel) => (
                        <Card key={tapel.id}>
                            <Card.Header>
                                <Card.Title>
                                    {tapel.tahun}/{tapel.tahun + 1}
                                </Card.Title>
                                <Card.Description>Semester {tapel.semester}</Card.Description>
                                <Card.Action>
                                    <Link href={route('tapel.edit', tapel.id)} className={buttonStyle({ size: 'sm', variant: 'outline' })}>
                                        <IconCalendarCog />
                                        Edit
                                    </Link>
                                    {tapel.aktif ? (
                                        <Button variant="secondary" size="sm" isDisabled>
                                            Aktif
                                        </Button>
                                    ) : (
                                        <Modal>
                                            <Button size="sm">
                                                <IconCalendarCheck />
                                                Aktifkan
                                            </Button>
                                            <Modal.Content role="alertdialog">
                                                <Modal.Header>
                                                    <Modal.Title>
                                                        Aktifkan {tapel.tahun}/{tapel.tahun + 1} Semester {tapel.semester}?
                                                    </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>Apakah anda yakin? Hal ini akan berdampak pada keseluruhan aplikasi</Modal.Body>
                                                <Modal.Footer>
                                                    <Button slot="close" variant="outline">
                                                        Batal
                                                    </Button>
                                                    <Link
                                                        href={route('tapel.aktif', tapel.id)}
                                                        routerOptions={{ method: 'put' }}
                                                        className={buttonStyle()}
                                                    >
                                                        <IconCalendarCheck />
                                                        Aktifkan
                                                    </Link>
                                                </Modal.Footer>
                                            </Modal.Content>
                                        </Modal>
                                    )}
                                </Card.Action>
                            </Card.Header>
                            <Card.Content className="grid gap-2 lg:grid-cols-3">
                                <Card className="flex items-center justify-center p-3">
                                    <p>Kelas</p>
                                    <p className="text-3xl font-semibold">{tapel.kelas_count ?? '0'}</p>
                                </Card>
                                <Card className="flex items-center justify-center p-3">
                                    <p>Siswa</p>
                                    <p className="text-3xl font-semibold">{tapel.siswa_count ?? '0'}</p>
                                </Card>
                                <Card className="flex items-center justify-center p-3">
                                    <p>Proyek</p>
                                    <p className="text-3xl font-semibold">{tapel.proyek_count ?? '0'}</p>
                                </Card>
                            </Card.Content>
                        </Card>
                    ))}
                </div>
                <Paginator meta={meta} links={links} only={['tapels']} />
            </div>
            <TapelForm form={form} isOpen={openForm} setIsOpen={setOpenForm} />
        </>
    );
}

Tapel.layout = (page: React.ReactNode) => <AppLayout children={page} breadcrumbs={breadcrumbs} />;
