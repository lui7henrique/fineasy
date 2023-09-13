import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'

import {
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { cn } from '@/lib/utils'

export default function Home() {
  return (
    <div className="max-w-app mx-auto py-12 flex flex-col justify-center p-4">
      <div className="max-w-[830px]">
        <Link
          href="/docs/changelog"
          className="inline-flex items-center rounded-lg bg-foreground/5 px-3 py-1.5 text-sm font-medium mb-4"
        >
          📊 <Separator className="mx-2 h-4" orientation="vertical" />{' '}
          <span className="sm:hidden">
            Gerenciamento e planejamento financeiro!
          </span>
          <span className="hidden sm:inline">
            Gerenciamento e planejamento financeiro!
          </span>
          <ArrowRightIcon className="ml-1 h-4 w-4" />
        </Link>

        <PageHeaderHeading className="mb-4">
          Gerencie suas finanças com facilidade.
        </PageHeaderHeading>

        <PageHeaderDescription className="mb-4">
          Descubra o Fineasy, a aplicação de gerenciamento e planejamento
          financeiro que vai revolucionar a forma como você lida com seu
          dinheiro. Simples de usar. Flexível. Seguro.
        </PageHeaderDescription>

        <div className="flex w-full items-center space-x-4 pb-8 pt-4 md:pb-10">
          <Link
            href="/planning/new"
            className={cn(buttonVariants({ size: 'lg' }))}
          >
            Crie um planejamento
          </Link>
          {/* <Link
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants({ variant: 'outline' }))}
        >
          <Icons.gitHub className="mr-2 h-4 w-4" />
          GitHub
        </Link> */}
        </div>
      </div>
    </div>
  )
}
