import type { ComponentPropsWithRef } from 'react'

import { getLocalTimeZone, today } from '@internationalized/date'
import { IconChevronLeft, IconChevronRight } from 'hq-icons'
import type { CalendarProps, DateValue, RangeCalendarProps } from 'react-aria-components'
import {
    Button,
    CalendarCell,
    CalendarGrid,
    CalendarGridBody,
    CalendarHeaderCell,
    Heading,
    Calendar as RACCalendar,
    CalendarGridHeader as RACCalendarGridHeader,
    RangeCalendar as RACRangeCalendar,
    useLocale
} from 'react-aria-components'

import { cn } from '@/lib/utils'

const Calendar = <T extends DateValue>(props: CalendarProps<T>) => {
    const now = today(getLocalTimeZone())
    return (
        <RACCalendar {...props}>
            <CalendarHeader />
            <CalendarGrid className='w-full **:[td]:px-0 **:[td]:py-[1.5px]'>
                <CalendarGridHeader />
                <CalendarGridBody>
                    {(date) => (
                        <CalendarCell
                            date={date}
                            className={cn([
                                'relative flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg pressed:bg-muted/50 outside-month:text-muted-fg text-sm outline-hidden hover:bg-muted/40',
                                'selected:bg-primary selected:text-primary-fg selected:invalid:bg-danger selected:invalid:text-danger-fg',
                                'focus-visible:ring-2 focus-visible:ring-ring',
                                'disabled:pointer-events-none disabled:opacity-50',
                                date.compare(now) === 0 &&
                                    'after:-translate-x-1/2 after:pointer-events-none after:absolute after:start-1/2 after:bottom-1 after:z-10 after:size-1 after:rounded-full after:bg-primary selected:after:bg-primary-fg'
                            ])}
                        >
                            {date.day}
                        </CalendarCell>
                    )}
                </CalendarGridBody>
            </CalendarGrid>
        </RACCalendar>
    )
}

const RangeCalendar = <T extends DateValue>({ visibleDuration = { months: 1 }, ...props }: RangeCalendarProps<T>) => {
    const now = today(getLocalTimeZone())
    return (
        <RACRangeCalendar visibleDuration={visibleDuration} {...props}>
            <CalendarHeader />
            <div className='grid gap-2 overflow-auto md:flex'>
                {Array.from({ length: visibleDuration?.months ?? 1 }).map((_, index) => {
                    const id = index + 1
                    return (
                        <CalendarGrid
                            key={index}
                            offset={id >= 2 ? { months: id - 1 } : undefined}
                            className='w-full **:[td]:px-0 **:[td]:py-[1.5px] **:[td]:first:*:rounded-s-lg **:[td]:last:*:rounded-e-lg'
                        >
                            <CalendarGridHeader />
                            <CalendarGridBody>
                                {(date) => (
                                    <CalendarCell
                                        date={date}
                                        className={cn([
                                            'relative flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg pressed:bg-muted/50 outside-month:text-muted-fg text-sm outline-hidden hover:bg-muted/40',
                                            'selection-start:bg-primary selection-start:text-primary-fg selection-start:invalid:bg-danger selection-start:invalid:text-danger-fg',
                                            'selection-end:bg-primary selection-end:text-primary-fg selection-end:invalid:bg-danger selection-end:invalid:text-danger-fg',
                                            'selected:rounded-none selected:bg-muted/50 selected:selection-end:rounded-r-lg selected:selection-start:rounded-l-lg',
                                            'focus-visible:ring-2 focus-visible:ring-ring',
                                            'disabled:pointer-events-none disabled:opacity-50',
                                            date.compare(now) === 0 &&
                                                'after:-translate-x-1/2 after:pointer-events-none after:absolute after:start-1/2 after:bottom-1 after:mt-1 after:size-1 after:rounded after:bg-primary selected:selection-end:after:bg-primary-fg selected:selection-start:after:bg-primary-fg'
                                        ])}
                                    >
                                        {date.day}
                                    </CalendarCell>
                                )}
                            </CalendarGridBody>
                        </CalendarGrid>
                    )
                })}
            </div>
        </RACRangeCalendar>
    )
}

const CalendarHeader = ({ className, ...props }: ComponentPropsWithRef<'header'> & { isRange?: boolean }) => {
    const { direction } = useLocale()
    return (
        <header
            slot='calendar-header'
            className={cn('flex w-full items-center justify-between gap-1.5 pt-1 pr-1 pb-5 pl-1.5 sm:pb-4', className)}
            {...props}
        >
            <Button
                className='inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-muted/40 bg-bg pressed:bg-muted/50 text-muted-fg shadow-sm outline-hidden hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring'
                slot='previous'
            >
                {direction === 'rtl' ? <IconChevronRight /> : <IconChevronLeft />}
            </Button>
            <Heading className='font-normal text-sm' />
            <Button
                className='inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-muted/40 bg-bg pressed:bg-muted/50 text-muted-fg shadow-sm outline-hidden hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring'
                slot='next'
            >
                {direction === 'rtl' ? <IconChevronLeft /> : <IconChevronRight />}
            </Button>
        </header>
    )
}

const CalendarGridHeader = () => {
    return (
        <RACCalendarGridHeader>
            {(day) => (
                <CalendarHeaderCell className='pb-2 font-semibold text-muted-fg text-sm sm:px-0 sm:py-0.5 lg:text-xs'>
                    {day}
                </CalendarHeaderCell>
            )}
        </RACCalendarGridHeader>
    )
}

export { Calendar, RangeCalendar }
