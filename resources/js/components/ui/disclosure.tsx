import { type Ref, use, useRef } from 'react'

import { IconChevronDown } from 'hq-icons'
import {
    type ButtonProps,
    type DisclosurePanelProps,
    DisclosureStateContext,
    type DisclosureGroupProps as RACDisclosureGroupProps,
    type DisclosureProps as RACDisclosureProps
} from 'react-aria-components'
import {
    Button,
    Disclosure as RACDisclosure,
    DisclosureGroup as RACDisclosureGroup,
    DisclosurePanel as RACDisclosurePanel,
    composeRenderProps
} from 'react-aria-components'

import { cn } from '@/lib/utils'

interface AccordionProps extends RACDisclosureGroupProps {
    ref?: Ref<HTMLDivElement>
    hideIndicator?: boolean
}
const DisclosureGroup = ({ children, ref, className, ...props }: AccordionProps) => {
    return (
        <RACDisclosureGroup
            ref={ref}
            data-slot='disclosure-group'
            {...props}
            className={composeRenderProps(className, (className, { isDisabled }) =>
                cn(
                    'space-y-1',
                    props.hideIndicator && '**:data-[slot=indicator]:text-transparent',
                    isDisabled ? 'cursor-default opacity-50' : 'cursor-pointer',
                    className
                )
            )}
        >
            {(values) => <>{typeof children === 'function' ? children(values) : children}</>}
        </RACDisclosureGroup>
    )
}

interface CollapsibleProps extends RACDisclosureProps {
    ref?: Ref<HTMLDivElement>
}
const Disclosure = ({ className, ref, children, ...props }: CollapsibleProps) => {
    return (
        <RACDisclosure
            ref={ref}
            data-slot='disclosure'
            {...props}
            className={composeRenderProps(className, (className, { isDisabled }) =>
                cn(
                    'group w-full border-b last:border-b-0',
                    isDisabled ? 'cursor-default opacity-50' : 'cursor-pointer',
                    className
                )
            )}
        >
            {(values) => (typeof children === 'function' ? children(values) : children)}
        </RACDisclosure>
    )
}

interface DisclosureTriggerProps extends ButtonProps {
    ref?: Ref<HTMLButtonElement>
}
const DisclosureTrigger = ({ className, children, ref, ...props }: DisclosureTriggerProps) => {
    return (
        <Button
            ref={ref}
            slot='trigger'
            className={composeRenderProps(className, (className) =>
                cn(
                    'flex w-full flex-1 items-start justify-between gap-4 rounded-md py-4 text-left font-medium text-sm outline-none transition-all',
                    'aria-expanded:**:data-[slot=indicator]:rotate-180 **:[svg]:size-4 **:[svg]:shrink-0',
                    'focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-ring',
                    'disabled:cursor-default disabled:opacity-50',
                    className
                )
            )}
            {...props}
        >
            {(values) => (
                <>
                    {typeof children === 'function' ? children(values) : children}
                    <IconChevronDown data-slot='indicator' className='text-muted-fg transition-transform' />
                </>
            )}
        </Button>
    )
}
const DisclosurePanel = ({ className, children, ...props }: DisclosurePanelProps) => {
    const { isExpanded } = use(DisclosureStateContext)!
    const contentRef = useRef<HTMLDivElement>(null)
    return (
        <RACDisclosurePanel
            data-slot='disclosure-content'
            style={{
                height: isExpanded ? contentRef?.current?.scrollHeight : 0,
                transition: 'height 0.2s ease-in-out'
            }}
            className={cn('overflow-hidden text-sm')}
            {...props}
        >
            <div ref={contentRef} className={cn('pt-0 pb-4', className)}>
                {children}
            </div>
        </RACDisclosurePanel>
    )
}
const Accordion = (props: AccordionProps) => <DisclosureGroup {...props} />
Accordion.Item = Disclosure
Accordion.Trigger = DisclosureTrigger
Accordion.Content = DisclosurePanel

const Collapsible = (props: CollapsibleProps) => <Disclosure {...props} />
Collapsible.Trigger = DisclosureTrigger
Collapsible.Content = DisclosurePanel

export { Accordion, Collapsible }
