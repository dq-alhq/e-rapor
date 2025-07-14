import DataOptions from '@/components/data-options';
import Paginator from '@/components/paginator';
import { Avatar, Badge, buttonStyle, Header, Link, Table } from '@/components/ui';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Paginate } from '@/types';
import { Head } from '@inertiajs/react';
import { IconChevronsUpDown, IconUserPlus } from 'hq-icons';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Data Siswa', href: '/siswa' },
];

interface Props {
    siswas: Paginate & { data: model.Siswa[] };
    kelas: model.Kelas[];
    tapel_aktif: model.Tapel;
}

export default function Siswa({ siswas, kelas, tapel_aktif }: Props) {
    const { data, meta, links, attributes } = siswas;
    return (
        <>
            <Head title="Data Siswa" />
            <div className="flex h-[calc(100vh-4.1rem)] flex-1 flex-col rounded-xl p-6">
                <Header className="mb-6">
                    <Header.Title>Daftar Siswa</Header.Title>
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
                <DataOptions attributes={attributes} filters={kelas.map((kelas) => ({ id: String(kelas.id), label: kelas.nama }))} />
                <Table aria-label="Data Siswa">
                    <Table.Header>
                        <Table.Column isRowHeader className="w-14">
                            #
                        </Table.Column>
                        <Table.Column>
                            <Link
                                className="flex items-center gap-2"
                                href={route('siswa.index', {
                                    ...attributes,
                                    sort: 'nama',
                                    dir: attributes?.dir === 'asc' ? 'desc' : 'asc',
                                })}
                            >
                                Nama
                                <IconChevronsUpDown />
                            </Link>
                        </Table.Column>
                        <Table.Column>
                            <Link
                                className="flex items-center gap-2"
                                href={route('siswa.index', {
                                    ...attributes,
                                    sort: 'nis',
                                    dir: attributes?.dir === 'asc' ? 'desc' : 'asc',
                                })}
                            >
                                NIS
                                <IconChevronsUpDown />
                            </Link>
                        </Table.Column>
                        <Table.Column>Kelas</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {data?.map((siswa, index) => (
                            <Table.Row href={route('siswa.show', siswa.id)} key={siswa.id}>
                                <Table.Cell>{meta.from + index}</Table.Cell>
                                <Table.Cell className="space-x-2">
                                    <Avatar alt={siswa.nama} shape="square" size="xs" src={siswa.avatar || ''} />
                                    <span>{siswa.nama}</span>
                                </Table.Cell>
                                <Table.Cell className="space-x-2">{siswa.nis}</Table.Cell>
                                <Table.Cell>{(siswa.kelas as string) ?? <Badge variant="danger">BELUM DIISI</Badge>}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                <Paginator meta={meta} links={links} only={['siswas']} />
            </div>
        </>
    );
}

Siswa.layout = (page: React.ReactNode) => <AppLayout children={page} breadcrumbs={breadcrumbs} />;
