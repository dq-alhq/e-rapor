import { buttonStyle, Card, DL, Link, Table } from '@/components/ui';
import AppLayout from '@/layouts/app-layout';
import EkskulForm from '@/pages/ekskul/form';
import { type BreadcrumbItem, FormSetting } from '@/types';
import { Head } from '@inertiajs/react';
import { IconArrowLeft, IconGroup, IconPencil } from 'hq-icons';
import { useState } from 'react';

interface Props {
    ekskul: model.Ekskul;
    tapel_aktif: model.Tapel;
    form: FormSetting & { data: model.Ekskul };
}

export default function EkstrakurikulerShow({ ekskul, tapel_aktif, form }: Props) {
    const [openForm, setOpenForm] = useState(route().current() === 'ekskul.create' || route().current() === 'ekskul.edit');
    return (
        <>
            <Head title={ekskul.nama} />
            <div className="space-y-6 p-6">
                <Card className="h-fit">
                    <Card.Header>
                        <Card.Title>Data Ekstrakurikuler</Card.Title>
                        <Card.Description>Berikut adalah data eksktrakurikuler</Card.Description>
                        <Card.Action>
                            <Link className={buttonStyle({ variant: 'outline' })} href={route('ekskul.edit', ekskul.id)}>
                                <IconPencil /> Edit
                            </Link>
                            <Link className={buttonStyle({ variant: 'outline' })} href={route('ekskul.index')}>
                                <IconArrowLeft />
                                Kembali
                            </Link>
                        </Card.Action>
                    </Card.Header>
                    <Card.Content>
                        <DL>
                            <DL.T>Nama</DL.T>
                            <DL.D>{ekskul.nama}</DL.D>
                            <DL.T>Deskripsi</DL.T>
                            <DL.D>{ekskul.deskripsi}</DL.D>
                            <DL.T>Pembina</DL.T>
                            <DL.D>{ekskul.guru.nama}</DL.D>
                        </DL>
                    </Card.Content>
                </Card>
                <Card className="h-fit">
                    <Card.Header>
                        <Card.Title>Anggota</Card.Title>
                        <Card.Description>
                            Pada Tahun Pelajaran {tapel_aktif.tahun}/{tapel_aktif.tahun + 1} Semester {tapel_aktif.semester}
                        </Card.Description>
                        <Card.Action>
                            <Link className={buttonStyle({ variant: 'outline' })} href={route('ekskul.anggota_ekskul', ekskul.id)}>
                                <IconGroup /> Edit Anggota
                            </Link>
                        </Card.Action>
                    </Card.Header>
                    <Card.Content>
                        <Table aria-label="Data Pembelajaran">
                            <Table.Header>
                                <Table.Column isRowHeader className="w-12">
                                    #
                                </Table.Column>
                                <Table.Column>Nama</Table.Column>
                                <Table.Column>Kelas</Table.Column>
                            </Table.Header>
                            <Table.Body>
                                {ekskul.siswa.map((siswa, index) => (
                                    <Table.Row key={siswa.id}>
                                        <Table.Cell>{index + 1}</Table.Cell>
                                        <Table.Cell>{siswa.nama}</Table.Cell>
                                        <Table.Cell>{siswa.kelas_sekarang}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Card.Content>
                </Card>
            </div>
            <EkskulForm form={form} isOpen={openForm} setIsOpen={setOpenForm} />
        </>
    );
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Data Ekstrakurikuler', href: '/ekskul' },
    { title: 'Edit Ekstrakurikuler', href: '/ekskul' },
];

EkstrakurikulerShow.layout = (page: React.ReactNode) => <AppLayout children={page} breadcrumbs={breadcrumbs} />;
