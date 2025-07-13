import { Avatar, buttonStyle, Card, DL, Header, Link } from '@/components/ui';
import AppLayout from '@/layouts/app-layout';
import { formatDate } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { IconArrowLeft, IconPencil } from 'hq-icons';

interface Props {
    siswa: model.Siswa;
}

export default function SiswaShow({ siswa }: Props) {
    return (
        <>
            <Head title={siswa.nama} />
            <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-4">
                <Card className="h-fit lg:col-span-1">
                    <Card.Content className="mt-6 flex flex-col items-center gap-2">
                        <Avatar shape="square" size="5xl" src={siswa.avatar || ''} alt={siswa.nama} />
                    </Card.Content>
                </Card>
                <Card className="h-fit lg:col-span-3">
                    <Card.Header>
                        <Card.Title>Data Siswa</Card.Title>
                        <Card.Description>Berikut adalah data siswa</Card.Description>
                        <Card.Action>
                            <Link className={buttonStyle({ variant: 'outline' })} href={route('siswa.edit', siswa.id)}>
                                <IconPencil /> Edit
                            </Link>
                            <Link className={buttonStyle({ variant: 'outline' })} href={route('siswa.index')}>
                                <IconArrowLeft />
                                Kembali
                            </Link>
                        </Card.Action>
                    </Card.Header>
                    <Card.Content>
                        <DL>
                            <DL.T>Nama</DL.T>
                            <DL.D>{siswa.nama}</DL.D>
                            <DL.T>Jenis Kelamin</DL.T>
                            <DL.D>{siswa.jk === 'l' ? 'Laki-laki' : 'Perempuan'}</DL.D>
                            <DL.T>NIS</DL.T>
                            <DL.D>{siswa.nis}</DL.D>
                            <DL.T>NISN</DL.T>
                            <DL.D>{siswa.nisn ?? '-'}</DL.D>
                            <DL.T>NIK</DL.T>
                            <DL.D>{siswa.nik}</DL.D>
                            <DL.T>Tempat, Tanggal Lahir</DL.T>
                            <DL.D>
                                {siswa.tempat_lahir}, {formatDate(siswa.tanggal_lahir ?? '')}
                            </DL.D>
                            <DL.T>Telepon</DL.T>
                            <DL.D>{siswa.telepon}</DL.D>
                            <DL.T>Alamat</DL.T>
                            {/* @ts-expect-error no-type */}
                            <DL.D>{siswa.alamat_lengkap}</DL.D>
                            <DL.T>Status Dalam Keluarga</DL.T>
                            <DL.D>{siswa.status_dalam_keluarga}</DL.D>
                            <DL.T>Anak Ke</DL.T>
                            <DL.D>{siswa.anak_ke}</DL.D>
                        </DL>
                        <Header className="my-4">
                            <Header.Title>Data Orang Tua Siswa</Header.Title>
                        </Header>
                        <DL>
                            <DL.T>Nama Ayah</DL.T>
                            <DL.D>{siswa.nama_ayah}</DL.D>
                            <DL.T>Pekerjaan Ayah</DL.T>
                            <DL.D>{siswa.pekerjaan_ayah}</DL.D>
                            <DL.T>Nama Ibu</DL.T>
                            <DL.D>{siswa.nama_ibu}</DL.D>
                            <DL.T>Pekerjaan Ibu</DL.T>
                            <DL.D>{siswa.pekerjaan_ibu}</DL.D>
                            <DL.T>Nama Wali</DL.T>
                            <DL.D>{siswa.nama_wali}</DL.D>
                            <DL.T>Pekerjaan Wali</DL.T>
                            <DL.D>{siswa.pekerjaan_wali}</DL.D>
                            <DL.T>Telepon Wali</DL.T>
                            <DL.D>{siswa.telepon_wali}</DL.D>
                        </DL>
                    </Card.Content>
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

SiswaShow.layout = (page: React.ReactNode) => <AppLayout children={page} breadcrumbs={breadcrumbs} />;
