import DataOptions from '@/components/data-options';
import Paginator from '@/components/paginator';
import { buttonStyle, Card, Header, Link } from '@/components/ui';
import AppLayout from '@/layouts/app-layout';
import KelasForm from '@/pages/kelas/form';
import type { BreadcrumbItem, FormSetting, Paginate } from '@/types';
import { Head } from '@inertiajs/react';
import { IconDiamondPlus, IconPencil } from 'hq-icons';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Data Kelas', href: '/tapel' },
];

interface Props {
    kelas: Paginate & { data: model.Kelas[] };
    tapel_aktif: model.Tapel;
    form: FormSetting & { data: model.Kelas };
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
                <div className="grid gap-4 lg:grid-cols-2">
                    {data?.map((kela) => (
                        <Card key={kela.id}>
                            <Card.Header>
                                <Card.Title>{kela.nama}</Card.Title>
                                <Card.Description>Tingkat {kela.tingkat}</Card.Description>
                                <Card.Action>
                                    <Link className={buttonStyle({ size: 'sm', variant: 'outline' })} href={route('kelas.edit', kela.id)}>
                                        <IconPencil />
                                        Edit
                                    </Link>
                                </Card.Action>
                            </Card.Header>
                            <Card.Content className="grid grid-cols-[auto_1fr] gap-4">
                                <div className="flex flex-col items-center justify-center gap-1 rounded-lg border p-3">
                                    <div className="text-sm">Siswa</div>
                                    <div className="text-2xl">{kela.siswa_count}</div>
                                </div>
                                <div className="flex flex-col items-center justify-center gap-1 rounded-lg border p-3">
                                    <div className="text-sm">Wali Kelas</div>
                                    <Link className={buttonStyle({ size: 'sm', variant: 'outline' })} href={route('guru.show', kela.wali.id)}>
                                        {kela.wali.nama}
                                    </Link>
                                </div>
                            </Card.Content>
                        </Card>
                    ))}
                </div>
                <Paginator meta={meta} links={links} only={['kelas']} />
            </div>
            <KelasForm tapel_aktif={tapel_aktif} form={form} isOpen={openForm} setIsOpen={setOpenForm} />
        </>
    );
}

Kelas.layout = (page: React.ReactNode) => <AppLayout children={page} breadcrumbs={breadcrumbs} />;
