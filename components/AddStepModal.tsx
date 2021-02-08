// import { AddIcon } from '@chakra-ui/icons'
import {
  Button,
  Flex,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useTheme,
  useToast,
} from '@chakra-ui/react'
import axios from 'axios'
import { shade } from 'polished'
import { useCallback, useState } from 'react'
import { useBudget } from '../context/BudgetContext'

interface RenderServicesModalProps {
  onOpen: () => void
  onClose: () => void
  isOpen: boolean
}

const AddStepModal: React.FC<RenderServicesModalProps> = ({
  onClose,
  isOpen,
}) => {
  const { constructionSteps, setConstructionSteps } = useBudget()
  const [searchService, setSearchService] = useState('')
  const [resultServices, setResultServices] = useState([])
  const [stepName, setStepName] = useState('')
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const theme = useTheme()
  // const { isOpen, onClose } = useDisclosure()

  const onCloseModal = () => {
    onClose()
  }

  const RenderTable = () => {
    return (
      <>
        {!resultServices.length ? (
          <RenderEmptyContent />
        ) : (
          <>
            <Flex w="100%" justifyContent="flex-end" color="#AAA">
              <Text mt="20px" alignSelf="flex-end">
                Dados extraídos da planilha{' '}
                <Link
                  target="_blank"
                  href="https://www.caixa.gov.br/Downloads/sinapi-a-partir-jul-2009-mg/SINAPI_ref_Insumos_Composicoes_MG_122020_NaoDesonerado.zip"
                >
                  SINAPI_ref_Insumos_Composicoes_MG_122020_NaoDesonerado
                </Link>
              </Text>
            </Flex>
            <Table variant="simple" flexDir="row" marginTop="25px">
              <Thead>
                <Tr>
                  <Th>Código</Th>
                  <Th>Serviço</Th>
                  <Th>UND</Th>
                  <Th>COEF</Th>
                  <Th>QTD</Th>
                  <Th>Preço Unitário</Th>
                </Tr>
              </Thead>
              <Tbody>
                {resultServices.map(result => (
                  <Tr key={result.compositionCode}>
                    <Td>{result.compositionCode}</Td>
                    <Td maxW="100px" textOverflow="ellipsis" overflow="hidden">
                      {result.compositionDescription}
                    </Td>
                    <Td>{result.und}</Td>
                    <Td>{result.coef}</Td>
                    <Td>
                      <Input maxW="50px" type="number"></Input>
                    </Td>
                    <Td>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(result.price)}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </>
        )}
      </>
    )
  }

  const RenderLoading = () => {
    return (
      <Flex
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        mt="100px"
      >
        <Spinner color="#AAA" size="xl" />
        <Text color="#AAA" fontSize="24px">
          Carregando ...
        </Text>
      </Flex>
    )
  }
  const RenderEmptyContent = () => {
    return (
      <Flex
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        mt="100px"
      >
        <Text color="#AAA" fontSize="24px">
          {searchService.length
            ? 'Não há resultados para o termo pesquisado, tente com outro termo'
            : 'Digite algo para Pesquisar'}
        </Text>
      </Flex>
    )
  }
  const onChangeHandler = useCallback(async (e: any) => {
    setLoading(true)
    setSearchService(e.target.value)
    const result = await axios.get(
      `/api/SearchProducts?searchTerm=${e.target.value}`
    )
    setResultServices(result.data)
    setLoading(false)
  }, [])
  const handleAddNewStep = useCallback(() => {
    setConstructionSteps([
      ...constructionSteps,
      {
        stepName: stepName,
        services: [],
      },
    ])
    setStepName('')
    setSearchService('')
    setResultServices([])
    onCloseModal()
    toast({
      title: 'Sucesso!',
      description: 'Etapa adicionada com sucesso',
      isClosable: true,
      status: 'success',
      duration: 3000,
      position: 'bottom-right',
    })
  }, [stepName])
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseModal}
      size="full"
      motionPreset="scale"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent padding="30px">
        <ModalHeader>
          <Flex justifyContent="space-between">
            <Text>
              {stepName ? `Etapa: ${stepName}` : 'Adicionar nova etapa'}
            </Text>
            <Button
              background="brand.primary"
              color="#FFF"
              _hover={{ background: shade(0.2, theme.colors.brand.primary) }}
              transition="brackground, 0.2s"
              onClick={handleAddNewStep}
            >
              Salvar Etapa
            </Button>
          </Flex>
        </ModalHeader>
        <ModalCloseButton borderRadius="full" />
        <ModalBody>
          <Flex>
            <Input
              placeholder="Insira o nome da etapa"
              value={stepName}
              onChange={(e: any) => {
                setStepName(e.target.value)
              }}
            />
          </Flex>
          <Text mt="25px" fontWeight="600">
            Pesquisar Serviços
          </Text>
          <Flex mt="25px" width="70%" flexDir="column">
            <Input
              placeholder="Digite o nome do serviço"
              value={searchService}
              onChange={e => onChangeHandler(e)}
            />
          </Flex>
          {loading ? <RenderLoading /> : <RenderTable />}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default AddStepModal
