import { DeleteIcon } from '@chakra-ui/icons'
import {
  Button,
  Flex,
  Input,
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
import { uuid } from 'uuidv4'
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
  const {
    constructionSteps,
    setConstructionSteps,
    basicData,
    setCoastAndFinalPrice,
  } = useBudget()
  const [searchService, setSearchService] = useState('')
  const [resultServices, setResultServices] = useState([])
  const [stepName, setStepName] = useState('')
  const [loading, setLoading] = useState(false)
  const [compositions, setCompositions] = useState([])
  const toast = useToast()
  const theme = useTheme()

  const onCloseModal = () => {
    onClose()
    setSearchService('')
    setResultServices([])
    setCompositions([])
    setLoading(false)
  }

  const getQuantity = useCallback(
    (compositionCode: string) => {
      const compositionIndex = compositions.findIndex(
        c => c._id === compositionCode
      )
      if (compositionIndex < 0) {
        return 0
      }

      return compositions[compositionIndex].qtd
    },
    [compositions]
  )

  const handleAddCompositionToStep = useCallback(
    (composition: IComposition, qtd: string) => {
      const compositionsValue = [...compositions]
      const compositionIndex = compositionsValue.findIndex(
        c => c._id === composition._id
      )

      if (parseInt(qtd) === 0) {
        const clearComposition = compositionsValue.filter(
          c => composition._id !== c._id
        )
        setCompositions(clearComposition)
      } else {
        if (compositionIndex < 0) {
          compositionsValue.push({ ...composition, qtd })
          setCompositions(compositionsValue)
        } else {
          compositionsValue[compositionIndex].qtd = qtd

          setCompositions(compositionsValue)
        }
      }
    },
    [compositions]
  )

  const handleDecrementCompositionToStep = useCallback(
    (compositionId: string) => {
      const compositionsValue = [...compositions]

      const newCompositions = compositionsValue.filter(
        c => c._id !== compositionId
      )

      setCompositions(newCompositions)
    },
    [compositions]
  )

  const onChangeHandler = useCallback(async (e: any) => {
    setLoading(true)
    setSearchService(e.target.value)

    setTimeout(async () => {
      const collectionName = localStorage.getItem('collection')
      const result = await axios.get(
        `/api/SearchProducts?searchTerm=${e.target.value}&collectionName=${collectionName}`
      )

      // const result = comp.filter(service =>
      //   service.compositionDescription.includes(
      //     e.target.value.charAt(0).toUpperCase() ||
      //       e.target.value.charAt(0).toLowerCase() ||
      //       e.target.value
      //   )
      // )
      setResultServices(result.data)
      setLoading(false)
    }, 100)
  }, [])

  const getServices = () => {
    const compositionsValue = [...compositions]

    const newCompositions = compositionsValue.map(c => {
      const compositionDirectCoast = c.price * parseFloat(c.qtd)
      return {
        ...c,
        unitCoast: c.price * c.coef,
        directCoast: compositionDirectCoast,
        finalPrice: compositionDirectCoast * (1 + basicData.bdi / 100),
        items: c.items.map(i => {
          const itemQtd = parseFloat(c.qtd) * i.coef
          const itemDirectCoast = i.price * itemQtd

          return {
            ...i,
            qtd: itemQtd,
            unitCoast: i.price * i.coef,
            directCoast: itemDirectCoast,
            finalPrice: itemDirectCoast * (1 + basicData.bdi / 100),
          }
        }),
      }
    })

    return newCompositions
  }

  const handleAddNewStep = useCallback(() => {
    const constructionStepsValue = [...constructionSteps]

    constructionStepsValue.push({
      stepName: stepName,
      services: getServices(),
      id: uuid(),
    })
    setConstructionSteps(constructionStepsValue)
    setStepName('')
    setSearchService('')
    setResultServices([])
    setCompositions([])
    onCloseModal()
    toast({
      title: 'Sucesso!',
      description: 'Etapa adicionada com sucesso',
      isClosable: true,
      status: 'success',
      duration: 3000,
      position: 'bottom-right',
    })

    setTimeout(() => {
      setCoastAndFinalPrice(constructionStepsValue)
    }, 1000)
  }, [stepName, compositions])

  const RenderTable = () => {
    return (
      <>
        {!resultServices.length ? (
          <RenderEmptyContent />
        ) : (
          <>
            <Flex>
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
                      <Td
                        maxW="100px"
                        textOverflow="ellipsis"
                        overflow="hidden"
                      >
                        {result.compositionDescription}
                      </Td>
                      <Td>{result.und}</Td>
                      <Td>1</Td>
                      <Td>
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(result.price)}
                      </Td>
                      <Td maxW="10px">
                        <Input
                          value={getQuantity(result._id)}
                          onChange={e => {
                            handleAddCompositionToStep(result, e.target.value)
                          }}
                        />
                      </Td>
                      <Td>
                        <Button
                          borderRadius="full"
                          transition="background 0.5s"
                          onClick={() => {
                            handleDecrementCompositionToStep(result._id)
                          }}
                        >
                          <DeleteIcon color="#FF0023" />
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Flex>
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
              transition="background, 0.2s"
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
          {loading ? RenderLoading() : RenderTable()}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default AddStepModal
