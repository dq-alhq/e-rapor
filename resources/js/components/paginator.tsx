import { Pagination } from '@/components/ui';
import { useIsMobile } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { Paginate } from '@/types';

interface PaginateProps extends Paginate {
    className?: string;
    only?: string[];
}

export default function Paginator({ className, only, meta, links }: PaginateProps) {
    const isMobile = useIsMobile();
    const routerOptions = { only: only, preserveScroll: true, preserveState: true };
    return (
        <div className={cn('mt-6 flex w-full flex-col-reverse items-center gap-3 pb-6 xl:flex-row xl:justify-between', className)}>
            <div>
                Menampilkan {meta.from} - {meta.to} dari {meta.total}
            </div>
            <div>
                <Pagination>
                    <Pagination.Item routerOptions={routerOptions} slot="first" isDisabled={meta.current_page === 1} href={links.first ?? '#'} />
                    <Pagination.Item routerOptions={routerOptions} slot="previous" isDisabled={meta.current_page === 1} href={links.prev ?? '#'} />
                    {isMobile ? (
                        <Pagination.Label current={meta.current_page} total={meta.last_page} />
                    ) : (
                        meta.links.map(
                            (link) =>
                                link.label.length < 4 && (
                                    <Pagination.Item
                                        routerOptions={routerOptions}
                                        key={link.label}
                                        isCurrent={link.active}
                                        isDisabled={link.url === null || link.active}
                                        href={link.url ?? '#'}
                                    >
                                        {link.label}
                                    </Pagination.Item>
                                ),
                        )
                    )}
                    <Pagination.Item
                        routerOptions={routerOptions}
                        slot="next"
                        isDisabled={meta.current_page === meta.last_page}
                        href={links.next ?? '#'}
                    />
                    <Pagination.Item
                        routerOptions={routerOptions}
                        slot="last"
                        isDisabled={meta.current_page === meta.last_page}
                        href={links.last ?? '#'}
                    />
                </Pagination>
            </div>
        </div>
    );
}
