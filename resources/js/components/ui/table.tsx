import { IconChevronDown, IconMenu } from 'hq-icons'
import { type ReactNode, type Ref, createContext, useContext } from 'react'
import type {
    CellProps,
    ColumnProps,
    ColumnResizerProps,
    TableHeaderProps as HeaderProps,
    TableProps as RACTableProps,
    RowProps,
    TableBodyProps
} from 'react-aria-components'
import {
    Button,
    Cell,
    Collection,
    Column,
    ColumnResizer as RACColumnResizer,
    Table as RACTable,
    TableBody as RACTableBody,
    TableHeader as RACTableHeader,
    ResizableTableContainer,
    Row,
    composeRenderProps,
    useTableOptions
} from 'react-aria-components'

import { cn } from '@/lib/utils'
import { Checkbox } from './checkbox'

interface TableProps extends RACTableProps {
    className?: string
    allowResize?: boolean
}

const TableContext = createContext<TableProps>({
    allowResize: false
})

const useTableContext = () => useContext(TableContext)

const Table = ({ className, ...props }: TableProps) => {
    const renderTable = (
        <RACTable
            className={cn('w-full min-w-full caption-bottom border-spacing-0 text-sm outline-hidden', className)}
            {...props}
        />
    )
    return (
        <TableContext.Provider value={props}>
            <div slot='table' className='relative w-full overflow-auto rounded-lg border'>
                {props.allowResize ? (
                    <ResizableTableContainer className='overflow-auto'>{renderTable}</ResizableTableContainer>
                ) : (
                    renderTable
                )}
            </div>
        </TableContext.Provider>
    )
}

interface TableHeaderProps<T extends object> extends HeaderProps<T> {
    className?: string
    ref?: Ref<HTMLTableSectionElement>
}

const TableHeader = <T extends object>({ children, ref, className, columns, ...props }: TableHeaderProps<T>) => {
    const { selectionBehavior, selectionMode, allowsDragging } = useTableOptions()
    return (
        <RACTableHeader ref={ref} className={cn('border-b bg-primary/10 text-fg', className)} {...props}>
            {allowsDragging && <Column className='w-0' />}
            {selectionBehavior === 'toggle' && (
                <Column className='w-0 pl-4'>{selectionMode === 'multiple' && <Checkbox slot='selection' />}</Column>
            )}
            <Collection items={columns}>{children}</Collection>
        </RACTableHeader>
    )
}

const ColumnResizer = ({ className, ...props }: ColumnResizerProps) => (
    <RACColumnResizer
        {...props}
        className={composeRenderProps(className, (className, { isResizing, resizableDirection }) =>
            cn(
                'absolute top-0 right-0 bottom-0 w-px touch-none px-1.5',
                resizableDirection === 'left' && 'cursor-w-resize',
                resizableDirection === 'right' && 'cursor-e-resize',
                resizableDirection === 'both' && 'cursor-ew-resize',
                isResizing ? '*:bg-primary' : '*:bg-muted',
                className
            )
        )}
    >
        <div className='h-full w-px' />
    </RACColumnResizer>
)

const TableBody = <T extends object>(props: TableBodyProps<T>) => (
    <RACTableBody
        {...props}
        className={cn(
            '**:data-drop-target:py-2 **:data-drop-target:outline **:data-drop-target:outline-primary',
            props.className
        )}
    />
)

interface TableCellProps extends CellProps {
    className?: string
}

const TableCell = ({ children, className, ...props }: TableCellProps) => {
    const { allowResize } = useTableContext()
    return (
        <Cell
            {...props}
            className={composeRenderProps(className, (className) =>
                cn(
                    'group whitespace-nowrap px-3 py-3 outline-hidden',
                    'first:pl-6 last:pr-6',
                    allowResize && 'overflow-hidden truncate',
                    className
                )
            )}
        >
            {children}
        </Cell>
    )
}

interface TableColumnProps extends ColumnProps {
    className?: string
    isResizable?: boolean
}

const TableColumn = ({ isResizable = false, className, ...props }: TableColumnProps) => {
    return (
        <Column
            {...props}
            className={composeRenderProps(className, (className, { isResizing, allowsSorting }) =>
                cn(
                    'relative whitespace-nowrap p-3 text-left font-medium outline-hidden first:pl-6 last:pr-6 **:has-[slot=selection]:pr-0',
                    isResizable && 'overflow-hidden truncate',
                    isResizing && 'cursor-grabbing',
                    allowsSorting && 'cursor-pointer',
                    className
                )
            )}
        >
            {({ allowsSorting, sortDirection, isHovered }) => (
                <div className='flex items-center gap-2'>
                    <>
                        {props.children as ReactNode}
                        {allowsSorting && (
                            <IconChevronDown
                                className={cn(
                                    'size-3.5 shrink-0 text-muted-fg transition-transform',
                                    sortDirection === 'ascending' ? '-rotate-180' : '',
                                    isHovered && 'text-primary'
                                )}
                            />
                        )}
                        {isResizable && <ColumnResizer />}
                    </>
                </div>
            )}
        </Column>
    )
}

interface TableRowProps<T extends object> extends RowProps<T> {
    className?: string
    ref?: Ref<HTMLTableRowElement>
}

const TableRow = <T extends object>({ children, className, columns, id, ref, ...props }: TableRowProps<T>) => {
    const { selectionBehavior, allowsDragging } = useTableOptions()
    return (
        <Row
            ref={ref}
            id={id}
            className={composeRenderProps(
                className,
                (className, { isSelected, isHovered, isFocusVisible, isDisabled, isFocusVisibleWithin }) =>
                    cn(
                        'group relative cursor-default not-last:border-b',
                        'href' in props && 'cursor-pointer',
                        isSelected && 'bg-primary/15 text-primary',
                        isHovered && 'bg-primary/10 text-primary',
                        {
                            'bg-primary/15 text-primary outline outline-primary': isFocusVisible || isFocusVisibleWithin
                        },
                        isDisabled && 'pointer-events-none opacity-50',
                        className
                    )
            )}
            {...props}
        >
            {allowsDragging && (
                <Cell className='cursor-grab pr-0 outline-primary data-dragging:cursor-grabbing'>
                    <Button className='py-1.5 pl-3.5' slot='drag'>
                        <IconMenu />
                    </Button>
                </Cell>
            )}
            {selectionBehavior === 'toggle' && (
                <Cell className='pl-4'>
                    <span
                        aria-hidden
                        className='absolute inset-y-0 left-0 hidden h-full w-0.5 bg-primary/70 group-selected:block'
                    />
                    <Checkbox slot='selection' />
                </Cell>
            )}
            <Collection items={columns}>{children}</Collection>
        </Row>
    )
}

Table.Body = TableBody
Table.Cell = TableCell
Table.Column = TableColumn
Table.Header = TableHeader
Table.Row = TableRow

export { Table }
export type { TableBodyProps, TableCellProps, TableColumnProps, TableProps, TableRowProps }
