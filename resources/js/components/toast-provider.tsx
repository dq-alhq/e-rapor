import { Toast } from '@/components/ui';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast as toaster } from 'sonner';

export function ToastProvider() {
    const { toast } = usePage<SharedData>().props;
    useEffect(() => {
        if (toast?.message) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (toaster as any)[toast.type](toast.message);
        }
    }, [toast]);
    return <Toast />;
}
