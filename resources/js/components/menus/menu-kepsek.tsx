import { Sidebar } from '@/components/ui';
import type { NavItem } from '@/types';
import {
    IconBookCheck,
    IconBookCopy,
    IconBoxes,
    IconCalendarDays,
    IconClipboardList,
    IconLayoutPanelTop,
    IconListChecks,
    IconSchool,
    IconSquareUser,
    IconTarget,
    IconUser,
    IconUserCog,
    IconUsers,
} from 'hq-icons';

const masterDataMenu: NavItem[] = [
    {
        title: 'Sekolah',
        href: route('sekolah.index'),
        icon: IconSchool,
    },
    {
        title: 'Tahun Pelajaran',
        href: route('tapel.index'),
        icon: IconCalendarDays,
    },
    {
        title: 'Kelas',
        href: route('kelas.index'),
        icon: IconLayoutPanelTop,
    },
    {
        title: 'Mata Pelajaran',
        href: route('mapel.index'),
        icon: IconBookCopy,
    },
    {
        title: 'Ekstrakurikuler',
        href: route('ekskul.index'),
        icon: IconBoxes,
    },
];

const manajemenPenggunaMenu: NavItem[] = [
    {
        title: 'Guru',
        href: route('guru.index'),
        icon: IconUser,
    },
    {
        title: 'Operator',
        href: route('operator.index'),
        icon: IconUserCog,
    },
    {
        title: 'Siswa',
        href: route('siswa.index'),
        icon: IconSquareUser,
    },
];

const pembelajaranMenu: NavItem[] = [
    {
        title: 'Anggota Kelas',
        href: '/kepsek/anggota-kelas',
        icon: IconUsers,
    },
    {
        title: 'Pembelajaran',
        href: '/kepsek/pembelajaran',
        icon: IconBoxes,
    },
    {
        title: 'Penilaian',
        href: '/kepsek/penilaian',
        icon: IconBookCheck,
    },
    {
        title: 'Absensi Siswa',
        href: '/kepsek/absensi',
        icon: IconClipboardList,
    },
];

const proyekMenu: NavItem[] = [
    {
        title: 'Target Capaian',
        href: '/kepsek/capaian-proyek',
        icon: IconTarget,
    },
    {
        title: 'Daftar Proyek',
        href: '/kepsek/daftar-proyek',
        icon: IconListChecks,
    },
];

export const MenuKepsek = ({ pathname }: { pathname: string }) => {
    return (
        <>
            <Sidebar.Section title="Manajemen Pengguna">
                {manajemenPenggunaMenu.map((item) => (
                    <Sidebar.Item key={item.title} href={item.href} isCurrent={pathname.startsWith(item.href)}>
                        {item.icon && <item.icon />}
                        <Sidebar.Label>{item.title}</Sidebar.Label>
                    </Sidebar.Item>
                ))}
            </Sidebar.Section>
            <Sidebar.Section title="Master Data">
                {masterDataMenu.map((item) => (
                    <Sidebar.Item key={item.title} href={item.href} isCurrent={pathname.startsWith(item.href)}>
                        {item.icon && <item.icon />}
                        <Sidebar.Label>{item.title}</Sidebar.Label>
                    </Sidebar.Item>
                ))}
            </Sidebar.Section>
            <Sidebar.Section title="Pembelajaran">
                {pembelajaranMenu.map((item) => (
                    <Sidebar.Item key={item.title} href={item.href} isCurrent={pathname.startsWith(item.href)}>
                        {item.icon && <item.icon />}
                        <Sidebar.Label>{item.title}</Sidebar.Label>
                    </Sidebar.Item>
                ))}
            </Sidebar.Section>
            <Sidebar.Section title="Proyek P5">
                {proyekMenu.map((item) => (
                    <Sidebar.Item key={item.title} href={item.href} isCurrent={pathname.startsWith(item.href)}>
                        {item.icon && <item.icon />}
                        <Sidebar.Label>{item.title}</Sidebar.Label>
                    </Sidebar.Item>
                ))}
            </Sidebar.Section>
        </>
    );
};
