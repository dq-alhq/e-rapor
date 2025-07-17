import { Select, SelectProps } from '@/components/ui';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useAsyncList } from '@react-stately/data';

interface item {
    id: number;
    nama: string;
}

export default function GuruSelect(props: Omit<SelectProps<item>, 'children'>) {
    const { url } = usePage<SharedData>().props.ziggy;

    const list = useAsyncList<item>({
        async load({ signal, filterText }) {
            const res = await fetch(`${url}/api/guru?q=${filterText}`, { signal });
            const json = await res.json();

            return {
                items: json,
            };
        },
    });

    return (
        <Select
            aria-label="Guru"
            placeholder="Pilih Guru"
            searchable={{ inputValue: list.filterText, onInputChange: list.setFilterText }}
            isPending={list.isLoading}
            items={list.items}
            {...props}
        >
            {(item) => (
                <Select.Item id={item.id} textValue={item.nama}>
                    {item.nama}
                </Select.Item>
            )}
        </Select>
    );
}
