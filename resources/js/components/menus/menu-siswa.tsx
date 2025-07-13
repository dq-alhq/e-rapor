import { Sidebar } from '@/components/ui';
import type { NavItem } from '@/types';
import { IconClipboardCheck, IconClipboardList, IconLayoutPanelTop, IconPrinter, IconUser } from 'hq-icons';

const masterDataMenu: NavItem[] = [
    {
        title: 'Data Siswa',
        href: '/data-siswa',
        icon: IconUser,
    },
    {
        title: 'Data Kelas',
        href: '/data-kelas',
        icon: IconLayoutPanelTop,
    },
];
const pembelajaranMenu: NavItem[] = [
    {
        title: 'Penilaian',
        href: '/penilaian',
        icon: IconClipboardCheck,
    },
    {
        title: 'Absensi Siswa',
        href: '/absensi',
        icon: IconClipboardList,
    },
];

const raporMenu: NavItem[] = [
    {
        title: 'Leger',
        href: '/leger',
        icon: IconClipboardCheck,
    },
    {
        title: 'Cetak Rapor',
        href: '/cetak-rapor',
        icon: IconPrinter,
    },
];

export const MenuSiswa = ({ pathname }: { pathname: string }) => {
    return (
        <>
            <Sidebar.Section title="Master Data">
                {masterDataMenu.map((item) => (
                    <Sidebar.Item key={item.title} href={item.href} isCurrent={pathname === item.href}>
                        {item.icon && <item.icon />}
                        <Sidebar.Label>{item.title}</Sidebar.Label>
                    </Sidebar.Item>
                ))}
            </Sidebar.Section>
            <Sidebar.Section title="Pembelajaran">
                {pembelajaranMenu.map((item) => (
                    <Sidebar.Item key={item.title} href={item.href} isCurrent={pathname === item.href}>
                        {item.icon && <item.icon />}
                        <Sidebar.Label>{item.title}</Sidebar.Label>
                    </Sidebar.Item>
                ))}
            </Sidebar.Section>
            <Sidebar.Section title="Rapor">
                {raporMenu.map((item) => (
                    <Sidebar.Item key={item.title} href={item.href} isCurrent={pathname === item.href}>
                        {item.icon && <item.icon />}
                        <Sidebar.Label>{item.title}</Sidebar.Label>
                    </Sidebar.Item>
                ))}
            </Sidebar.Section>
        </>
    );
};
