import { Sidebar } from '@/components/ui';
import type { NavItem } from '@/types';
import { IconClipboardCheck, IconUsers } from 'hq-icons';

const ekskulMenu: NavItem[] = [
    {
        title: 'Anggota Ekstrakurikuler',
        href: '/anggota-ekskul',
        icon: IconUsers,
    },
    {
        title: 'Penilaian',
        href: '/penilaian',
        icon: IconClipboardCheck,
    },
];

export const MenuEkskul = ({ pathname }: { pathname: string }) => {
    return (
        <>
            <Sidebar.Section title="Proyek P5">
                {ekskulMenu.map((item) => (
                    <Sidebar.Item key={item.title} href={item.href} isCurrent={pathname === item.href}>
                        {item.icon && <item.icon />}
                        <Sidebar.Label>{item.title}</Sidebar.Label>
                    </Sidebar.Item>
                ))}
            </Sidebar.Section>
        </>
    );
};
