import { buttonStyle } from '@/components/ui';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { IconArrowLeft } from 'hq-icons';

export default function ErrorPage({ status, message }: { status: number; message?: string }) {
    const title = {
        503: '503: Server Timeout',
        500: '500: Server Error',
        404: '404: Halaman Tidak Ditemukan',
        403: '403: Hak Akses Ditolak',
    }[status];

    const { prev_url } = usePage<SharedData>().props.ziggy;

    return (
        <div className="flex h-[calc(100vh-80px)] w-full items-center justify-center bg-bg p-5">
            <div className="text-center">
                <div className="inline-flex rounded-full bg-yellow-100 p-4">
                    <div className="rounded-full bg-yellow-200 stroke-yellow-600 p-4">
                        <svg className="h-16 w-16" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                    </div>
                </div>
                <h1 className="mt-5 text-[36px] font-bold text-fg lg:text-[50px]">{title}</h1>
                <p className="my-5 text-muted-fg lg:text-xl">{message}</p>
                <Link href={prev_url || '/'} className={buttonStyle({ variant: 'outline' })}>
                    <IconArrowLeft />
                    Kembali
                </Link>
            </div>
        </div>
    );
}
