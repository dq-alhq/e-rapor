import { type ReactNode, useEffect, useState } from "react"

import AppLogo from "@/components/app-logo"
import AppearanceToggleDropdown from "@/components/appearance-dropdown"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { NavUser } from "@/components/nav-user"
import { Link, Sidebar, SidebarInset, SidebarNav } from "@/components/ui"
import type { BreadcrumbItem, NavItem } from "@/types"
import { IconBookOpen, IconFolder, IconLayoutGrid } from "hq-icons"

const mainNavItems: NavItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: IconLayoutGrid,
    },
]

const footerNavItems: NavItem[] = [
    {
        title: "Repository",
        href: "https://github.com/laravel/react-starter-kit",
        icon: <IconFolder />,
    },
    {
        title: "Documentation",
        href: "https://laravel.com/docs/starter-kits",
        icon: <IconBookOpen />,
    },
]

interface AppSidebarProps {
    breadcrumbs?: BreadcrumbItem[]
    variant: "inset" | "float" | "default"
    children: ReactNode
}

export function AppSidebar({
    variant,
    children,
    breadcrumbs,
}: { variant: "inset" | "float" | "default"; children: React.ReactNode; breadcrumbs?: any }) {
    const pathname = window.location.pathname
    const [open, setOpen] = useState<boolean>(false)

    useEffect(() => {
        setOpen(false)
    }, [pathname])

    return (
        <>
            <Sidebar
                collapsible="dock"
                variant={variant}
                isMobileOpen={open}
                onMobileOpenChange={setOpen}
            >
                <Sidebar.Header>
                    <AppLogo />
                    <Sidebar.Label className="text-[#ee2e03] text-sm">Laravel</Sidebar.Label>
                </Sidebar.Header>

                <Sidebar.Content className="flex-1">
                    <Sidebar.Section title="Platform">
                        {mainNavItems.map((item) => (
                            <Sidebar.Item
                                key={item.title}
                                href={item.href}
                                isCurrent={pathname === item.href}
                            >
                                {item.icon && <item.icon />}
                                <Sidebar.Label>{item.title}</Sidebar.Label>
                            </Sidebar.Item>
                        ))}
                    </Sidebar.Section>
                    <Sidebar.Section className="mt-auto">
                        {footerNavItems.map((item) => (
                            <Sidebar.Item key={item.title} href={item.href}>
                                {item.icon}
                                <Sidebar.Label>{item.title}</Sidebar.Label>
                            </Sidebar.Item>
                        ))}
                    </Sidebar.Section>
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
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                    <div className="ml-auto">
                        <AppearanceToggleDropdown />
                    </div>
                    <NavUser layout="navbar" />
                </SidebarNav>
                {children}
            </SidebarInset>
        </>
    )
}
