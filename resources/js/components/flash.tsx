import { toast, ToastProvider } from '@/components/ui';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export function Flash() {
    const { flash } = usePage<SharedData>().props;
    useEffect(() => {
        if (flash?.message) {
            // eslint-disable-next-line
            (toast as any)[flash.type](flash.message);
        }
    }, [flash]);
    return <ToastProvider />;
}
