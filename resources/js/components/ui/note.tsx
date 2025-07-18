import type { ComponentPropsWithRef } from 'react';

import { cn } from '@/lib/utils';

interface NoteProps extends ComponentPropsWithRef<'div'> {
    variant?: 'default' | 'danger' | 'outline';
}

const Note = ({ variant = 'default', className, children, ...props }: NoteProps) => (
    <div
        className={cn(
            'w-full overflow-ellipsis rounded-lg border p-2 backdrop-blur-2xl',
            variant === 'default' && 'border-primary/30 bg-primary/10 text-primary',
            variant === 'danger' && 'border-danger/30 bg-danger/10 text-danger',
            variant === 'outline' && 'border-muted text-fg',
            className
        )}
        {...props}
    >
        <div
            className="grid grid-cols-[auto_1fr] *:data-[slot=icon]:mr-3 *:data-[slot=icon]:size-5 *:data-[slot=icon]:shrink-0">
            {children}
        </div>
    </div>
);

const NoteTitle = ({ className, ...props }: ComponentPropsWithRef<'h5'>) => (
    <h5 className={cn('font-semibold tracking-tight first:col-span-full', className)} {...props} />
);

const NoteDescription = ({ className, ...props }: ComponentPropsWithRef<'div'>) => (
    <p className={cn('col-start-2 mt-1 text-muted-fg text-sm leading-relaxed', className)} {...props} />
);

Note.Title = NoteTitle;
Note.Description = NoteDescription;

export { Note };
