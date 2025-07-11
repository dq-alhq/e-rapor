import type { Ref } from 'react'
import { ProgressBar, type ProgressBarProps, composeRenderProps } from 'react-aria-components'

import { cn } from '@/lib/utils'
import { Label } from './form'

interface ProgressProps extends ProgressBarProps {
    label?: string
    ref?: Ref<HTMLDivElement>
    circle?: boolean
    variant?: 'primary' | 'secondary' | 'danger' | 'dark'
}

const Progress = ({ label, ref, circle, variant = 'primary', className, ...props }: ProgressProps) => {
    return (
        <>
            <style>
                {
                    '@keyframes indeterminate { from { transform: translateX(-100%); } to { transform: translateX(250px); } }'
                }
            </style>
            <ProgressBar
                ref={ref}
                className={composeRenderProps(className, (className) => cn('flex flex-col gap-y-1.5', className))}
                {...props}
            >
                {({ percentage, valueText, isIndeterminate }) => (
                    <>
                        {circle ? (
                            <svg
                                aria-label={label ?? 'Progress'}
                                className={cn(
                                    'size-20 shrink-0',
                                    `text-${variant === 'dark' ? 'fg' : variant}`,
                                    className
                                )}
                                viewBox='0 0 32 32'
                                fill='none'
                            >
                                <circle
                                    cx='50%'
                                    cy='50%'
                                    r='calc(50% - 2px)'
                                    strokeWidth={3}
                                    stroke='currentColor'
                                    strokeOpacity={0.25}
                                />
                                <circle
                                    cx='50%'
                                    cy='50%'
                                    r='calc(50% - 2px)'
                                    strokeWidth={3}
                                    stroke='currentColor'
                                    pathLength={100}
                                    strokeDasharray='100 200'
                                    strokeDashoffset={100 - (percentage ?? 30)}
                                    strokeLinecap='round'
                                    style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                                    className={cn(
                                        'origin-center',
                                        isIndeterminate
                                            ? 'animate-[spin_1s_cubic-bezier(0.4,_0,_0.2,_1)_infinite]'
                                            : '-rotate-90'
                                    )}
                                />
                                {!isIndeterminate && (
                                    <text
                                        x='50%'
                                        y='50%'
                                        textAnchor='middle'
                                        dy='.35em'
                                        fontSize='calc(50% + 1px)'
                                        className='fill-current'
                                    >
                                        {valueText}
                                    </text>
                                )}
                            </svg>
                        ) : (
                            <>
                                <div className='flex justify-between gap-2'>
                                    {label && <Label>{label}</Label>}
                                    {valueText && (
                                        <span className='text-muted-fg text-sm tabular-nums'>{valueText}</span>
                                    )}
                                </div>
                                <div className='relative h-2 min-w-64 overflow-hidden rounded-lg bg-muted outline-hidden'>
                                    <div
                                        style={{
                                            width: `${percentage}%`,
                                            animation: isIndeterminate
                                                ? 'indeterminate 1.5s infinite ease-in-out'
                                                : 'none',
                                            transition: 'width 0.1s linear'
                                        }}
                                        className={cn(
                                            'absolute top-0 left-0 h-full rounded-full transition',
                                            variant === 'primary' && 'bg-primary',
                                            variant === 'secondary' && 'bg-secondary',
                                            variant === 'danger' && 'bg-danger',
                                            variant === 'dark' && 'bg-fg',
                                            isIndeterminate && 'w-[120px]'
                                        )}
                                    />
                                </div>
                            </>
                        )}
                    </>
                )}
            </ProgressBar>
        </>
    )
}

export { Progress }
