import { Avatar, Badge, buttonStyle, Card, DL, Link } from '@/components/ui';
import AppLayout from '@/layouts/app-layout';
import { formatDate } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { IconArrowLeft, IconPencil } from 'hq-icons';

interface Props {
    guru: model.Guru;
}

export default function GuruShow({ guru }: Props) {
    return (
        <>
            <Head title={guru.nama} />
            <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-4">
                <Card className="h-fit lg:col-span-1">
                    <Card.Content className="mt-6 flex flex-col items-center gap-2">
                        <Avatar shape="square" size="5xl" src={guru.avatar || ''} alt={guru.nama} />
                        <div className="my-2 flex flex-wrap items-center justify-center gap-1 text-sm">
                            {/* @ts-expect-error additional-type */}
                            {guru.roles?.map((r) => (
                                <Badge variant="danger" key={r}>
                                    {r}
                                </Badge>
                            ))}
                        </div>
                        {Object.keys(guru?.pembelajaran).map((p) => (
                            <fieldset key={p} className="w-full rounded-lg border px-3 py-2">
                                <legend className="text-sm font-semibold">{p}</legend>
                                <div className="flex flex-wrap gap-1">
                                    {/* @ts-expect-error additional-type */}
                                    {guru.pembelajaran[p as keyof typeof guru.pembelajaran]?.map((k: { kelas: string }) => (
                                        <Badge key={k.kelas}>{k.kelas}</Badge>
                                    ))}
                                </div>
                            </fieldset>
                        ))}
                    </Card.Content>
                </Card>
                <Card className="h-fit lg:col-span-3">
                    <Card.Header>
                        <Card.Title>Data Guru</Card.Title>
                        <Card.Description>Berikut adalah data guru</Card.Description>
                        <Card.Action>
                            <Link className={buttonStyle({ variant: 'outline' })} href={route('guru.edit', guru.id)}>
                                <IconPencil /> Edit
                            </Link>
                            <Link className={buttonStyle({ variant: 'outline' })} href={route('guru.index')}>
                                <IconArrowLeft />
                                Kembali
                            </Link>
                        </Card.Action>
                    </Card.Header>
                    <Card.Content>
                        <DL>
                            <DL.T>Nama</DL.T>
                            <DL.D>{guru.nama}</DL.D>
                            <DL.T>Jenis Kelamin</DL.T>
                            <DL.D>{guru.jk === 'l' ? 'Laki-laki' : 'Perempuan'}</DL.D>
                            <DL.T>NIP</DL.T>
                            <DL.D>{guru.nip ?? '-'}</DL.D>
                            <DL.T>NUPTK</DL.T>
                            <DL.D>{guru.nuptk}</DL.D>
                            <DL.T>NIK</DL.T>
                            <DL.D>{guru.nik}</DL.D>
                            <DL.T>Tempat, Tanggal Lahir</DL.T>
                            <DL.D>
                                {guru.tempat_lahir}, {formatDate(guru.tanggal_lahir ?? '')}
                            </DL.D>
                            <DL.T>Telepon</DL.T>
                            <DL.D>{guru.telepon}</DL.D>
                            <DL.T>Alamat</DL.T>
                            <DL.D>{guru.alamat_lengkap}</DL.D>
                        </DL>
                    </Card.Content>
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

GuruShow.layout = (page: React.ReactNode) => <AppLayout children={page} breadcrumbs={breadcrumbs} />;
