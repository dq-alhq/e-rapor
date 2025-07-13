import PageOptions from '@/components/page-options';
import Paginator from '@/components/paginator';
import { Avatar, buttonStyle, Header, Link, Table } from '@/components/ui';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Paginate } from '@/types';
import { Head } from '@inertiajs/react';
import { IconUserPlus } from 'hq-icons';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Data Operator', href: '/operator' },
];

interface Props {
    operators: Paginate & { data: model.Operator[] };
}

export default function Operator({ operators }: Props) {
    const { data, meta, links } = operators;

    return (
        <>
            <Head title="Data Operator" />
            <div className="flex h-[calc(100vh-4.1rem)] flex-1 flex-col rounded-xl p-6">
                <Header className="mb-6">
                    <Header.Title>Daftar Operator</Header.Title>
                    <Header.Description>Daftar Operator yang ada di sekolah ini</Header.Description>
                    <Header.Action>
                        <Link href={route('operator.create')} className={buttonStyle({ size: 'sm' })}>
                            <IconUserPlus />
                            Tambah Operator
                        </Link>
                    </Header.Action>
                </Header>
                <PageOptions />
                <Table aria-label="Data Operator">
                    <Table.Header>
                        <Table.Column isRowHeader className="w-12">
                            #
                        </Table.Column>
                        <Table.Column>Nama</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {data?.map((operator, index) => (
                            <Table.Row href={route('operator.show', operator.id)} key={operator.id}>
                                <Table.Cell>{meta.from + index}</Table.Cell>
                                <Table.Cell className="space-x-2">
                                    <Avatar alt={operator.nama} shape="square" size="xs" src={operator.avatar || ''} />
                                    <span>{operator.nama}</span>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                <Paginator meta={meta} links={links} only={['operators']} />
            </div>
        </>
    );
}

Operator.layout = (page: React.ReactNode) => <AppLayout children={page} breadcrumbs={breadcrumbs} />;
