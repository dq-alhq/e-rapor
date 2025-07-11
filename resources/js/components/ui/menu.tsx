import { IconCheck, IconChevronRight } from 'hq-icons'
import type { CSSProperties, ComponentPropsWithRef } from 'react'
import {
    type ButtonProps,
    type MenuProps,
    type MenuSectionProps,
    type MenuTriggerProps,
    type PopoverProps,
    type MenuItemProps as RACMenuItemProps,
    composeRenderProps
} from 'react-aria-components'
import {
    Button,
    Collection,
    Header,
    PopoverContext,
    Menu as RACMenu,
    MenuItem as RACMenuItem,
    MenuSection as RACMenuSection,
    MenuTrigger as RACMenuTrigger,
    SubmenuTrigger,
    useSlottedContext
} from 'react-aria-components'

import { cn } from '@/lib/utils'
import { ListBoxDetails, ListBoxLabel, ListBoxSeparator, headerStyle, itemStyle, sectionStyle } from './list-box'
import { PopoverContent } from './popover'

const Menu = ({ ...props }: MenuTriggerProps) => <RACMenuTrigger {...props} />

interface MenuContentProps<T>
    extends MenuProps<T>,
        Pick<
            PopoverProps,
            | 'placement'
            | 'offset'
            | 'crossOffset'
            | 'arrowBoundaryOffset'
            | 'triggerRef'
            | 'isOpen'
            | 'onOpenChange'
            | 'shouldFlip'
        > {
    className?: string
    style?: CSSProperties
    respectScreen?: boolean
}

const MenuContent = <T extends object>({ className, respectScreen = true, ...props }: MenuContentProps<T>) => {
    const popoverContext = useSlottedContext(PopoverContext)!
    const isSubmenuTrigger = popoverContext?.trigger === 'SubmenuTrigger'
    const optimalOffset = isSubmenuTrigger ? 0 : 8
    return (
        <PopoverContent
            showArrow={false}
            respectScreen={respectScreen}
            offset={props.offset ?? optimalOffset}
            {...props}
        >
            <RACMenu
                className={cn(
                    'grid max-h-[calc(var(--visual-viewport-height)-10rem)] grid-cols-[auto_1fr_auto] overflow-auto rounded-lg p-1 outline-hidden sm:max-h-[inherit] sm:min-w-40',
                    className
                )}
                {...props}
            />
        </PopoverContent>
    )
}

interface MenuItemProps extends RACMenuItemProps {
    isDanger?: boolean
}

const MenuItem = ({ className, isDanger = false, children, ...props }: MenuItemProps) => {
    const textValue = props.textValue || (typeof children === 'string' ? children : undefined)
    return (
        <RACMenuItem
            className={composeRenderProps(className, (className) =>
                itemStyle({
                    className: cn(
                        isDanger
                            ? 'text-danger **:text-danger open:bg-danger/10 open:text-danger focus:bg-danger/10 focus:text-danger focus:**:text-danger'
                            : 'text-fg',
                        className
                    )
                })
            )}
            textValue={textValue}
            {...props}
        >
            {(values) => (
                <>
                    {values.isSelected && <IconCheck className='mr-2 text-success' data-slot='checked' />}
                    {typeof children === 'function' ? children(values) : children}
                    {values.hasSubmenu && <IconChevronRight data-slot='chevron' className='ml-auto' />}
                </>
            )}
        </RACMenuItem>
    )
}

const MenuHeader = ({ className, ...props }: ComponentPropsWithRef<typeof Header>) => (
    <Header
        className={cn(
            '-mx-1 col-span-full mb-1 touch-none border-b px-2.5 py-2 font-semibold text-base sm:px-3 sm:pb-2.5 sm:text-sm',
            className
        )}
        {...props}
    />
)

const MenuSection = <T extends object>({
    className,
    items,
    children,
    ...props
}: MenuSectionProps<T> & { title?: string }) => {
    return (
        <RACMenuSection className={sectionStyle()} {...props}>
            {'title' in props && <Header className={headerStyle()}>{props.title}</Header>}
            <Collection items={items}>{children}</Collection>
        </RACMenuSection>
    )
}

const MenuTrigger = (props: ButtonProps) => <Button {...props} />

const MenuLabel = ListBoxLabel
const MenuSeparator = ListBoxSeparator
const MenuDetails = ListBoxDetails

Menu.Trigger = MenuTrigger
Menu.Submenu = SubmenuTrigger
Menu.Item = MenuItem
Menu.Content = MenuContent
Menu.Header = MenuHeader
Menu.Section = MenuSection
Menu.Details = MenuDetails
Menu.Label = MenuLabel
Menu.Separator = MenuSeparator

export { Menu, MenuItem, MenuContent, MenuSection, MenuLabel, MenuSeparator, MenuDetails }
export type { MenuContentProps }
