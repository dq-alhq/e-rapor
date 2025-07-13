import { Sidebar } from '@/components/ui';
import type { NavItem } from '@/types';
import { IconClipboardCheck, IconClipboardList, IconClipboardPen, IconPrinter, IconUsers } from 'hq-icons';

const waliKelasMenu: NavItem[] = [
    {
        title: 'Anggota Kelas',
        href: '/anggota-kelas',
        icon: IconUsers,
    },
    {
        title: 'Pembelajaran',
        href: '/pembelajaran',
        icon: IconUsers,
    },
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
const ujianMenu: NavItem[] = [
    {
        title: 'Sumatif Tengah Semester',
        href: '/sts',
        icon: IconClipboardPen,
    },
    {
        title: 'Sumatif Akhir Semester',
        href: '/sas',
        icon: IconClipboardPen,
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

export const MenuWaliKelas = ({ pathname }: { pathname: string }) => {
    return (
        <>
            <Sidebar.Section title="Pembelajaran">
                {waliKelasMenu.map((item) => (
                    <Sidebar.Item key={item.title} href={item.href} isCurrent={pathname === item.href}>
                        {item.icon && <item.icon />}
                        <Sidebar.Label>{item.title}</Sidebar.Label>
                    </Sidebar.Item>
                ))}
            </Sidebar.Section>
            <Sidebar.Section title="Ekstrakurikuler">
                {ekskulMenu.map((item) => (
                    <Sidebar.Item key={item.title} href={item.href} isCurrent={pathname === item.href}>
                        {item.icon && <item.icon />}
                        <Sidebar.Label>{item.title}</Sidebar.Label>
                    </Sidebar.Item>
                ))}
            </Sidebar.Section>
            <Sidebar.Section title="Ujian">
                {ujianMenu.map((item) => (
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
