import { Sidebar } from '@/components/ui';
import type { NavItem } from '@/types';
import { IconBookMarked, IconClipboardCheck } from 'hq-icons';

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
