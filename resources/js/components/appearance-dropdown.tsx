import { Button, Menu } from "@/components/ui"
import { useAppearance } from "@/hooks/use-appearance"
import { IconMonitor, IconMoon, IconSun } from "hq-icons"

export default function AppearanceToggleDropdown() {
    const { appearance, updateAppearance } = useAppearance()

    const getCurrentIcon = () => {
        switch (appearance) {
            case "dark":
                return <IconMoon />
            case "light":
                return <IconSun />
            default:
                return <IconMonitor />
        }
    }

    return (
        <Menu>
            <Button variant="ghost" icon>
                {getCurrentIcon()}
                <span className="sr-only">Toggle Theme</span>
            </Button>
            <Menu.Content placement="bottom end">
                <Menu.Item onAction={() => updateAppearance("light")}>
                    <IconSun />
                    <Menu.Label>Light</Menu.Label>
                </Menu.Item>
                <Menu.Item onAction={() => updateAppearance("dark")}>
                    <IconMoon />
                    <Menu.Label>Dark</Menu.Label>
                </Menu.Item>
                <Menu.Item onAction={() => updateAppearance("system")}>
                    <IconMonitor />
                    <Menu.Label>System</Menu.Label>
                </Menu.Item>
            </Menu.Content>
        </Menu>
    )
}
