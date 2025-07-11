import type { DropZoneProps } from 'react-aria-components'
import { DropZone as RACDropZone, composeRenderProps } from 'react-aria-components'

import { cn } from '@/lib/utils'

const DropZone = ({ className, ...props }: DropZoneProps) => (
    <RACDropZone
        className={composeRenderProps(className, (className) =>
            cn(
                'group flex max-h-[200px] max-w-xl flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-6 text-sm outline-hidden transition duration-200 has-[[slot=description]]:text-center',
                'drop-target:border-primary drop-target:border-solid drop-target:bg-ring/50 drop-target:ring-4 drop-target:ring-ring drop-target:[&_.text-muted-fg]:text-primary',
                'focus:border-primary/70 focus:outline-hidden focus:ring-4 focus:ring-ring focus:invalid:border-danger/70 focus:invalid:ring-invalid',
                'focus-visible:ring-4 focus-visible:ring-ring',
                className
            )
        )}
        {...props}
    />
)
export { DropZone }
