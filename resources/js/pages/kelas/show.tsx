import { buttonStyle, Card, DL, Link, Table } from '@/components/ui';
import AppLayout from '@/layouts/app-layout';
import KelasForm from '@/pages/kelas/form';
import { type BreadcrumbItem, FormSetting } from '@/types';
import { Head } from '@inertiajs/react';
import { IconArrowLeft, IconGroup, IconPencil } from 'hq-icons';
import { useState } from 'react';

interface Props {
    kelas: model.Kelas;
    tapel_aktif: model.Tapel;
    form: FormSetting & { data: model.Kelas; options: number[] };
}

export default function KelasShow({ kelas, tapel_aktif, form }: Props) {
    const [openForm, setOpenForm] = useState(route().current() === 'kelas.create' || route().current() === 'kelas.edit');
    return (
        <>
            <Head title={kelas.nama} />
            <div className="space-y-6 p-6">
                <Card className="h-fit">
                    <Card.Header>
                        <Card.Title>Data Kelas</Card.Title>
                        <Card.Description>Berikut adalah data kelas</Card.Description>
                        <Card.Action>
                            <Link className={buttonStyle({ variant: 'outline' })} href={route('kelas.edit', kelas.id)}>
                                <IconPencil /> Edit
                            </Link>
                            <Link className={buttonStyle({ variant: 'outline' })} href={route('kelas.index')}>
                                <IconArrowLeft />
                                Kembali
                            </Link>
                        </Card.Action>
                    </Card.Header>
                    <Card.Content>
                        <DL>
                            <DL.T>Tingkat</DL.T>
                            <DL.D>{kelas.tingkat}</DL.D>
                            <DL.T>Nama</DL.T>
                            <DL.D>{kelas.nama}</DL.D>
                            <DL.T>Wali kelas</DL.T>
                            <DL.D>{kelas.wali.nama}</DL.D>
                        </DL>
                    </Card.Content>
                </Card>
                <Card className="h-fit">
                    <Card.Header>
                        <Card.Title>Siswa di Kelas ini</Card.Title>
                        <Card.Description>
                            Pada Tahun Pelajaran {tapel_aktif.tahun}/{tapel_aktif.tahun + 1} Semester {tapel_aktif.semester}
                        </Card.Description>
                        <Card.Action>
                            <Link className={buttonStyle({ variant: 'outline' })} href={route('kelas.anggota_kelas', kelas.id)}>
                                <IconGroup /> Edit Anggota
                            </Link>
                        </Card.Action>
                    </Card.Header>
                    <Card.Content>
                        <Table aria-label="Data Anggota Kelas">
                            <Table.Header>
                                <Table.Column isRowHeader className="w-12">
                                    #
                                </Table.Column>
                                <Table.Column>Nama</Table.Column>
                            </Table.Header>
                            <Table.Body>
                                {kelas.siswa.map((siswa, index) => (
                                    <Table.Row key={siswa.id}>
                                        <Table.Cell>{index + 1}</Table.Cell>
                                        <Table.Cell>{siswa.nama}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Card.Content>
                </Card>
            </div>
            <KelasForm tapel_aktif={tapel_aktif} form={form} isOpen={openForm} setIsOpen={setOpenForm} />
        </>
    );
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Data Kelas', href: '/kelas' },
    { title: 'Edit Kelas', href: '/kelas' },
];

KelasShow.layout = (page: React.ReactNode) => <AppLayout children={page} breadcrumbs={breadcrumbs} />;
