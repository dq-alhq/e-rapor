import { Select, SelectProps } from '@/components/ui';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useAsyncList } from '@react-stately/data';

export default function WilayahSelect(props: Omit<SelectProps<{ id: number; name: string }>, 'children'>) {
    const { url } = usePage<SharedData>().props.ziggy;
    const list = useAsyncList<{ id: number; name: string }>({
        async load({ signal, filterText }) {
            const res = await fetch(`${url}/api/wilayah?q=${filterText || props.selectedKey}`, { signal });
            const json = await res.json();

            return {
                items: json,
            };
        },
    });

    return (
        <Select
            aria-label="Wilayah"
            placeholder="Pilih Wilayah"
            searchable={{ inputValue: list.filterText, onInputChange: list.setFilterText }}
            isPending={list.isLoading}
            items={list.items}
            {...props}
        >
            {(item) => (
                <Select.Item id={item.id} textValue={item.name}>
                    {item.name}
                </Select.Item>
            )}
        </Select>
    );
}
