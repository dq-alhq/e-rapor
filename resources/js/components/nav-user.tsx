import { Avatar, Indicator, Menu, User } from "@/components/ui"
import { cn } from "@/lib/utils"
import type { SharedData } from "@/types"
import { router, usePage } from "@inertiajs/react"
import { LogOut, Settings } from "hq-icons"

export function NavUser({
    showInfo = false,
    layout = "sidebar",
}: { showInfo?: boolean; layout?: "navbar" | "sidebar" }) {
    const { user } = usePage<SharedData>().props.auth
    const handleLogout = () => {
        router.flushAll()
    }

    return (
        <Menu>
            <Menu.Trigger
                className={cn(
                    "flex items-center justify-between rounded-lg pressed:bg-muted/50 hover:bg-muted/40",
                    layout === "sidebar" ? "size-full p-2" : "mx-2",
                )}
            >
                {showInfo ? (
                    <User
                        shape="square"
                        name={user.name}
                        src={user.avatar}
                        description={user.email}
                    />
                ) : (
                    <Indicator>
                        <Avatar
                            shape="square"
                            initials={user.name}
                            src={user.avatar}
                            alt={user.name}
                        />
                    </Indicator>
                )}
            </Menu.Trigger>
            <Menu.Content placement={layout === "navbar" ? "bottom end" : "top start"}>
                <Menu.Header className="sm:pr-8">
                    <User
                        size="md"
                        shape="square"
                        name={user.name}
                        src={user.avatar}
                        description={user.email}
                    />
                </Menu.Header>
                <Menu.Item href={route("profile.edit")}>
                    <Settings />
                    <Menu.Label>Settings</Menu.Label>
                </Menu.Item>
                <Menu.Separator />
                <Menu.Item
                    href={route("logout")}
                    onAction={handleLogout}
                    routerOptions={{ method: "post" }}
                >
                    <LogOut />
                    <Menu.Label>Logout</Menu.Label>
                </Menu.Item>
            </Menu.Content>
        </Menu>
    )
}
