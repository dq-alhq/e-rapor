import { AppNavbar } from '@/components/app-navbar';
import { AppSidebar } from '@/components/app-sidebar';
import { ToastProvider } from '@/components/toast-provider';
import type { BreadcrumbItem } from '@/types';
import { ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    layout?: 'sidebar' | 'navbar';
    variant?: 'default' | 'float' | 'inset';
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, layout = 'sidebar', variant = 'inset', breadcrumbs }: AppLayoutProps) => {
    return layout === 'sidebar' ? (
        <>
            <ToastProvider />
            <div className="flex">
                <AppSidebar variant={variant} breadcrumbs={breadcrumbs}>
                    {children}
                </AppSidebar>
            </div>
        </>
    ) : (
        <>
            <ToastProvider />
            <div className="grid min-h-dvh w-full">
                <AppNavbar breadcrumbs={breadcrumbs} variant={variant}>
                    {children}
                </AppNavbar>
            </div>
        </>
    );
};
