import { type ReactNode, useEffect, useState } from 'react';

import AppLogo from '@/components/app-logo';
import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { MenuEkskul } from '@/components/menus/menu-ekskul';
import { MenuGuru } from '@/components/menus/menu-guru';
import { MenuKepsek } from '@/components/menus/menu-kepsek';
import { MenuProyek } from '@/components/menus/menu-proyek';
import { MenuSiswa } from '@/components/menus/menu-siswa';
import { MenuWaliKelas } from '@/components/menus/menu-wali-kelas';
import { NavUser } from '@/components/nav-user';
import { Link, Sidebar, SidebarInset, SidebarNav } from '@/components/ui';
import { Is, IsAdmin } from '@/lib/middleware';
import type { BreadcrumbItem, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

interface AppSidebarProps {
    breadcrumbs?: BreadcrumbItem[];
    variant: 'inset' | 'float' | 'default';
    children: ReactNode;
}

export function AppSidebar({ variant, children, breadcrumbs }: AppSidebarProps) {
    const pathname = usePage<SharedData>().props.ziggy.location;
    const [open, setOpen] = useState<boolean>(false);

    const { user } = usePage<SharedData>().props.auth;

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    return (
        <>
            <Sidebar collapsible="dock" variant={variant} isMobileOpen={open} onMobileOpenChange={setOpen}>
                <Sidebar.Header>
                    <AppLogo className="size-7! text-primary" />
                    <Sidebar.Label className="text-sm text-primary uppercase">{import.meta.env.VITE_APP_NAME}</Sidebar.Label>
                </Sidebar.Header>

                <Sidebar.Content className="no-scrollbar max-h-[80vh] flex-1 overflow-y-auto">
                    {IsAdmin() ? <MenuKepsek pathname={pathname} /> : Is('Guru') ? <MenuGuru pathname={pathname} /> : null}
                    {user.roles?.includes('Wali Kelas') && <MenuWaliKelas pathname={pathname} />}
                    {user.roles?.includes('Pembina Ekskul') && <MenuEkskul pathname={pathname} />}
                    {user.roles?.includes('Koordinator Proyek') && <MenuProyek pathname={pathname} />}
                    {user.roles?.includes('Siswa') && <MenuSiswa pathname={pathname} />}
                </Sidebar.Content>

                <Sidebar.Footer>
                    <NavUser showInfo />
                </Sidebar.Footer>
                <Sidebar.Rail />
                <Sidebar.Trigger />
            </Sidebar>
            <SidebarInset>
                <SidebarNav>
                    <Link href="#" className="ml-auto pl-16 md:hidden">
                        <AppLogo className="size-6" />
                    </Link>
                    <div className="hidden md:flex">
                        <Breadcrumbs breadcrumbs={breadcrumbs || []} />
                    </div>
                    <div className="ml-auto">
                        <AppearanceToggleDropdown />
                    </div>
                    <NavUser layout="navbar" />
                </SidebarNav>
                {children}
            </SidebarInset>
        </>
    );
}
