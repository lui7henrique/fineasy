import { ModeToggle } from '@/components/mode-toggle'
import { DollarSign } from 'lucide-react'
import Link from 'next/link'

export const Header = () => {
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

        <ModeToggle />
      </div>
    </header>
  )
}
