import { AddIcon, MinusIcon } from '@chakra-ui/icons'
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
interface IItems {
  itemCode: string
  itemDescription: string
  und: string
  coef: number
  price: number
}

interface IComposition {
  _id: string
  compositionCode: string
  coef: number
  price: number
  und: string
  // qtd: number
  items: IItems[]
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
  const [compositions, setCompositions] = useState([])
  const toast = useToast()
  const theme = useTheme()

  const onCloseModal = () => {
    onClose()
  }

  const getQuantity = (compositionCode: string) => {
    const existInCompositions = compositions.find(
      c => c._id === compositionCode
    )
    if (!existInCompositions) {
      return 0
    }

    return existInCompositions.qtd
  }
  const handleAddCompositionToStep = useCallback(
    (composition: IComposition) => {
      const compositionsValue = [...compositions]
      const compositionIndex = compositionsValue.findIndex(
        c => c._id === composition._id
      )

      if (compositionIndex < 0) {
        compositionsValue.push({ ...composition, qtd: 1 })
        setCompositions(compositionsValue)
      } else {
        compositionsValue[compositionIndex].qtd =
          compositionsValue[compositionIndex].qtd + 1

        setCompositions(compositionsValue)
      }
    },
    [compositions]
  )

  const handleDecrementCompositionToStep = useCallback(
    (composition: IComposition) => {
      const compositionsValue = [...compositions]
      const compositionIndex = compositionsValue.findIndex(
        c => c._id === composition._id
      )

      if (compositionIndex >= 0) {
        compositionsValue[compositionIndex].qtd =
          compositionsValue[compositionIndex].qtd - 1

        setCompositions(compositionsValue)
      }
    },
    [compositions]
  )

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
                  <Th>Coef</Th>
                  <Th>Preço Unitário</Th>
                  <Th>QTD</Th>
                  <Th>Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                {resultServices.map(result => (
                  <Tr key={result._id}>
                    <Td>{result.compositionCode}</Td>
                    <Td maxW="100px" textOverflow="ellipsis" overflow="hidden">
                      {result.compositionDescription}
                    </Td>
                    <Td>{result.und}</Td>
                    <Td>{result.coef}</Td>
                    <Td>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(result.price)}
                    </Td>
                    <Td>{getQuantity(result._id)}</Td>
                    <Td>
                      <Button
                        borderRadius="full"
                        // background="brand.primary"
                        // _hover={{
                        //   background: shade(0.2, theme.colors.brand.primary),
                        // }}
                        transition="background 0.5s"
                        onClick={() => {
                          handleDecrementCompositionToStep(result)
                        }}
                      >
                        <MinusIcon />
                      </Button>
                      <Button
                        ml="10px"
                        borderRadius="full"
                        background="brand.primary"
                        _hover={{
                          background: shade(0.2, theme.colors.brand.primary),
                        }}
                        transition="background 0.5s"
                        onClick={() => {
                          handleAddCompositionToStep(result)
                        }}
                      >
                        <AddIcon color="#FFF" />
                      </Button>
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
    setTimeout(async () => {
      const result = await axios.get(
        `/api/SearchProducts?searchTerm=${e.target.value}`
      )
      setResultServices(result.data)
    }, 100)
    console.log(resultServices)
    setLoading(false)
  }, [])
  const handleAddNewStep = useCallback(() => {
    const constructionStepsValue = [...constructionSteps]

    constructionStepsValue.push({
      stepName: stepName,
      services: compositions,
    })
    setConstructionSteps(constructionStepsValue)
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
  }, [stepName, compositions])
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
