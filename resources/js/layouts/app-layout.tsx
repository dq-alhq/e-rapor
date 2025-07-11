import { AppNavbar } from '@/components/app-navbar';
import { AppSidebar } from '@/components/app-sidebar';
import { Flash } from '@/components/flash';
import type { BreadcrumbItem } from '@/types';
import type { ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    layout?: 'sidebar' | 'navbar';
    variant?: 'default' | 'float' | 'inset';
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, layout = 'sidebar', variant = 'inset', breadcrumbs }: AppLayoutProps) => {
    return layout === 'sidebar' ? (
        <div className="flex">
            <AppSidebar variant={variant} breadcrumbs={breadcrumbs}>
                <Flash />
                {children}
            </AppSidebar>
        </div>
    ) : (
        <div className="grid min-h-dvh w-full">
            <AppNavbar breadcrumbs={breadcrumbs} variant={variant}>
                <Flash />
                {children}
            </AppNavbar>
        </div>
    );
};
