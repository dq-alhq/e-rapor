import DataOptions from '@/components/data-options';
import Paginator from '@/components/paginator';
import { buttonStyle, Header, Link, Table } from '@/components/ui';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Paginate } from '@/types';
import { Head } from '@inertiajs/react';
import { IconBookPlus } from 'hq-icons';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Data Mapel', href: '/mapel' },
];

interface Props {
    mapels: Paginate & { data: model.Mapel[] };
}

export default function Mapel({ mapels }: Props) {
    const { data, meta, links, attributes } = mapels;
    return (
        <>
            <Head title="Data Mapel" />
            <div className="flex h-[calc(100vh-4.1rem)] flex-1 flex-col rounded-xl p-6">
                <Header className="mb-6">
                    <Header.Title>Daftar Mata Pelajaran</Header.Title>
                    <Header.Description>Yang diajarkan pada Sekolah ini</Header.Description>
                    <Header.Action>
                        <Link href={route('mapel.create')} className={buttonStyle({ size: 'sm' })}>
                            <IconBookPlus />
                            Tambah Mapel
                        </Link>
                    </Header.Action>
                </Header>
                <DataOptions attributes={attributes} />
                <Table aria-label="Data Mapel">
                    <Table.Header>
                        <Table.Column isRowHeader className="w-12">
                            #
                        </Table.Column>
                        <Table.Column>Kelompok</Table.Column>
                        <Table.Column>Singkatan</Table.Column>
                        <Table.Column>Nama</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {data?.map((mapel, index) => (
                            <Table.Row href={route('mapel.show', mapel.id)} key={mapel.id}>
                                <Table.Cell>{meta.from + index}</Table.Cell>
                                <Table.Cell>{mapel.kelompok_mapel.nama}</Table.Cell>
                                <Table.Cell>{mapel.singkatan}</Table.Cell>
                                <Table.Cell>{mapel.nama}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                <Paginator meta={meta} links={links} only={['mapels']} />
            </div>
        </>
    );
}

Mapel.layout = (page: React.ReactNode) => <AppLayout children={page} breadcrumbs={breadcrumbs} />;
