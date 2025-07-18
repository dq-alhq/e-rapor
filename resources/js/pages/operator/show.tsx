import { Avatar, buttonStyle, Card, DL, Link } from '@/components/ui';
import AppLayout from '@/layouts/app-layout';
import { formatDate } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { IconArrowLeft, IconPencil } from 'hq-icons';

interface Props {
    operator: model.Operator;
}

export default function OperatorShow({ operator }: Props) {
    return (
        <>
            <Head title={operator.nama} />
            <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-4">
                <Card className="h-fit lg:col-span-1">
                    <Card.Content className="mt-6 flex flex-col items-center gap-2">
                        <Avatar shape="square" size="5xl" src={operator.avatar || ''} alt={operator.nama} />
                    </Card.Content>
                </Card>
                <Card className="h-fit lg:col-span-3">
                    <Card.Header>
                        <Card.Title>Data Operator</Card.Title>
                        <Card.Description>Berikut adalah data operator</Card.Description>
                        <Card.Action>
                            <Link className={buttonStyle({ variant: 'outline' })} href={route('operator.edit', operator.id)}>
                                <IconPencil /> Edit
                            </Link>
                            <Link className={buttonStyle({ variant: 'outline' })} href={route('operator.index')}>
                                <IconArrowLeft />
                                Kembali
                            </Link>
                        </Card.Action>
                    </Card.Header>
                    <Card.Content>
                        <DL>
                            <DL.T>Nama</DL.T>
                            <DL.D>{operator.nama}</DL.D>
                            <DL.T>Jenis Kelamin</DL.T>
                            <DL.D>{operator.jk === 'l' ? 'Laki-laki' : 'Perempuan'}</DL.D>
                            <DL.T>NIP</DL.T>
                            <DL.D>{operator.nip ?? '-'}</DL.D>
                            <DL.T>NUPTK</DL.T>
                            <DL.D>{operator.nuptk}</DL.D>
                            <DL.T>NIK</DL.T>
                            <DL.D>{operator.nik}</DL.D>
                            <DL.T>Tempat, Tanggal Lahir</DL.T>
                            <DL.D>
                                {operator.tempat_lahir}, {formatDate(operator.tanggal_lahir ?? '')}
                            </DL.D>
                            <DL.T>Telepon</DL.T>
                            <DL.D>{operator.telepon}</DL.D>
                            <DL.T>Alamat</DL.T>
                            <DL.D>{operator.alamat_lengkap}</DL.D>
                        </DL>
                    </Card.Content>
                </Card>
            </div>
        </>
    );
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Data Operator', href: '/operator' },
    { title: 'Edit Operator', href: '/operator' },
];

OperatorShow.layout = (page: React.ReactNode) => <AppLayout children={page} breadcrumbs={breadcrumbs} />;
