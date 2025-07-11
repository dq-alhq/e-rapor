import { type ReactNode, createContext, use } from 'react'

import { IconChevronRight, IconDot, IconMinus, IconSlash } from 'hq-icons'
import type { BreadcrumbProps, BreadcrumbsProps, LinkProps } from 'react-aria-components'
import { Breadcrumb, Link, Breadcrumbs as RACBreadcrumbs, composeRenderProps } from 'react-aria-components'

import { cn } from '@/lib/utils'

type BreadcrumbsContextProps = {
    separator?: 'chevron' | 'slash' | 'dash' | 'dot'
}

const BreadcrumbsContext = createContext<BreadcrumbsContextProps>({
    separator: 'chevron'
})

const Breadcrumbs = <T extends object>({ className, ...props }: BreadcrumbsProps<T> & BreadcrumbsContextProps) => {
    return (
        <BreadcrumbsContext.Provider value={{ separator: props.separator }}>
            <RACBreadcrumbs
                {...props}
                className={cn('flex items-center gap-1.5 **:data-[slot=icon]:size-3.5', className)}
            />
        </BreadcrumbsContext.Provider>
    )
}

interface BreadcrumbsItemProps extends BreadcrumbProps, Pick<LinkProps, 'href'> {
    href?: string
}

const BreadcrumbsItem = ({ href, className, ...props }: BreadcrumbsItemProps) => {
    const { separator } = use(BreadcrumbsContext)

    return (
        <Breadcrumb
            {...props}
            className={composeRenderProps(className, (className) =>
                cn('inline-flex items-center gap-2 text-muted-fg text-sm data-current:text-fg', className)
            )}
        >
            {(values) => (
                <>
                    {href ? (
                        <Link
                            href={href}
                            className='inline-flex items-center gap-2 transition-colors hover:text-fg'
                            {...props}
                        />
                    ) : (
                        (props.children as ReactNode)
                    )}
                    {!values.isCurrent && <Separator separator={separator} />}
                </>
            )}
        </Breadcrumb>
    )
}

const Separator = ({ separator = 'chevron' }: { separator?: BreadcrumbsContextProps['separator'] }) => {
    return (
        <span className='select-none *:text-muted-fg'>
            {separator === 'chevron' && <IconChevronRight />}
            {separator === 'slash' && <IconSlash />}
            {separator === 'dash' && <IconMinus />}
            {separator === 'dot' && <IconDot />}
        </span>
    )
}

Breadcrumbs.Item = BreadcrumbsItem

export { Breadcrumbs }
