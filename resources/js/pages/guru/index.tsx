import PageOptions from '@/components/page-options';
import Paginator from '@/components/paginator';
import { Avatar, Badge, buttonStyle, Header, Link, Table } from '@/components/ui';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Paginate } from '@/types';
import { Head } from '@inertiajs/react';
import { IconUserPlus } from 'hq-icons';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Data Guru', href: '/guru' },
];

interface Props {
    gurus: Paginate & { data: model.Guru[] };
}

export default function Guru({ gurus }: Props) {
    const { data, meta, links } = gurus;

    return (
        <>
            <Head title="Data Guru" />
            <div className="flex h-[calc(100vh-4.1rem)] flex-1 flex-col rounded-xl p-6">
                <Header className="mb-6">
                    <Header.Title>Daftar Guru</Header.Title>
                    <Header.Description>Daftar Guru yang ada di sekolah ini</Header.Description>
                    <Header.Action>
                        <Link href={route('guru.create')} className={buttonStyle({ size: 'sm' })}>
                            <IconUserPlus />
                            Tambah Guru
                        </Link>
                    </Header.Action>
                </Header>
                <PageOptions />
                <Table aria-label="Data Guru">
                    <Table.Header>
                        <Table.Column isRowHeader className="w-12">
                            #
                        </Table.Column>
                        <Table.Column>Nama</Table.Column>
                        <Table.Column>Mata Pelajaran</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {data?.map((guru, index) => (
                            <Table.Row href={route('guru.show', guru.id)} key={guru.id}>
                                <Table.Cell>{meta.from + index}</Table.Cell>
                                <Table.Cell className="space-x-2">
                                    <Avatar alt={guru.nama} shape="square" size="xs" src={guru.avatar || ''} />
                                    <span>{guru.nama}</span>
                                </Table.Cell>
                                <Table.Cell className="space-x-1">
                                    {guru.mapel.map((m) => (
                                        <Badge key={`${guru.id}-${m.id}`}>{m.singkatan}</Badge>
                                    ))}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                <Paginator meta={meta} links={links} only={['gurus']} />
            </div>
        </>
    );
}

Guru.layout = (page: React.ReactNode) => <AppLayout children={page} breadcrumbs={breadcrumbs} />;
