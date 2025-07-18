import DataOptions from '@/components/data-options';
import Paginator from '@/components/paginator';
import { buttonStyle, Header, Link, Table } from '@/components/ui';
import AppLayout from '@/layouts/app-layout';
import KelasForm from '@/pages/kelas/form';
import type { BreadcrumbItem, FormSetting, Paginate } from '@/types';
import { Head } from '@inertiajs/react';
import { IconDiamondPlus } from 'hq-icons';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Data Kelas', href: '/tapel' },
];

interface Props {
    kelas: Paginate & { data: model.Kelas[] };
    tapel_aktif: model.Tapel;
    form: FormSetting & { data: model.Kelas; options: number[] };
}

export default function Kelas({ kelas, tapel_aktif, form }: Props) {
    const { data, meta, links, attributes } = kelas;
    const [openForm, setOpenForm] = useState(route().current() === 'kelas.create' || route().current() === 'kelas.edit');
    return (
        <>
            <Head title="Data Kelas" />
            <div className="flex h-[calc(100vh-4.1rem)] flex-1 flex-col rounded-xl p-6">
                <Header className="mb-6">
                    <Header.Title>Daftar Kelas</Header.Title>
                    <Header.Description>
                        Pada Tahun Pelajaran {tapel_aktif.tahun}/{tapel_aktif.tahun + 1} Semester {tapel_aktif.semester}
                    </Header.Description>
                    <Header.Action>
                        <Link href={route('kelas.create')} className={buttonStyle({ size: 'sm' })}>
                            <IconDiamondPlus />
                            Tambah Kelas
                        </Link>
                    </Header.Action>
                </Header>
                <DataOptions attributes={attributes} />
                <Table aria-label="Data Mapel">
                    <Table.Header>
                        <Table.Column isRowHeader className="w-12">
                            #
                        </Table.Column>
                        <Table.Column>Nama</Table.Column>
                        <Table.Column>Tingkat</Table.Column>
                        <Table.Column>Jumlah Siswa</Table.Column>
                        <Table.Column>Wali kelas</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {data?.map((kelas, index) => (
                            <Table.Row href={route('kelas.show', kelas.id)} key={kelas.id}>
                                <Table.Cell>{meta.from + index}</Table.Cell>
                                <Table.Cell>{kelas.nama}</Table.Cell>
                                <Table.Cell>{kelas.tingkat}</Table.Cell>
                                <Table.Cell>{kelas.siswa_count}</Table.Cell>
                                <Table.Cell>{kelas.wali.nama}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                <Paginator meta={meta} links={links} only={['kelas']} />
            </div>
            <KelasForm tapel_aktif={tapel_aktif} form={form} isOpen={openForm} setIsOpen={setOpenForm} />
        </>
    );
}

Kelas.layout = (page: React.ReactNode) => <AppLayout children={page} breadcrumbs={breadcrumbs} />;
