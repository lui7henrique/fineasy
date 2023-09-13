'use client'

import { ModeToggle } from '@/components/mode-toggle'
import { DollarSign, LineChart } from 'lucide-react'
import Link from 'next/link'
import { Separator } from './ui/separator'
import { useCdi } from '@/context/cdi/cdi'

export const Header = () => {
  const { cdiRate } = useCdi()

  return (
    <header className="border-b w-full">
      <div className="max-w-app flex justify-between items-center w-full mx-auto p-4">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="p-1 flex items-center rounded-sm bg-primary"
          >
            <DollarSign className="stroke-background" width={24} height={24} />
          </Link>

          {/* <h1 className="font-bold text-md text-foreground">Fineasy</h1> */}
        </div>

        <div className="flex items-center gap-4">
          <div className="inline-flex items-center rounded-lg bg-foreground/5 px-3 py-1.5 text-sm font-medium">
            <LineChart size={14} className="mr-1" />
            CDI
            <Separator className="mx-2 h-4" orientation="vertical" />
            <span className="font-bold"></span> {cdiRate}%
          </div>

          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
