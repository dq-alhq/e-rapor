import Heading from "@/components/heading"
import { Tabs } from "@/components/ui"
import {} from "@/components/ui/button"
import { useIsMobile } from "@/lib/hooks"
import type { NavItem } from "@/types"
import type { PropsWithChildren } from "react"

const sidebarNavItems: NavItem[] = [
    {
        title: "Profile",
        href: "/settings/profile",
        icon: null,
    },
    {
        title: "Password",
        href: "/settings/password",
        icon: null,
    },
    {
        title: "Appearance",
        href: "/settings/appearance",
        icon: null,
    },
]

export default function SettingsLayout({ children }: PropsWithChildren) {
    // When server-side rendering, we only render the layout on the client...
    const isMobile = useIsMobile()
    if (typeof window === "undefined") {
        return null
    }
    const currentPath = window.location.pathname

    return (
        <div className="px-4 py-6">
            <Heading title="Settings" description="Manage your profile and account settings" />

            <Tabs
                orientation={isMobile ? "horizontal" : "vertical"}
                selectedKey={currentPath}
                className="flex flex-col gap-6 md:flex-row"
            >
                <Tabs.List
                    items={sidebarNavItems}
                    className={isMobile ? "w-full justify-between" : "w-full max-w-56"}
                >
                    {(item) => (
                        <Tabs.Label
                            id={item.href}
                            href={item.href}
                            className="w-full justify-center sm:justify-start"
                        >
                            {item.title}
                        </Tabs.Label>
                    )}
                </Tabs.List>

                <Tabs.Content id={currentPath} className="max-w-2xl space-y-4">
                    {children}
                </Tabs.Content>
            </Tabs>
        </div>
    )
}
