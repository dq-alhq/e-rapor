import type { DropEvent } from '@react-types/shared';
import { useState } from 'react';
import { isFileDropItem } from 'react-aria-components';

import { Avatar, DropZone, FileTrigger } from '@/components/ui';
import { compressImage } from '@/lib/compress-image';
import { cn } from '@/lib/utils';

interface Props {
    value: string;
    label?: string;
    onChange: (e: File) => void;
}

export function UploadFoto({ value, onChange, label = 'Upload Foto' }: Props) {
    const [droppedImage, setDroppedImage] = useState<string | null>(null);

    const onDropHandler = async (e: DropEvent) => {
        const item = e.items.filter(isFileDropItem).find((item) => item.type === 'image/jpeg' || item.type === 'image/png');
        if (item) {
            const file = await item.getFile();
            const compressedFile = await compressImage(file);
            setDroppedImage(URL.createObjectURL(compressedFile));
            onChange(compressedFile);
        }
    };

    const onSelectHandler = async (e: FileList | null) => {
        if (e) {
            const files = Array.from([...e]);
            const item = files[0];

            if (item) {
                const compressedFile = await compressImage(item);
                setDroppedImage(URL.createObjectURL(compressedFile));
                onChange(compressedFile);
            }
        }
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <DropZone
                getDropOperation={(types) => (types.has('image/jpeg') || types.has('image/png') ? 'copy' : 'cancel')}
                onDrop={onDropHandler}
                className={cn('overflow-hidden p-0')}
            >
                <Avatar src={droppedImage ?? value} size="5xl" shape="square" />
                <input type="hidden" name="avatar" value={droppedImage ?? value} />
            </DropZone>
            <FileTrigger size="sm" acceptedFileTypes={['image/png', 'image/jpeg']} onSelect={onSelectHandler}>
                {label}
            </FileTrigger>
        </div>
    );
}
