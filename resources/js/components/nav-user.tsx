import { Avatar, Indicator, Menu, User } from '@/components/ui';
import { cn } from '@/lib/utils';
import type { SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { LogOut, Settings } from 'hq-icons';

export function NavUser({ showInfo = false, layout = 'sidebar' }: { showInfo?: boolean; layout?: 'navbar' | 'sidebar' }) {
    const { user } = usePage<SharedData>().props.auth;
    const handleLogout = () => {
        router.flushAll();
    };

    return (
        <Menu>
            <Menu.Trigger
                className={cn(
                    'flex items-center justify-between rounded-lg hover:bg-muted/40 pressed:bg-muted/50',
                    layout === 'sidebar' ? 'size-full p-2' : 'mx-2',
                )}
            >
                {showInfo ? (
                    <div className="flex w-full items-center overflow-hidden text-ellipsis whitespace-nowrap">
                        <User shape="square" name={user.name} alt={user.name} src={user.avatar || undefined} description={user.roles?.[0]} />
                    </div>
                ) : (
                    <Indicator>
                        <Avatar shape="square" src={user.avatar || undefined} alt={user.name} />
                    </Indicator>
                )}
            </Menu.Trigger>
            <Menu.Content placement={layout === 'navbar' ? 'bottom end' : 'top start'}>
                <Menu.Header className="sm:pr-8">
                    <User size="md" shape="square" name={user.name} src={user.avatar || undefined} description={user.roles?.[0]} />
                </Menu.Header>
                <Menu.Item href={route('profile.edit')}>
                    <Settings />
                    <Menu.Label>Settings</Menu.Label>
                </Menu.Item>
                <Menu.Separator />
                <Menu.Item href={route('logout')} onAction={handleLogout} routerOptions={{ method: 'post' }}>
                    <LogOut />
                    <Menu.Label>Logout</Menu.Label>
                </Menu.Item>
            </Menu.Content>
        </Menu>
    );
}
