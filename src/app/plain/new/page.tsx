import path from 'path'
import { promises as fs } from 'fs'
import { z } from 'zod'

import { NewPlainForm } from './new-plain-form'
import { taskSchema } from './new-plain-preview/data/schema'
import { DataTable } from './new-plain-preview/components/data-table'
import { columns } from './new-plain-preview/components/columns'
import { Separator } from '@/components/ui/separator'

async function getTasks() {
  const data = await fs.readFile(
    path.join(
      process.cwd(),
      'src/app/plain/new/new-plain-preview/data/tasks.json',
    ),
  )

  const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}

const NewPlainPage = async () => {
  const tasks = await getTasks()

  return (
    <div className="max-w-6xl space-y-4 mx-auto">
      <NewPlainForm />

      <DataTable data={tasks} columns={columns} />
    </div>
  )
}

export default NewPlainPage
