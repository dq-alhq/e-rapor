import { type ReactNode, useCallback, useEffect, useState } from 'react'

import { IconCircleAlert, IconCircleCheck, IconInfo, IconTriangleAlert, IconX } from 'hq-icons'
import type { ToastOptions } from 'react-aria-components'
import {
    Button,
    Text,
    UNSTABLE_ToastContent as ToastContent,
    UNSTABLE_ToastQueue as ToastQueue,
    UNSTABLE_ToastRegion as ToastRegion,
    UNSTABLE_Toast as Toaster
} from 'react-aria-components'

import { cn } from '@/lib/utils'

interface ToastContentProps {
    title: string
    description?: string
    action?: () => void
    actionLabel?: ReactNode
    altAction?: () => void
    altActionLabel?: ReactNode
    type: 'default' | 'success' | 'error' | 'info' | 'warning'
}

const queue = new ToastQueue<ToastContentProps>({
    wrapUpdate(fn) {
        if ('startViewTransition' in document) {
            document.startViewTransition(() => fn())
        } else fn()
    },
    maxVisibleToasts: 5
})

const ToastProvider = () => {
    const [isHovered, setIsHovered] = useState(false)
    return (
        <>
            <style>{`
                    .toast { view-transition-class: toast; }
                    @media screen and (max-width: 768px) {
                        ::view-transition-new(.toast):only-child { animation: slide-down 300ms; }
                        ::view-transition-old(.toast):only-child { animation: slide-up 300ms; } 
                    }
                    @media screen and (min-width: 768px) {
                        ::view-transition-new(.toast):only-child { animation: slide-left 300ms; }
                        ::view-transition-old(.toast):only-child { animation: slide-right 300ms; } 
                    }
                    @keyframes slide-right { to { translate: 100% 0; opacity: 0; } }
                    @keyframes slide-left { from { translate: 100% 0; opacity: 0; } }
                    @keyframes slide-up { to { translate: 0 -100%; opacity: 0; } }
                    @keyframes slide-down { from { translate: 0 -100%; opacity: 0; } }
           `}</style>
            <ToastRegion
                className={cn(
                    'fixed top-0 z-[9999] flex h-fit w-full flex-col-reverse items-center gap-3 p-4 sm:top-auto sm:right-2 sm:bottom-2 sm:w-fit sm:items-end'
                )}
                queue={queue}
            >
                {({ toast }) => (
                    <Toaster
                        style={{
                            viewTransitionName: toast.key
                        }}
                        key={toast.key}
                        toast={toast}
                        className={cn('toast w-full will-change-transform sm:w-fit sm:min-w-xs')}
                    >
                        <div
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            key={toast.key}
                            className={cn('flex flex-col gap-2 rounded-lg border p-4', {
                                'border-green-500/20 bg-[#ecfdf3] text-[#008a2e] **:data-loader:stroke-green-500 dark:bg-[#001f0f] dark:text-[#59f39d]':
                                    toast.content.type === 'success',
                                'border-rose-500/20 bg-[#fff0f0] text-[#e60000] **:data-loader:stroke-rose-500 dark:bg-[#2d0607] dark:text-[#ff9ea1] ':
                                    toast.content.type === 'error',
                                'border-blue-500/30 bg-[#f0f8ff] text-[#0973dc] **:data-loader:stroke-blue-500 dark:bg-[#000d1f] dark:text-[#5896f3]':
                                    toast.content.type === 'info',
                                'border-amber-500/40 bg-[#fffcf0] text-[#dc7609] **:data-loader:stroke-amber-500 dark:bg-[#1d1f00] dark:text-[#f3cf58]':
                                    toast.content.type === 'warning',
                                'bg-bg text-fg': toast.content.type === 'default'
                            })}
                        >
                            <div
                                className={cn('flex items-start gap-2', {
                                    'items-center': !toast.content.description
                                })}
                            >
                                {toast.content.type === 'success' ? (
                                    <IconCircleCheck className='shrink-0' />
                                ) : toast.content.type === 'error' ? (
                                    <IconCircleAlert className='shrink-0' />
                                ) : toast.content.type === 'info' ? (
                                    <IconInfo className='shrink-0' />
                                ) : toast.content.type === 'warning' ? (
                                    <IconTriangleAlert className='shrink-0' />
                                ) : null}
                                <ToastContent className='flex w-full flex-col'>
                                    <Text slot='title' className='font-medium text-sm tracking-tight'>
                                        {toast.content.title}
                                    </Text>
                                    {toast.content.description && (
                                        <Text slot='description' className='text-xs'>
                                            {toast.content.description}
                                        </Text>
                                    )}
                                </ToastContent>
                                <div className='-translate-y-1/2 absolute top-1 right-1 translate-x-1/2'>
                                    <CountdownButton isPaused={isHovered} timeout={toast.timeout} />
                                </div>
                            </div>
                            {(toast.content.action || toast.content.altAction) && (
                                <div className='flex items-center justify-start gap-2'>
                                    {toast.content.action && (
                                        <Button
                                            onPress={toast.content.action}
                                            slot='close'
                                            className={cn(
                                                'flex cursor-pointer items-center justify-center gap-x-1.5 rounded-lg border px-2 py-1 text-sm outline-hidden pressed:brightness-90 backdrop-blur-2xl hover:brightness-80 focus-visible:ring-4 focus-visible:ring-ring *:[svg]:size-3',
                                                {
                                                    'border-green-500 bg-green-500 text-white':
                                                        toast.content.type === 'success',
                                                    'border-rose-500 bg-rose-500 text-white':
                                                        toast.content.type === 'error',
                                                    'border-blue-500 bg-blue-500 text-white':
                                                        toast.content.type === 'info' ||
                                                        toast.content.type === 'default',
                                                    'border-amber-500 bg-amber-500 text-white':
                                                        toast.content.type === 'warning'
                                                }
                                            )}
                                        >
                                            {toast.content.actionLabel || 'Action'}
                                        </Button>
                                    )}
                                    {toast.content.altAction && (
                                        <Button
                                            onPress={toast.content.altAction}
                                            slot='close'
                                            className='flex cursor-pointer items-center justify-center gap-x-1.5 rounded-lg border bg-bg pressed:bg-muted/60 px-2 py-1 text-fg text-sm outline-hidden hover:bg-muted/40 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/20 *:[svg]:size-3'
                                        >
                                            {toast.content.altActionLabel || 'Cancel'}
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    </Toaster>
                )}
            </ToastRegion>
        </>
    )
}

interface TimeoutButtonProps {
    timeout: number | undefined
    isPaused?: boolean
}

const CountdownButton = ({ timeout, isPaused }: TimeoutButtonProps) => {
    const [timeLeft, setTimeLeft] = useState<number>(timeout ? timeout - 100 : -1)
    const radius = 10
    const circumference = 2 * Math.PI * radius

    const calculateProgress = useCallback(() => {
        return timeout && (timeLeft / timeout) * circumference
    }, [timeLeft, timeout, circumference])

    useEffect(() => {
        if (timeLeft <= 0 || isPaused) return

        const timer = setInterval(() => {
            setTimeLeft((prevTimeLeft) => prevTimeLeft - 100)
        }, 100)

        return () => clearInterval(timer)
    }, [isPaused, timeLeft])

    return (
        <Button
            slot='close'
            className='relative z-10 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full bg-bg pressed:text-fg text-muted-fg shadow-sm outline-hidden hover:text-fg focus-visible:ring-2 focus-visible:ring-ring dark:border'
        >
            <IconX className='size-3.5' />
            {timeout ? (
                <svg className='-rotate-90 absolute size-fit'>
                    <circle cx='50%' cy='50%' r={radius} stroke='current' strokeWidth='2' fill='none' />
                    <circle
                        data-loader
                        cx='50%'
                        cy='50%'
                        r={radius}
                        stroke='currentColor'
                        strokeWidth='2'
                        fill='none'
                        strokeDasharray={circumference}
                        style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                        strokeDashoffset={calculateProgress()}
                        strokeLinecap='round'
                    />
                </svg>
            ) : null}
        </Button>
    )
}

const toast = (body: string, content?: Omit<ToastContentProps, 'type' | 'title'>, options?: ToastOptions) =>
    queue.add({ ...content, title: body, type: 'default' }, { ...options, timeout: options?.timeout ?? 3000 })

toast.success = (body: string, content?: Omit<ToastContentProps, 'type' | 'title'>, options?: ToastOptions) =>
    queue.add({ ...content, title: body, type: 'success' }, { ...options, timeout: options?.timeout ?? 3000 })

toast.error = (body: string, content?: Omit<ToastContentProps, 'type' | 'title'>, options?: ToastOptions) =>
    queue.add({ ...content, title: body, type: 'error' }, { ...options, timeout: options?.timeout ?? 3000 })

toast.info = (body: string, content?: Omit<ToastContentProps, 'type' | 'title'>, options?: ToastOptions) =>
    queue.add({ ...content, title: body, type: 'info' }, { ...options, timeout: options?.timeout ?? 3000 })

toast.warning = (body: string, content?: Omit<ToastContentProps, 'type' | 'title'>, options?: ToastOptions) =>
    queue.add({ ...content, title: body, type: 'warning' }, { ...options, timeout: options?.timeout ?? 3000 })

export { toast, ToastProvider }
