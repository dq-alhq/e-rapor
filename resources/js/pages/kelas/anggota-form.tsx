import DataOptions from '@/components/data-options';
import Paginator from '@/components/paginator';
import { Avatar, buttonStyle, Card, Header, Link, Table } from '@/components/ui';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Paginate } from '@/types';
import { Head } from '@inertiajs/react';
import { IconUserPlus } from 'hq-icons';
import { useState } from 'react';
import { Selection } from 'react-aria-components';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Data Kelas', href: '/kelas' },
    { title: 'Anggota Kelas', href: '/kelas' },
];

interface Props {
    kelas: model.Kelas;
    tapel_aktif: model.Tapel;
    bukan_anggota_kelas: Paginate & { data: model.Siswa[] };
    anggota_kelas: Paginate & { data: model.Siswa[] };
    angkatan: number[];
}

export default function AnggotaKelas({ kelas, tapel_aktif, angkatan, bukan_anggota_kelas, anggota_kelas }: Props) {
    const [selectedAnggota, setSelectedAnggota] = useState<Selection>(new Set());
    const [selectedBukanAnggota, setSelectedBukanAnggota] = useState<Selection>(new Set());
    return (
        <>
            <Head title="Tambah Anggota Kelas" />
            <div className="flex h-[calc(100vh-4.1rem)] flex-1 flex-col rounded-xl p-6">
                <Header className="mb-6">
                    <Header.Title>Anggota Kelas {kelas.nama}</Header.Title>
                    <Header.Description>
                        Pada Tahun Pelajaran {tapel_aktif.tahun}/{tapel_aktif.tahun + 1} Semester {tapel_aktif.semester}
                    </Header.Description>
                    <Header.Action>
                        <Link href={route('siswa.create')} className={buttonStyle({ size: 'sm' })}>
                            <IconUserPlus />
                            Tambah Siswa
                        </Link>
                    </Header.Action>
                </Header>
                <DataOptions
                    url={route('kelas.anggota_kelas', { kelas: kelas.id })}
                    attributes={anggota_kelas.attributes}
                    filters={angkatan.map((a) => ({ id: String(a), label: String(a) }))}
                />
                <div className="grid gap-4 pb-6 lg:grid-cols-2">
                    <Card>
                        <Card.Header>
                            <Card.Title>Anggota</Card.Title>
                            {[...selectedAnggota].length > 0 && (
                                <>
                                    <Card.Description>
                                        {selectedAnggota == 'all' ? anggota_kelas.data.length : selectedAnggota.size} Siswa Dipilih
                                    </Card.Description>
                                    <Card.Action>
                                        <Link
                                            className={buttonStyle({ size: 'sm' })}
                                            href={route('kelas.anggota_kelas', {
                                                ...anggota_kelas.attributes,
                                                kelas: kelas.id,
                                                siswa:
                                                    selectedAnggota == 'all'
                                                        ? anggota_kelas.data.map((anggota) => anggota.id)
                                                        : Array.from(selectedAnggota),
                                            })}
                                            routerOptions={{ method: 'put' }}
                                        >
                                            Hapus Anggota
                                        </Link>
                                    </Card.Action>
                                </>
                            )}
                        </Card.Header>
                        <Card.Content>
                            <Table
                                aria-label="Anggota Kelas"
                                selectionMode="multiple"
                                selectedKeys={selectedAnggota}
                                onSelectionChange={setSelectedAnggota}
                            >
                                <Table.Header>
                                    <Table.Column isRowHeader className="w-14">
                                        #
                                    </Table.Column>
                                    <Table.Column>Nama</Table.Column>
                                    <Table.Column>Tahun Masuk</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                    {anggota_kelas?.data?.map((siswa, index) => (
                                        <Table.Row
                                            href={route('kelas.anggota_kelas', {
                                                ...anggota_kelas.attributes,
                                                kelas: kelas.id,
                                                siswa: siswa.id,
                                            })}
                                            routerOptions={{ method: 'put' }}
                                            key={index}
                                            id={index}
                                        >
                                            <Table.Cell>{1 + index}</Table.Cell>
                                            <Table.Cell className="space-x-2">
                                                <Avatar alt={siswa.nama} shape="square" size="xs" src={siswa.avatar || ''} />
                                                <span>{siswa.nama}</span>
                                            </Table.Cell>
                                            <Table.Cell>{siswa.tahun_masuk}</Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </Card.Content>
                        <Card.Footer>
                            <Paginator meta={anggota_kelas.meta} links={anggota_kelas.links} only={['anggota_kelas']} showInfo={false} />
                        </Card.Footer>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Card.Title>Tidak Anggota</Card.Title>
                            {[...selectedBukanAnggota].length > 0 && (
                                <>
                                    <Card.Description>
                                        {selectedBukanAnggota == 'all' ? bukan_anggota_kelas.data.length : selectedBukanAnggota.size} Siswa Dipilih
                                    </Card.Description>
                                    <Card.Action>
                                        <Link
                                            className={buttonStyle({ size: 'sm' })}
                                            href={route('kelas.anggota_kelas', {
                                                kelas: kelas.id,
                                                siswa:
                                                    selectedBukanAnggota == 'all'
                                                        ? bukan_anggota_kelas.data.map((anggota) => anggota.id)
                                                        : Array.from(selectedBukanAnggota),
                                            })}
                                            routerOptions={{ method: 'put' }}
                                        >
                                            Tambah Anggota
                                        </Link>
                                    </Card.Action>
                                </>
                            )}
                        </Card.Header>
                        <Card.Content>
                            <Table
                                aria-label="Data Siswa"
                                selectionMode="multiple"
                                selectedKeys={selectedBukanAnggota}
                                onSelectionChange={setSelectedBukanAnggota}
                            >
                                <Table.Header>
                                    <Table.Column isRowHeader className="w-14">
                                        #
                                    </Table.Column>
                                    <Table.Column>Nama</Table.Column>
                                    <Table.Column>Tahun Masuk</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                    {bukan_anggota_kelas?.data?.map((siswa, index) => (
                                        <Table.Row
                                            href={route('kelas.anggota_kelas', {
                                                ...anggota_kelas.attributes,
                                                kelas: kelas.id,
                                                siswa: siswa.id,
                                            })}
                                            routerOptions={{ method: 'put' }}
                                            key={index}
                                            id={index}
                                        >
                                            <Table.Cell>{1 + index}</Table.Cell>
                                            <Table.Cell className="space-x-2">
                                                <Avatar alt={siswa.nama} shape="square" size="xs" src={siswa.avatar || ''} />
                                                <span>{siswa.nama}</span>
                                            </Table.Cell>
                                            <Table.Cell>{siswa.tahun_masuk}</Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </Card.Content>
                        <Card.Footer>
                            <Paginator
                                meta={bukan_anggota_kelas.meta}
                                links={bukan_anggota_kelas.links}
                                only={['bukan_anggota_kelas']}
                                showInfo={false}
                            />
                        </Card.Footer>
                    </Card>
                </div>
            </div>
        </>
    );
}

AnggotaKelas.layout = (page: React.ReactNode) => <AppLayout children={page} breadcrumbs={breadcrumbs} />;
