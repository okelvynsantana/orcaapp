import {
  Button,
  Flex,
  FormControl,
  Input,
  SimpleGrid,
  Text,
  useTheme,
} from "@chakra-ui/react";
import { Formik, FormikHelpers } from "formik";
import { shade } from "polished";
import { useCallback, useState } from "react";
import { useBudget } from "../context/BudgetContext";

interface IFormData {
  constructionName: string;
  proprietary: string;
  address: string;
  technicalManager: string;
  bdi: number;
}

const PersonalDataForm: React.FC = () => {
  const { setBasicData, basicData, setStep, step } = useBudget();
  const theme = useTheme();
  const [inEdit, setInEdit] = useState(true);

  const formData: IFormData = {
    constructionName: "",
    proprietary: "",
    address: "",
    technicalManager: "",
    bdi: 0,
  };

  const handleEdit = useCallback(() => {
    setInEdit(true);
  }, []);

  const onSubmit = (values: IFormData, {}: FormikHelpers<IFormData>) => {
    setInEdit(false);
    setBasicData(values);
    setStep(2);
    console.log({ basicData });
  };
  return (
    <Flex width="100%">
      <Formik
        initialValues={formData}
        onSubmit={onSubmit}
        render={({ values, handleChange, handleSubmit }) => (
          <Flex as="form" onSubmit={handleSubmit} flexDir="column" width="100%">
            <Text fontSize="24px" marginTop="10px">
              Dados Pessoais
            </Text>
            <SimpleGrid
              columns={2}
              columnGap="15px"
              marginTop="25px"
              rowGap="25px"
            >
              <Flex flexDir="column" width="100%">
                <Text as="label">Nome da obra*</Text>
                <Input
                  disabled={!inEdit}
                  name="constructionName"
                  value={values.constructionName}
                  onChange={handleChange}
                />
              </Flex>
              <Flex flexDir="column">
                <Text as="label">Proprietário*</Text>
                <Input
                  disabled={!inEdit}
                  name="proprietary"
                  value={values.proprietary}
                  onChange={handleChange}
                />
              </Flex>
            </SimpleGrid>
            <Flex flexDir="column" mt="25px">
              <Text as="label">Endereço*</Text>
              <Input
                disabled={!inEdit}
                name="address"
                value={values.address}
                onChange={handleChange}
              />
            </Flex>
            <SimpleGrid
              columns={2}
              columnGap="15px"
              marginTop="25px"
              rowGap="25px"
            >
              <Flex flexDir="column" width="100%">
                <Text as="label">Responsável Técnico*</Text>
                <Input
                  disabled={!inEdit}
                  name="technicalManager"
                  value={values.technicalManager}
                  onChange={handleChange}
                />
              </Flex>
              <Flex flexDir="column">
                <Text as="label">BDI em %*</Text>
                <Input
                  disabled={!inEdit}
                  name="bdi"
                  value={values.bdi}
                  onChange={handleChange}
                  type="number"
                />
              </Flex>
            </SimpleGrid>
            <SimpleGrid
              columns={2}
              columnGap="20px"
              marginTop="25px"
              alignSelf="flex-end"
            >
              <Button
                type="button"
                isDisabled={inEdit}
                onClick={handleEdit}
                color="#000"
                bg="#c4c4c4"
                _hover={{
                  background: shade(0.2, "#c4c4c4"),
                }}
              >
                Editar
              </Button>

              <Button
                type="submit"
                isDisabled={!inEdit}
                color="#FFF"
                bg="brand.primary"
                _hover={{
                  background: shade(0.2, theme.colors.brand.primary),
                }}
              >
                Salvar
              </Button>
            </SimpleGrid>
          </Flex>
        )}
      />
    </Flex>
  );
};

export default PersonalDataForm;
