import type { Config } from 'ziggy-js';

export interface Auth {
    user: model.User;
}

export interface FlashProps {
    type: string;
    message: string;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavItem {
    title: string;
    href: string;
    icon?: ReactElement;
    isActive?: boolean;
}

export interface SharedData {
    auth: Auth;
    ziggy: Config & { location: string };
    flash: FlashProps;

    [key: string]: unknown;
}
