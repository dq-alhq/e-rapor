import DataOptions from '@/components/data-options';
import Paginator from '@/components/paginator';
import { Avatar, Badge, buttonStyle, Card, Header, Link, Note, Table } from '@/components/ui';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Paginate } from '@/types';
import { Head } from '@inertiajs/react';
import { IconArrowLeft } from 'hq-icons';
import { useState } from 'react';
import { Selection } from 'react-aria-components';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Data Ekstrakurikuler', href: '/ekskul' },
    { title: 'Anggota Ekstrakurikuler', href: '/ekskul' },
];

interface Props {
    kelas: model.Kelas[];
    tapel_aktif: model.Tapel;
    ekskul: model.Ekskul;
    bukan_anggota_ekskuls: Paginate & { data: model.AnggotaKelas[] };
    anggota_ekskuls: Paginate & { data: model.AnggotaKelas[] };
}

export default function AnggotaEkskul({ kelas, tapel_aktif, ekskul, bukan_anggota_ekskuls, anggota_ekskuls }: Props) {
    const [selectedAnggota, setSelectedAnggota] = useState<Selection>(new Set());
    const [selectedBukanAnggota, setSelectedBukanAnggota] = useState<Selection>(new Set());

    return (
        <>
            <Head title="Tambah Anggota Ekstrakurikuler" />
            <div className="flex h-[calc(100vh-4.1rem)] flex-1 flex-col rounded-xl p-6">
                <Header className="mb-6">
                    <Header.Title>Anggota Ekskul {ekskul.nama}</Header.Title>
                    <Header.Description>
                        Pada Tahun Pelajaran {tapel_aktif.tahun}/{tapel_aktif.tahun + 1} Semester {tapel_aktif.semester}
                    </Header.Description>
                    <Header.Action>
                        <Link href={route('ekskul.show', ekskul.id)} className={buttonStyle({ size: 'sm', variant: 'outline' })}>
                            <IconArrowLeft />
                            Kembali
                        </Link>
                    </Header.Action>
                </Header>
                <DataOptions
                    url={route('ekskul.anggota_ekskul', { ekskul: ekskul.id })}
                    attributes={anggota_ekskuls.attributes}
                    filters={kelas.map((kelas) => ({ id: String(kelas.id), label: kelas.nama }))}
                />
                {bukan_anggota_ekskuls.data.length === 0 && (
                    <Note variant="danger" className="mb-4 **:text-sm">
                        Anggota ekstrakurikuler hanya bisa ditambahkan melalui Anggota Kelas, Mohon terlebih dahulu masukkan siswa ke
                        <Link href={route('kelas.index')} className="ml-1 font-semibold underline">
                            Anggota Kelas
                        </Link>
                    </Note>
                )}
                <div className="grid gap-4 pb-6 lg:grid-cols-2">
                    <Card>
                        <Card.Header>
                            <Card.Title>Anggota</Card.Title>
                            {[...selectedAnggota].length > 0 && (
                                <>
                                    <Card.Description>
                                        {selectedAnggota == 'all' ? anggota_ekskuls.data.length : selectedAnggota.size} Siswa Dipilih
                                    </Card.Description>
                                    <Card.Action>
                                        <Link
                                            className={buttonStyle({ size: 'sm' })}
                                            href={route('ekskul.anggota_ekskul', {
                                                ...anggota_ekskuls.attributes,
                                                ekskul: ekskul.id,
                                                anggota_kelas:
                                                    selectedAnggota == 'all'
                                                        ? anggota_ekskuls.data.map((anggota) => anggota.id)
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
                                aria-label="Anggota Ekskul"
                                selectionMode="multiple"
                                selectedKeys={selectedAnggota}
                                onSelectionChange={setSelectedAnggota}
                            >
                                <Table.Header>
                                    <Table.Column isRowHeader className="w-14">
                                        #
                                    </Table.Column>
                                    <Table.Column>Nama</Table.Column>
                                    <Table.Column>Kelas</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                    {anggota_ekskuls?.data?.map((anggota, index) => (
                                        <Table.Row
                                            href={route('ekskul.anggota_ekskul', {
                                                ...anggota_ekskuls.attributes,
                                                ekskul: ekskul.id,
                                                anggota_kelas: anggota.id,
                                            })}
                                            routerOptions={{ method: 'put' }}
                                            key={index}
                                            id={anggota.id}
                                        >
                                            <Table.Cell>{1 + index}</Table.Cell>
                                            <Table.Cell className="space-x-2">
                                                <Avatar alt={anggota.siswa.nama} shape="square" size="xs" src={anggota.siswa.avatar || ''} />
                                                <span>{anggota.siswa.nama}</span>
                                            </Table.Cell>
                                            <Table.Cell>{anggota.siswa.kelas_sekarang ?? <Badge variant="danger">BELUM DIISI</Badge>}</Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </Card.Content>
                        <Card.Footer>
                            <Paginator meta={anggota_ekskuls.meta} links={anggota_ekskuls.links} only={['anggota_ekskuls']} showInfo={false} />
                        </Card.Footer>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Card.Title>Tidak Anggota</Card.Title>
                            {[...selectedBukanAnggota].length > 0 && (
                                <>
                                    <Card.Description>
                                        {selectedBukanAnggota == 'all' ? bukan_anggota_ekskuls.data.length : selectedBukanAnggota.size} Siswa Dipilih
                                    </Card.Description>
                                    <Card.Action>
                                        <Link
                                            className={buttonStyle({ size: 'sm' })}
                                            href={route('ekskul.anggota_ekskul', {
                                                ekskul: ekskul.id,
                                                anggota_kelas:
                                                    selectedBukanAnggota == 'all'
                                                        ? bukan_anggota_ekskuls.data.map((anggota) => anggota.id)
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
                                    <Table.Column>Kelas</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                    {bukan_anggota_ekskuls?.data?.map((anggota, index) => (
                                        <Table.Row
                                            href={route('ekskul.anggota_ekskul', {
                                                ...anggota_ekskuls.attributes,
                                                ekskul: ekskul.id,
                                                anggota_kelas: anggota.id,
                                            })}
                                            routerOptions={{ method: 'put' }}
                                            id={anggota.id}
                                            key={index}
                                        >
                                            <Table.Cell>{1 + index}</Table.Cell>
                                            <Table.Cell className="space-x-2">
                                                <Avatar alt={anggota.siswa.nama} shape="square" size="xs" src={anggota.siswa.avatar || ''} />
                                                <span>{anggota.siswa.nama}</span>
                                            </Table.Cell>
                                            <Table.Cell>{anggota.siswa.kelas_sekarang ?? <Badge variant="danger">BELUM DIISI</Badge>}</Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </Card.Content>
                        <Card.Footer>
                            <Paginator
                                meta={bukan_anggota_ekskuls.meta}
                                links={bukan_anggota_ekskuls.links}
                                only={['bukan_anggota_ekskuls']}
                                showInfo={false}
                            />
                        </Card.Footer>
                    </Card>
                </div>
            </div>
        </>
    );
}

AnggotaEkskul.layout = (page: React.ReactNode) => <AppLayout children={page} breadcrumbs={breadcrumbs} />;
