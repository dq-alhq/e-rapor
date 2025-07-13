import AppLogo from '@/components/app-logo';
import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { NavUser } from '@/components/nav-user';
import { Navbar, Tooltip } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { BreadcrumbItem, NavItem, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { IconBookOpen, IconFolder, IconLayoutGrid, IconSearch } from 'hq-icons';
import type { ReactElement } from 'react';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: <IconLayoutGrid />,
    },
];

const rightNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: <IconFolder />,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits',
        icon: <IconBookOpen />,
    },
];

interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
    variant?: 'default' | 'float' | 'inset';
    children?: React.ReactNode;
}

export function AppNavbar({ breadcrumbs = [], variant, children }: AppHeaderProps) {
    const page = usePage<SharedData>();
    return (
        <>
            <Navbar isSticky variant={variant}>
                {/* Desktop Navigation */}
                <Navbar.Nav>
                    <Navbar.Logo href="/dashboard">
                        <AppLogo className="mr-4 size-6" />
                    </Navbar.Logo>
                    <Navbar.Section>
                        {rightNavItems.map((item) => (
                            <Tooltip key={item.title} delay={0}>
                                <Tooltip.Trigger>
                                    <Navbar.Item href={item.href} target="_blank">
                                        {item.icon && (item.icon as ReactElement)}
                                        <span className="sr-only">{item.title}</span>
                                    </Navbar.Item>
                                </Tooltip.Trigger>
                                <Tooltip.Content>{item.title}</Tooltip.Content>
                            </Tooltip>
                        ))}
                        {mainNavItems.map((item, index) => (
                            <Navbar.Item isCurrent={page.url === item.href} href={item.href} key={index}>
                                {item.icon && (item.icon as ReactElement)}
                                {item.title}
                            </Navbar.Item>
                        ))}
                    </Navbar.Section>

                    <Navbar.Section className="ml-auto hidden md:flex">
                        <Navbar.Flex>
                            <Button variant="ghost" icon>
                                <IconSearch />
                            </Button>
                            <AppearanceToggleDropdown />
                            <NavUser layout="navbar" />
                        </Navbar.Flex>
                    </Navbar.Section>
                </Navbar.Nav>

                {/* Mobile Menu */}
                <Navbar.Compact>
                    <Navbar.Flex>
                        <Navbar.Trigger />
                        <Navbar.Logo href="/dashboard">
                            <AppLogo className="size-6" />
                        </Navbar.Logo>
                    </Navbar.Flex>
                    <Navbar.Flex>
                        <Button variant="ghost" icon>
                            <IconSearch />
                        </Button>
                        <AppearanceToggleDropdown />
                        <NavUser layout="navbar" />
                    </Navbar.Flex>
                </Navbar.Compact>
                <Navbar.Inset>
                    {breadcrumbs.length > 1 && (
                        <div
                            className={cn(
                                'flex h-12 w-full items-center',
                                variant === 'default' && 'border-b bg-bg text-fg *:max-w-7xl *:px-6 md:*:px-0',
                                variant === 'inset' && 'border-b px-6',
                                variant === 'float' && 'mx-auto w-full max-w-7xl rounded-lg bg-bg px-2 text-fg md:px-4',
                            )}
                        >
                            <div className="mx-auto w-full">
                                <Breadcrumbs breadcrumbs={breadcrumbs} />
                            </div>
                        </div>
                    )}
                    {children}
                </Navbar.Inset>
            </Navbar>
        </>
    );
}
