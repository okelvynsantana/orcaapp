import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useCallback, useState } from "react";
import { useBudget } from "../context/BudgetContext";

interface RenderServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddStepModal: React.FC<RenderServicesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { constructionSteps, setConstructionSteps } = useBudget();
  const [searchService, setSearchService] = useState("");
  const [resultServices, setResultServices] = useState([]);
  const [stepName, setStepName] = useState("");

  const handleSearchServices = useCallback(async () => {
    setResultServices([]);
    const result = await axios.get(
      `/api/SearchProducts?searchTerm=${searchService}`
    );
    setResultServices(result.data);
    console.log(resultServices);
    setSearchService("");
  }, [searchService]);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      motionPreset="scale"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent padding="30px" >
        <ModalHeader border="red 1px solid" mt="10px">
          <Text>{stepName ? `Etapa: ${stepName}` : "Adicionar nova etapa"}</Text>
          <Button>Salvar</Button>
        </ModalHeader>
        <ModalCloseButton borderRadius="full" />
        <ModalBody>
          <Flex>
            <Input
              placeholder="Insira o nome da etapa"
              value={stepName}
              onChange={(e: any) => {
                setStepName(e.target.value);
              }}
            />
          </Flex>
          <Text mt="25px" fontWeight="600">
            Pesquisar Serviços
          </Text>
          <Flex mt="25px">
            <Input
              placeholder="Digite o nome do serviço"
              value={searchService}
              onChange={(e) => setSearchService(e.target.value)}
            />
            <Button
              background="brand.primary"
              color="#FFF"
              ml="10px"
              onClick={handleSearchServices}
            >
              Buscar
            </Button>
          </Flex>
          <Table variant="simple" flexDir="row" marginTop="25px">
            <Thead>
              <Tr>
                <Th>Código</Th>
                <Th>Serviço</Th>
                <Th>UND</Th>
                <Th>COEF</Th>
                <Th>QTD</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {resultServices.map((result) => (
                <Tr>
                  <Td>{result.compositionCode}</Td>
                  <Td maxW="100px" textOverflow="ellipsis" overflow="hidden">
                    {result.compositionDescription}
                  </Td>
                  <Td>UND</Td>
                  <Td>COEF</Td>
                  <Td>
                    <Input maxW="50px" type="number"></Input>
                  </Td>
                  <Td>
                    <AddIcon ></AddIcon>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddStepModal;
