import type { Config } from 'ziggy-js';

const roles = ['Kepala Sekolah' | 'Guru' | 'Wali Kelas' | 'Siswa' | 'Operator' | 'Pembina Ekskul' | 'Koordinator Proyek'];

export interface Auth {
    user: model.User & {
        roles?: roles[];
    };
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface ToastProps {
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
}

export interface NavItem {
    title: string;
    href: string;
    icon?: ReactElement;
    isActive?: boolean;
}

export interface SharedData {
    auth: Auth;
    ziggy: Config & { location: string; prev_url: string; url: string };
    status?: string;
    toast?: ToastProps;
    sekolah?: model.Sekolah;
    tapel_aktif?: model.Tapel;

    [key: string]: unknown;
}

export interface PageProps {
    perPage: number;
    search: string;
    sort: string;
    dir: 'asc' | 'desc';
    filter?: string[];
}

export interface Paginate {
    meta: {
        from: number;
        to: number;
        total: number;
        current_page: number;
        last_page: number;
        path: string;
        per_page: number;
        links: {
            active: boolean;
            label: string;
            url: string | null;
        }[];
    };
    links: {
        first: string | null;
        last: string | null;
        next: string | null;
        prev: string | null;
    };
    attributes?: PageProps;
}

export interface OverlayProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export interface FormSetting {
    method: 'post' | 'put';
    title: string;
    url: string;
}
