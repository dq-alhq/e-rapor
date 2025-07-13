import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Data Mata Pelajaran', href: '/mapel' },
];

export default function Mapel() {
    return (
        <>
            <Head title="Data Mata Pelajaran" />
            <div className="flex h-[calc(100vh-4.1rem)] flex-1 flex-col gap-4 rounded-xl p-4">Data Mapel</div>
        </>
    );
}

Mapel.layout = (page: React.ReactNode) => <AppLayout children={page} breadcrumbs={breadcrumbs} />;
