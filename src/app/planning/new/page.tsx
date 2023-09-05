import path from 'path'
import { promises as fs } from 'fs'
import { z } from 'zod'

import { NewPlainForm } from './new-planning-form'
import { taskSchema } from './new-planning-preview/data/schema'
import { DataTable } from './new-planning-preview/components/data-table'
import { columns } from './new-planning-preview/components/columns'

async function getTasks() {
  const data = await fs.readFile(
    path.join(
      process.cwd(),
      'src/app/plain/new/new-planning-preview/data/tasks.json',
    ),
  )

  const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}

const NewPlainPage = async () => {
  const tasks = await getTasks()

  return (
    <div className="max-w-app space-y-4 mx-auto px-4">
      <NewPlainForm />

      <DataTable data={tasks} columns={columns} />
    </div>
  )
}

export default NewPlainPage
