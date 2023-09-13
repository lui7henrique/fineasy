import { getCdiRate } from 'selic'
import { NewPlanningForm } from './new-planning-form'

export const revalidate = 3600

const NewPlainPage = async () => {
  const cdiRate = await getCdiRate()

  return <NewPlanningForm cdiRate={cdiRate} />
}

export default NewPlainPage
