import { Sidebar } from '@/components/ui';
import type { NavItem } from '@/types';
import { IconBookCopy, IconBookMarked, IconClipboardCheck, IconLayoutPanelTop, IconSchool } from 'hq-icons';

const masterDataMenu: NavItem[] = [
    {
        title: 'Sekolah',
        href: route('sekolah.index'),
        icon: IconSchool,
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
];

const pembelajaranMenu: NavItem[] = [
    {
        title: 'Pembelajaran',
        href: '/pembelajaran',
        icon: IconBookMarked,
    },
    {
        title: 'Penilaian',
        href: '/penilaian',
        icon: IconClipboardCheck,
    },
];

export const MenuGuru = ({ pathname }: { pathname: string }) => {
    return (
        <>
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
                    <Sidebar.Item key={item.title} href={item.href} isCurrent={pathname === item.href}>
                        {item.icon && <item.icon />}
                        <Sidebar.Label>{item.title}</Sidebar.Label>
                    </Sidebar.Item>
                ))}
            </Sidebar.Section>
        </>
    );
};
