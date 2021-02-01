import {
  Flex,
  FormControl,
  Grid,
  Input,
  InputGroup,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import CardBody from "../components/cardBody";
import FormContainer from "../components/Container";
import CustomHeader from "../components/header";
import PersonalDataForm from "../components/PersonalDataForm";
import ServicesForm from "../components/servicesForm";
import { BudgetProvider, useBudget } from "../context/BudgetContext";

const createBudget: React.FC = () => {
  const { step, basicData } = useBudget();

  const currentStep = step;
  return (
    <BudgetProvider>
      <Flex flexDir="column" alignItems="center" justifyContent="center">
        <CustomHeader />
        <Text as="h1" mt="20px" fontWeight="bold" fontSize="36px">
          Criar Orçamento
        </Text>
        <FormContainer />
      </Flex>
    </BudgetProvider>
  );
};

export default createBudget;
