import { IconCheck, IconGripVertical } from 'hq-icons'
import type {
    ListBoxItemProps,
    ListBoxProps,
    ListBoxSectionProps,
    SeparatorProps,
    TextProps
} from 'react-aria-components'
import {
    Collection,
    Header,
    ListBox as RACListBox,
    ListBoxItem as RACListBoxItem,
    ListBoxSection as RACListBoxSection,
    Separator,
    Text,
    composeRenderProps
} from 'react-aria-components'

import { cn } from '@/lib/utils'
import type { ComponentPropsWithRef } from 'react'
import { tv } from 'tailwind-variants'

const listStyles = tv({
    slots: {
        sectionStyle: 'col-span-full mt-2 grid grid-cols-[auto_1fr] text-sm',
        headerStyle: 'pointer-events-none col-span-full px-2 py-1 text-muted-fg text-xs',
        itemStyle: [
            'group relative col-span-full grid grid-cols-subgrid items-center outline-hidden has-data-[slot=item-details]:items-start',
            'select-none rounded-md px-2 py-1.5 text-base sm:text-sm/6',
            '**:data-[slot=icon]:mr-2 **:[svg]:size-3.5 has-data-[slot=item-details]:**:[svg]:my-1',
            '**:data-avatar:*:size-6 **:data-avatar:mr-2 **:data-avatar:size-6 **:data-avatar:shrink-0',
            'focus:bg-ring focus:text-primary focus:*:[.text-muted-fg]:text-primary',
            'hover:bg-ring hover:text-primary hover:*:[.text-muted-fg]:text-primary',
            'selected:**:data-[slot=checked]:mr-2 selected:**:data-[slot=icon]:hidden selected:**:data-avatar:hidden has-data-avatar:selected:**:data-[slot=checked]:ml-1',
            'dragging:cursor-grabbing dragging:outline dragging:outline-primary',
            'disabled:pointer-events-none disabled:opacity-50'
        ]
    }
})

const { sectionStyle, headerStyle, itemStyle } = listStyles()

const ListBox = <T extends object>({ className, ...props }: ListBoxProps<T>) => (
    <RACListBox
        {...props}
        className={composeRenderProps(className, (className) =>
            cn(
                'grid w-full grid-cols-[auto_1fr_auto] gap-y-1 overflow-y-auto rounded-lg border p-1 outline-hidden',
                className
            )
        )}
    />
)

const ListBoxItem = ({ children, className, ...props }: ListBoxItemProps) => {
    const textValue = typeof children === 'string' ? children : undefined

    return (
        <RACListBoxItem
            textValue={textValue}
            {...props}
            className={composeRenderProps(className, (className) =>
                itemStyle({
                    className
                })
            )}
        >
            {(values) => (
                <>
                    {values.allowsDragging && (
                        <IconGripVertical
                            className={cn(
                                'size-4 shrink-0 text-muted-fg transition',
                                values.isDragging && 'text-primary'
                            )}
                        />
                    )}
                    {values.isSelected && <IconCheck className='text-green-500' data-slot='checked' />}
                    {typeof children === 'string' ? (
                        <Text slot='label' className='col-start-2'>
                            {children}
                        </Text>
                    ) : (
                        children
                    )}
                </>
            )}
        </RACListBoxItem>
    )
}

const ListBoxSection = <T extends object>({
    className,
    items,
    children,
    ...props
}: ListBoxSectionProps<T> & { title?: string }) => (
    <RACListBoxSection className={sectionStyle({ className })}>
        {'title' in props && <Header className={headerStyle()}>{props.title}</Header>}
        <Collection items={items}>{children}</Collection>
    </RACListBoxSection>
)

interface ListBoxDetailsProps extends TextProps {
    label?: TextProps['children']
    description?: TextProps['children']
}

const ListBoxDetails = ({ label, description, ...props }: ListBoxDetailsProps) => {
    const { children, title, ...restProps } = props

    return (
        <div data-slot='item-details' className='col-start-2 flex flex-col gap-y-1' {...restProps}>
            {label && (
                <Text slot='label' className='font-medium sm:text-sm'>
                    {label}
                </Text>
            )}
            {description && (
                <Text slot='description' className='text-muted-fg text-xs' {...restProps}>
                    {description}
                </Text>
            )}
            {!title && children}
        </div>
    )
}

const ListBoxSeparator = ({ className, ...props }: SeparatorProps) => (
    <Separator
        orientation='horizontal'
        className={cn('-mx-1 col-span-full my-1 h-px bg-muted', className)}
        {...props}
    />
)

const ListBoxLabel = ({ className, ...props }: ComponentPropsWithRef<typeof Text>) => (
    <Text slot='label' className={cn('col-start-2', className)} {...props} />
)

ListBox.Section = ListBoxSection
ListBox.Details = ListBoxDetails
ListBox.Item = ListBoxItem
ListBox.Separator = ListBoxSeparator
ListBox.Label = ListBoxLabel

export { itemStyle, headerStyle, sectionStyle }
export { ListBox, ListBoxSection, ListBoxDetails, ListBoxItem, ListBoxSeparator, ListBoxLabel }
