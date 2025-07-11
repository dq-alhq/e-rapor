import { router } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { RouterProvider } from 'react-aria-components';

export default function Providers({ children }: { children: ReactNode }) {
    return <RouterProvider navigate={(to, options) => router.visit(to, options)}>{children}</RouterProvider>;
}
