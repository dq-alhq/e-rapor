import { Badge, buttonStyle, Card, DL, Link, Table } from '@/components/ui';
import AppLayout from '@/layouts/app-layout';
import PembelajaranForm from '@/pages/mapel/pembelajaran-form';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { IconArrowLeft, IconPencil } from 'hq-icons';
import { useState } from 'react';

interface Props {
    mapel: model.Mapel & { pembelajaran: model.Pembelajaran[] };
    tapel_aktif: model.Tapel;
    kelas: model.Kelas[];
    form: {
        kelas: model.Kelas;
        guru: model.Guru;
    };
}

export default function MapelShow({ mapel, tapel_aktif, form, kelas }: Props) {
    const [openForm, setOpenForm] = useState(route().current() === 'pembelajaran.mapel');
    return (
        <>
            <Head title={mapel.nama} />
            <div className="space-y-6 p-6">
                <Card className="h-fit">
                    <Card.Header>
                        <Card.Title>Data Mapel</Card.Title>
                        <Card.Description>Berikut adalah data mapel</Card.Description>
                        <Card.Action>
                            <Link className={buttonStyle({ variant: 'outline' })} href={route('mapel.edit', mapel.id)}>
                                <IconPencil /> Edit
                            </Link>
                            <Link className={buttonStyle({ variant: 'outline' })} href={route('mapel.index')}>
                                <IconArrowLeft />
                                Kembali
                            </Link>
                        </Card.Action>
                    </Card.Header>
                    <Card.Content>
                        <DL>
                            <DL.T>Kelompok</DL.T>
                            <DL.D>{mapel.kelompok_mapel.nama}</DL.D>
                            <DL.T>Nama</DL.T>
                            <DL.D>{mapel.nama}</DL.D>
                            <DL.T>Singkatan</DL.T>
                            <DL.D>{mapel.singkatan}</DL.D>
                        </DL>
                    </Card.Content>
                </Card>
                <Card className="h-fit">
                    <Card.Header>
                        <Card.Title>Pembelajaran</Card.Title>
                        <Card.Description>
                            Pada Tahun Pelajaran {tapel_aktif.tahun}/{tapel_aktif.tahun + 1} Semester {tapel_aktif.semester}
                        </Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <Table aria-label="Data Pembelajaran">
                            <Table.Header>
                                <Table.Column isRowHeader className="w-12">
                                    #
                                </Table.Column>
                                <Table.Column>Kelas</Table.Column>
                                <Table.Column>Guru</Table.Column>
                            </Table.Header>
                            <Table.Body>
                                {/*{mapel.pembelajaran?.map((p, index) => (*/}
                                {/*    <Table.Row key={p.id} href={route('pembelajaran.mapel', [mapel.id, p.kelas.id])}>*/}
                                {/*        <Table.Cell>{index + 1}</Table.Cell>*/}
                                {/*        <Table.Cell>{p.kelas.nama}</Table.Cell>*/}
                                {/*        <Table.Cell>{p.guru.nama}</Table.Cell>*/}
                                {/*    </Table.Row>*/}
                                {/*))}*/}
                                {kelas.map((k, index) => (
                                    <Table.Row key={k.id} href={route('pembelajaran.mapel', [mapel.id, k.id])}>
                                        <Table.Cell>{index + 1}</Table.Cell>
                                        <Table.Cell>{k.nama}</Table.Cell>
                                        <Table.Cell>
                                            {mapel.pembelajaran.find((p) => p.kelas.id === k.id)?.guru?.nama || (
                                                <Badge variant="danger">Belum Diatur</Badge>
                                            )}
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Card.Content>
                </Card>
            </div>
            <PembelajaranForm form={form} mapel={mapel} isOpen={openForm} setIsOpen={setOpenForm} />
        </>
    );
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Data Mapel', href: '/mapel' },
    { title: 'Detail Mapel', href: '/mapel' },
];

MapelShow.layout = (page: React.ReactNode) => <AppLayout children={page} breadcrumbs={breadcrumbs} />;
