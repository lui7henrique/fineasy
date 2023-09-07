import { getCdiRate } from 'selic'
import { NewPlanningForm } from './new-planning-form'

const NewPlainPage = async () => {
  const cdiRate = await getCdiRate()

  return <NewPlanningForm cdiRate={cdiRate} />
}

export default NewPlainPage
