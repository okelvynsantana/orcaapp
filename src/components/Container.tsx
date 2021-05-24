import { useBudget } from '../context/BudgetContext'
import CardBody from './cardBody'
import PersonalDataForm from './PersonalDataForm'
import ServicesForm from './ServicesForm'

const FormContainer: React.FC = () => {
  const { step } = useBudget()
  return (
    <CardBody>
      <PersonalDataForm />
      {step > 1 && <ServicesForm />}
    </CardBody>
  )
}

export default FormContainer
