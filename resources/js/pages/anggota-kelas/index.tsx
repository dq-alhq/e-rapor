import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Data Anggota Kelas', href: '/anggota-kelas' },
];

export default function AnggotaKelas() {
    return (
        <>
            <Head title="Data Anggota Kelas" />
            <div className="flex h-[calc(100vh-4.1rem)] flex-1 flex-col gap-4 rounded-xl p-4">Data Anggota Kelas</div>
        </>
    );
}

AnggotaKelas.layout = (page: React.ReactNode) => <AppLayout children={page} breadcrumbs={breadcrumbs} />;
