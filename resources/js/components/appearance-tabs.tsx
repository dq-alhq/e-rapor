import { type Appearance, useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { IconMonitor, IconMoon, IconSun } from 'hq-icons';
import type { HTMLAttributes, ReactElement } from 'react';

export default function AppearanceToggleTab({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();

    const tabs: { value: Appearance; icon: ReactElement; label: string }[] = [
        { value: 'light', icon: <IconSun />, label: 'Light' },
        { value: 'dark', icon: <IconMoon />, label: 'Dark' },
        { value: 'system', icon: <IconMonitor />, label: 'System' },
    ];

    return (
        <div className={cn('inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800', className)} {...props}>
            {tabs.map(({ value, icon, label }) => (
                <button
                    type="button"
                    key={value}
                    onClick={() => updateAppearance(value)}
                    className={cn(
                        'flex items-center rounded-md px-3.5 py-1.5 transition-colors',
                        appearance === value
                            ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                            : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
                    )}
                >
                    {icon}
                    <span className="ml-1.5 text-sm">{label}</span>
                </button>
            ))}
        </div>
    );
}
