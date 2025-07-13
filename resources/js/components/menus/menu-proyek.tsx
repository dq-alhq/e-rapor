import { Sidebar } from '@/components/ui';
import type { NavItem } from '@/types';
import { IconClipboardCheck, IconUsers } from 'hq-icons';

const proyekMenu: NavItem[] = [
    {
        title: 'Anggota Proyek',
        href: '/anggota-proyek',
        icon: IconUsers,
    },
    {
        title: 'Penilaian',
        href: '/penilaian',
        icon: IconClipboardCheck,
    },
];

export const MenuProyek = ({ pathname }: { pathname: string }) => {
    return (
        <>
            <Sidebar.Section title="Proyek P5">
                {proyekMenu.map((item) => (
                    <Sidebar.Item key={item.title} href={item.href} isCurrent={pathname === item.href}>
                        {item.icon && <item.icon />}
                        <Sidebar.Label>{item.title}</Sidebar.Label>
                    </Sidebar.Item>
                ))}
            </Sidebar.Section>
        </>
    );
};
