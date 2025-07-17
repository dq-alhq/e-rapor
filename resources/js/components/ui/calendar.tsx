import { type ComponentPropsWithRef, use } from 'react'

import { type CalendarDate, getLocalTimeZone, today } from '@internationalized/date'
import { useDateFormatter } from '@react-aria/i18n'
import { IconChevronLeft, IconChevronRight } from 'hq-icons'
import type { CalendarProps, CalendarState, DateValue, RangeCalendarProps } from 'react-aria-components'
import {
    Button,
    CalendarCell,
    CalendarGrid,
    CalendarGridBody,
    CalendarHeaderCell,
    CalendarStateContext,
    Heading,
    Calendar as RACCalendar,
    CalendarGridHeader as RACCalendarGridHeader,
    RangeCalendar as RACRangeCalendar,
    useLocale
} from 'react-aria-components'

import { cn } from '@/lib/utils'
import { Menu } from './menu'

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
            <CalendarHeader isRange />
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

const CalendarHeader = ({ className, isRange, ...props }: ComponentPropsWithRef<'header'> & { isRange?: boolean }) => {
    const { direction } = useLocale()
    const state = use(CalendarStateContext)!

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
            {isRange ? (
                <Heading className='font-normal text-sm' />
            ) : (
                <div className='flex items-center'>
                    <SelectMonth state={state} />
                    <SelectYear state={state} />
                </div>
            )}
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

const SelectMonth = ({ state }: { state: CalendarState }) => {
    const months = []

    const formatter = useDateFormatter({
        month: 'long',
        timeZone: state.timeZone
    })

    const numMonths = state.focusedDate.calendar.getMonthsInYear(state.focusedDate)
    for (let i = 1; i <= numMonths; i++) {
        const date = state.focusedDate.set({ month: i })
        months.push(formatter.format(date.toDate(state.timeZone)))
    }
    const selectedMonth = state.focusedDate.month

    return (
        <Menu aria-label='Select month'>
            <Menu.Trigger className='p-0.5 text-sm outline-primary' slot={null}>
                {months[selectedMonth - 1]}
            </Menu.Trigger>
            <Menu.Content
                selectionMode='single'
                selectedKeys={[selectedMonth]}
                onSelectionChange={(v) => state.setFocusedDate(state.focusedDate.set({ month: Number([...v][0]) }))}
                items={months.map((month, i) => ({ id: i + 1, textValue: month }))}
            >
                {(item) => (
                    <Menu.Item key={item.id} id={item.id} textValue={item.textValue}>
                        <Menu.Label>{item.textValue}</Menu.Label>
                    </Menu.Item>
                )}
            </Menu.Content>
        </Menu>
    )
}

const SelectYear = ({ state }: { state: CalendarState }) => {
    const years: { value: CalendarDate; formatted: string }[] = []
    const formatter = useDateFormatter({
        year: 'numeric',
        timeZone: state.timeZone
    })

    for (let i = -20; i <= 20; i++) {
        const date = state.focusedDate.add({ years: i })
        years.push({
            value: date,
            formatted: formatter.format(date.toDate(state.timeZone))
        })
    }

    const selectedYear = state.focusedDate.year

    return (
        <Menu>
            <Menu.Trigger className='p-0.5 text-sm outline-primary' slot={null}>
                {years[selectedYear - years[0].value.year].formatted}
            </Menu.Trigger>
            <Menu.Content
                aria-label='Select year'
                selectedKeys={[20]}
                selectionMode='single'
                onSelectionChange={(value) => {
                    state.setFocusedDate(state.focusedDate.set({ year: years[Number([...value][0])].value.year }))
                }}
                items={years.map((year, i) => ({ id: i, textValue: year.formatted }))}
            >
                {(item) => (
                    <Menu.Item key={item.id} id={item.id} textValue={item.textValue}>
                        <Menu.Label>{item.textValue}</Menu.Label>
                    </Menu.Item>
                )}
            </Menu.Content>
        </Menu>
    )
}

export { Calendar, RangeCalendar }
