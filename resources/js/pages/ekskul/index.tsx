import DataOptions from '@/components/data-options';
import Paginator from '@/components/paginator';
import { buttonStyle, Header, Link, Table } from '@/components/ui';
import AppLayout from '@/layouts/app-layout';
import EkskulForm from '@/pages/ekskul/form';
import type { BreadcrumbItem, FormSetting, Paginate } from '@/types';
import { Head } from '@inertiajs/react';
import { IconBookPlus } from 'hq-icons';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Data Ekskul', href: '/ekskul' },
];

interface Props {
    ekskuls: Paginate & { data: model.Ekskul[] };
    form: FormSetting & { data: model.Ekskul };
}

export default function Ekskul({ ekskuls, form }: Props) {
    const { data, meta, links, attributes } = ekskuls;

    const [openForm, setOpenForm] = useState(route().current() === 'ekskul.create' || route().current() === 'ekskul.edit');
    return (
        <>
            <Head title="Data Ekstrakurikuler" />
            <div className="flex h-[calc(100vh-4.1rem)] flex-1 flex-col rounded-xl p-6">
                <Header className="mb-6">
                    <Header.Title>Daftar Ekstrakurikuler</Header.Title>
                    <Header.Description>Yang diajarkan pada Sekolah ini</Header.Description>
                    <Header.Action>
                        <Link href={route('ekskul.create')} className={buttonStyle({ size: 'sm' })}>
                            <IconBookPlus />
                            Tambah Ekskul
                        </Link>
                    </Header.Action>
                </Header>
                <DataOptions attributes={attributes} />
                <Table aria-label="Data Ekskul">
                    <Table.Header>
                        <Table.Column isRowHeader className="w-12">
                            #
                        </Table.Column>
                        <Table.Column>Nama</Table.Column>
                        <Table.Column>Pembina</Table.Column>
                        <Table.Column>Jumlah Siswa</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {data?.map((ekskul, index) => (
                            <Table.Row href={route('ekskul.show', ekskul.id)} key={ekskul.id}>
                                <Table.Cell>{meta.from + index}</Table.Cell>
                                <Table.Cell>{ekskul.nama}</Table.Cell>
                                <Table.Cell>{ekskul.guru.nama}</Table.Cell>
                                <Table.Cell>{ekskul.siswa_count}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                <Paginator meta={meta} links={links} only={['ekskuls']} />
            </div>
            <EkskulForm form={form} isOpen={openForm} setIsOpen={setOpenForm} />
        </>
    );
}

Ekskul.layout = (page: React.ReactNode) => <AppLayout children={page} breadcrumbs={breadcrumbs} />;
