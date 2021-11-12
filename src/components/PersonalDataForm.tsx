import {
  Button,
  Flex,
  Input,
  SimpleGrid,
  Text,
  useTheme,
} from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import { shade } from 'polished'
import { useCallback, useState } from 'react'
import { useBudget } from '../context/BudgetContext'

interface IFormData {
  constructionName: string
  proprietary: string
  address: string
  technicalManager: string
  bdi: string
}

const PersonalDataForm: React.FC = () => {
  const { setBasicData, setStep } = useBudget()
  const theme = useTheme()
  const [inEdit, setInEdit] = useState(true)

  const formData: IFormData = {
    constructionName: '',
    proprietary: '',
    address: '',
    technicalManager: '',
    bdi: '0',
  }

  const handleEdit = useCallback(() => {
    setInEdit(true)
  }, [])

  const onSubmit = useCallback(
    (values: IFormData, _: FormikHelpers<IFormData>) => {
      setStep(2)
      setInEdit(false)
      setBasicData({
        ...values,
        bdi: parseFloat(values.bdi.replace(',', '.')),
        totalCoast: 0,
        totalPrice: 0,
      })
    },
    []
  )
  return (
    <Flex width="100%">
      <Formik
        initialValues={formData}
        onSubmit={onSubmit}
        render={({ values, handleChange, handleSubmit }) => (
          <Flex flexDir="column" width="100%">
            <Form onSubmit={handleSubmit}>
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
                    lang="pt-BR"
                    value={values.bdi}
                    onChange={handleChange}
                  />
                </Flex>
              </SimpleGrid>
              <Flex marginTop="25px" justifyContent="flex-end">
                <Button type="button" isDisabled={inEdit} onClick={handleEdit}>
                  Editar
                </Button>

                <Button
                  ml="20px"
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
              </Flex>
            </Form>
          </Flex>
        )}
      />
    </Flex>
  )
}

export default PersonalDataForm
