import { ComponentProps } from 'react'
import Balance from 'react-wrap-balancer'

import { cn } from '@/lib/utils'

const PageHeader = ({ className, ...props }: ComponentProps<'section'>) => (
  <section
    className={cn(
      'flex max-w-[980px] flex-col items-start gap-2 px-4 pt-8 md:pt-12',
      className,
    )}
    {...props}
  />
)

const PageHeaderHeading = ({
  className,
  ...props
}: ComponentProps<'h1'>) => (
  <h1
    className={cn(
      'text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]',
      className,
    )}
    {...props}
  />
)

const PageHeaderDescription = Balance

export { PageHeader, PageHeaderHeading, PageHeaderDescription }
