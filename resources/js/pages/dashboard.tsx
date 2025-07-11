import { PlaceholderPattern } from '@/components/ui/skeleton';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-[calc(100vh-4.1rem)] flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-muted/70">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-muted/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-muted/70">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-muted/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-muted/70">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-muted/20" />
                    </div>
                </div>
                <div className="relative h-full flex-1 overflow-hidden rounded-xl border border-muted/70">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-muted/20" />
                </div>
            </div>
        </>
    );
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/',
    },
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

Dashboard.layout = (page: React.ReactNode) => <AppLayout breadcrumbs={breadcrumbs} children={page} layout="sidebar" variant="inset" />;
