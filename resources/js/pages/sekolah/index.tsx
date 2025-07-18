import { Avatar, Badge, buttonStyle, Card, DL, Link } from '@/components/ui';
import AppLayout from '@/layouts/app-layout';
import { IsAdmin } from '@/lib/middleware';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { IconPencil } from 'hq-icons';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Sekolah', href: '/kepsek/sekolah' },
];

export default function Sekolah({ sekolah }: { sekolah: model.Sekolah }) {
    return (
        <>
            <Head title="Data Sekolah" />
            <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-4">
                <div className="flex h-fit flex-col gap-6 lg:col-span-1">
                    <Card className="h-fit">
                        <Card.Content className="mt-6 flex flex-col items-center gap-2">
                            <Avatar shape="square" className="outline-hidden" size="5xl" src={sekolah.logo || ''} alt={sekolah.nama} />
                            <div className="my-2 flex flex-wrap items-center justify-center gap-1 text-center text-sm font-semibold">
                                {sekolah.nama}
                            </div>
                        </Card.Content>
                    </Card>
                    <Card className="h-fit">
                        <Card.Content className="mt-6 flex flex-col items-center gap-2">
                            <h3 className="text-center text-lg font-semibold tracking-tight">Kepala Sekolah</h3>
                            <Avatar shape="square" size="5xl" src={sekolah.kepsek.avatar || ''} alt={sekolah.kepsek.nama} />
                            <div className="my-2 flex flex-wrap items-center justify-center gap-1 text-sm">
                                <Link href={IsAdmin() ? route('guru.show', sekolah.kepsek.id) : '#'}>
                                    <Badge variant="danger">{sekolah.kepsek.nama}</Badge>
                                </Link>
                            </div>
                        </Card.Content>
                    </Card>
                </div>
                <Card className="h-fit lg:col-span-3">
                    <Card.Header>
                        <Card.Title>Sekolah</Card.Title>
                        <Card.Description>Berikut adalah data lengkap sekolah</Card.Description>
                        {IsAdmin() && (
                            <Card.Action>
                                <Link className={buttonStyle({ variant: 'outline' })} href={route('sekolah.edit', 1)}>
                                    <IconPencil />
                                    Edit
                                </Link>
                            </Card.Action>
                        )}
                    </Card.Header>
                    <Card.Content>
                        <DL>
                            <DL.T>Nama Sekolah</DL.T>
                            <DL.D>{sekolah.nama}</DL.D>
                            <DL.T>Jenjang</DL.T>
                            <DL.D>{sekolah.jenjang}</DL.D>
                            <DL.T>NPSN</DL.T>
                            <DL.D>{sekolah.npsn}</DL.D>
                            <DL.T>NIS</DL.T>
                            <DL.D>{sekolah.nis}</DL.D>
                            <DL.T>NSN</DL.T>
                            <DL.D>{sekolah.nss}</DL.D>
                            <DL.T>NDN</DL.T>
                            <DL.D>{sekolah.nds}</DL.D>
                            <DL.T>Alamat</DL.T>
                            <DL.D>{sekolah.alamat}</DL.D>
                            <DL.T>Kode Pos</DL.T>
                            <DL.D>{sekolah.kodepos}</DL.D>
                            <DL.T>Telepon</DL.T>
                            <DL.D>{sekolah.telepon}</DL.D>
                            <DL.T>Email</DL.T>
                            <DL.D>{sekolah.email}</DL.D>
                            <DL.T>Kepala Sekolah</DL.T>
                            <DL.D>{sekolah.kepsek.nama}</DL.D>
                        </DL>
                    </Card.Content>
                </Card>
            </div>
        </>
    );
}

Sekolah.layout = (page: React.ReactNode) => <AppLayout children={page} breadcrumbs={breadcrumbs} />;
