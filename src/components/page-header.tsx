import Balance from 'react-wrap-balancer'

import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

function PageHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <section
      className={cn(
        'flex max-w-[980px] flex-col items-start gap-2 px-4 pt-8 md:pt-12',
        className,
      )}
      {...props}
    />
  )
}

function PageHeaderHeading({ className, ...props }: ComponentProps<'h1'>) {
  return (
    <h1
      className={cn(
        'text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.2]',
        className,
      )}
      {...props}
    />
  )
}

function PageHeaderDescription({ className, ...props }: ComponentProps<'p'>) {
  return (
    <Balance
      className={cn(
        'max-w-[750px] text-lg text-muted-foreground sm:text-xl/8',
        className,
      )}
      {...props}
    />
  )
}

export { PageHeader, PageHeaderHeading, PageHeaderDescription }
