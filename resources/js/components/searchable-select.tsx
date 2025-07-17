import { Select, SelectProps } from '@/components/ui';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useAsyncList } from '@react-stately/data';

interface item {
    id: number;
    label: string;
}

interface Props extends Omit<SelectProps<item>, 'children'> {
    data: string;
    additional?: string;
}

export const SearchableSelect = ({ data, additional, ...props }: Props) => {
    const { url } = usePage<SharedData>().props.ziggy;

    const list = useAsyncList<item>({
        async load({ signal, filterText }) {
            const res = await fetch(`${url}/api/${data}?q=${filterText}${additional ? `&${additional}` : ''}`, { signal });
            const json = await res.json();
            return {
                items: json,
            };
        },
    });

    return (
        <Select
            aria-label={data}
            placeholder={`Pilih ${data}`}
            searchable={{ inputValue: list.filterText, onInputChange: list.setFilterText }}
            isPending={list.isLoading}
            items={list.items}
            {...props}
        >
            {(item) => (
                <Select.Item id={item.id} textValue={item.label}>
                    <Select.Label>{item.label}</Select.Label>
                </Select.Item>
            )}
        </Select>
    );
};
