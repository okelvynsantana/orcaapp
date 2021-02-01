import { useBudget } from "../context/BudgetContext";
import CardBody from "./cardBody";
import PersonalDataForm from "./PersonalDataForm";
import ServicesForm from "./servicesForm";

const FormContainer: React.FC = () => {
  return (
    <CardBody>
      <PersonalDataForm />
      <ServicesForm />
    </CardBody>
  );
};

export default FormContainer;
