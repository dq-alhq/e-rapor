import { Select, SelectProps } from '@/components/ui';
import { useAsyncList } from '@react-stately/data';

interface item {
    id: number;
    nama: string;
}

export default function GuruSelect(props: Omit<SelectProps<item>, 'children'>) {
    const list = useAsyncList<item>({
        async load({ signal, filterText }) {
            const res = await fetch(`${import.meta.env.VITE_APP_URL}/api/guru?q=${filterText || props.selectedKey}`, { signal });
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
