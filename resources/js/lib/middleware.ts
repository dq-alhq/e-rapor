import { Roles, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export const Is = (role: Roles | Roles[]) => {
    const { roles } = usePage<SharedData>().props.auth.user;
    if (Array.isArray(role)) {
        return role.some((r) => roles?.includes(r));
    }
    return roles?.includes(role);
};

export const IsAdmin = () => {
    return Is(['Kepala Sekolah', 'Operator']);
};

export const GuruKelas = (ids: number | number[]) => {
    const { kelas } = usePage<SharedData>().props.auth.user.guru;
    if (Array.isArray(ids)) {
        return ids.some((id) => kelas?.includes(id));
    }
    return kelas?.includes(ids);
};

export const GuruMapel = (ids: number | number[]) => {
    const { mapel } = usePage<SharedData>().props.auth.user.guru;
    if (Array.isArray(ids)) {
        return ids.some((id) => mapel?.includes(id));
    }
    return mapel?.includes(ids);
};

export const WaliKelas = (ids: number | number[]) => {
    const { wali_kelas } = usePage<SharedData>().props.auth.user.guru;
    if (Array.isArray(ids)) {
        return ids.some((id) => wali_kelas?.includes(id));
    }
    return wali_kelas?.includes(ids);
};
