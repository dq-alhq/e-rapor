import { SearchField, Select } from '@/components/ui';
import { cn } from '@/lib/utils';
import { router, usePage } from '@inertiajs/react';
import React from 'react';
import { type Key } from 'react-aria-components';

const PerPages = [
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
];

interface Props {
    className?: string;
}

interface PageOptions {
    perPage: number;
    search: string;
}

export default function PageOptions({ className }: Props) {
    const { page_options } = usePage<{ page_options: PageOptions }>().props;

    const [perPage, setPerPage] = React.useState<Key | null>(page_options.perPage || 10);
    const [search, setSearch] = React.useState<string>(page_options.search || '');

    function handlePerPage(value: Key | null) {
        setPerPage(value!);
        if (search.length === 0) router.get(route(route().current() as string), { perPage: value }, { preserveState: true });
        else router.get(route(route().current() as string), { q: search, perPage: value }, { preserveState: true });
    }

    function handleSearch(value: string) {
        setSearch(value);
        if (perPage === 10) router.get(route(route().current() as string), { q: value }, { preserveState: true });
        else router.get(route(route().current() as string), { q: value, perPage }, { preserveState: true });
    }

    return (
        <div className={cn('mb-4 flex flex-row items-center justify-between gap-2', className)}>
            <Select placeholder="10" className="w-fit" aria-label="Per Page" items={PerPages} selectedKey={perPage} onSelectionChange={handlePerPage}>
                {(item) => (
                    <Select.Item id={item.value} textValue={item.label}>
                        {item.label}
                    </Select.Item>
                )}
            </Select>
            <SearchField aria-label="Search" value={search} onChange={handleSearch} />
        </div>
    );
}
