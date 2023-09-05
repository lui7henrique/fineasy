import { ModeToggle } from '@/components/mode-toggle'
import { DollarSign } from 'lucide-react'

export const Header = () => {
  return (
    <header className="border-b p-4 w-full">
      <div className="max-w-6xl flex justify-between items-center w-full mx-auto">
        <div className="flex items-center gap-2">
          <div className="p-1 flex items-center rounded-sm bg-primary">
            <DollarSign className="stroke-background" width={24} height={24} />
          </div>

          {/* <h1 className="font-bold text-md text-foreground">Investy</h1> */}
        </div>

        <ModeToggle />
      </div>
    </header>
  )
}
