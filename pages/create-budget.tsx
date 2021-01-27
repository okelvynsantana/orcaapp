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
import CardBody from "./components/cardBody";
import CustomHeader from "./components/header";

const createBudget: React.FC = () => {
  const [constructionName, setConstuctionName] = useState("");
  const [proprietary, setProprietary] = useState("");
  return (
    <Flex flexDir="column" alignItems="center" justifyContent="center">
      <CustomHeader />
      <Text as="h1" mt="20px" fontWeight="bold" fontSize="36px">
        Criar Orçamento
      </Text>
      <CardBody>
        <Flex flexDir="column">
          <Text as="h2" fontWeight="600">
            Detalhes do orçamento
          </Text>

          {/* Form */}
          <Flex
            as="form"
            mt="40px"
            alignItems="center"
            width="100%"
            justifyContent="center"
            border="red 1px solid"
          >
            <FormControl flexDir="column" p="15px">
              <Text as="label">Nome da obra*</Text>
              <Input
                isRequired={true}
                value={constructionName}
                onChange={(e) => setConstuctionName(e.target.value)}
              />
            </FormControl>
            <FormControl p="15" flexDir="column" width="40%">
              <Text as="label">Proprietário</Text>
              <Input
                value={proprietary}
                onChange={(e) => setProprietary(e.target.value)}
              />
              {proprietary}
            </FormControl>
          </Flex>
        </Flex>
      </CardBody>
    </Flex>
  );
};

export default createBudget;
