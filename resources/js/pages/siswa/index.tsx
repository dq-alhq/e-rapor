import PageOptions from '@/components/page-options';
import Paginator from '@/components/paginator';
import { Avatar, buttonStyle, Header, Link, Table } from '@/components/ui';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Paginate } from '@/types';
import { Head } from '@inertiajs/react';
import { IconUserPlus } from 'hq-icons';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Data Siswa', href: '/siswa' },
];

interface Props {
    siswas: Paginate & { data: model.Siswa[] };
}

export default function Siswa({ siswas }: Props) {
    const { data, meta, links } = siswas;

    return (
        <>
            <Head title="Data Siswa" />
            <div className="flex h-[calc(100vh-4.1rem)] flex-1 flex-col rounded-xl p-6">
                <Header className="mb-6">
                    <Header.Title>Daftar Siswa</Header.Title>
                    <Header.Description>Daftar Siswa yang ada di sekolah ini</Header.Description>
                    <Header.Action>
                        <Link href={route('siswa.create')} className={buttonStyle({ size: 'sm' })}>
                            <IconUserPlus />
                            Tambah Siswa
                        </Link>
                    </Header.Action>
                </Header>
                <PageOptions />
                <Table aria-label="Data Siswa">
                    <Table.Header>
                        <Table.Column isRowHeader className="w-12">
                            #
                        </Table.Column>
                        <Table.Column>Nama</Table.Column>
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
                                {/* @ts-expect-error additional-type */}
                                <Table.Cell>{siswa.kelas}</Table.Cell>
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
