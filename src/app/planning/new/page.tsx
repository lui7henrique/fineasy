import { NewPlanningForm } from './new-planning-form'

export const revalidate = 3600

const NewPlainPage = async () => {
  return (
    <>
      <NewPlanningForm />
    </>
  )
}

export default NewPlainPage
