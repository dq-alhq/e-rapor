import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Data Pembelajaran', href: '/pembelajaran' },
];

export default function Pembelajaran() {
    return (
        <>
            <Head title="Data Pembelajaran" />
            <div className="flex h-[calc(100vh-4.1rem)] flex-1 flex-col gap-4 rounded-xl p-4">Data Pembelajaran</div>
        </>
    );
}

Pembelajaran.layout = (page: React.ReactNode) => <AppLayout children={page} breadcrumbs={breadcrumbs} />;
