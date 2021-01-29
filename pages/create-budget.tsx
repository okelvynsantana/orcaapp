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
import CustomHeader from "../components/header";
import PersonalDataForm from "../components/PersonalDataForm";
import { BudgetProvider } from "../context/BudgetContext";

const createBudget: React.FC = () => {
  return (
    <BudgetProvider>
      <Flex flexDir="column" alignItems="center" justifyContent="center">
        <CustomHeader />
        <Text as="h1" mt="20px" fontWeight="bold" fontSize="36px">
          Criar Orçamento
        </Text>
        <CardBody>
          <PersonalDataForm />
        </CardBody>
      </Flex>
    </BudgetProvider>
  );
};

export default createBudget;
