import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  Flex,
  Table,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useToast,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  Button,
  Input,
} from '@chakra-ui/react'
import { shade } from 'polished'
import { useCallback, useEffect, useState } from 'react'
import { useBudget } from '../context/BudgetContext'

interface IService {
  itemCode: string
  itemDescription: string
  und: string
  coef: number
  price: number
  qtd: number
  unitCoast: number
  directCoast: number
  finalPrice: number
}
interface IComposition {
  _id: string
  compositionCode: string
  compositionDescription: string
  coef: number
  price: number
  und: string
  qtd: number
  unitCoast: number
  directCoast: number
  finalPrice: number
  items: IService[]
}
interface ConstructionStepProps {
  stepName: string
  services: IComposition[]
  id: string
}

const ConstructionStep: React.FC<ConstructionStepProps> = ({
  stepName,
  services,
  id,
}) => {
  const {
    constructionSteps,
    setConstructionSteps,
    setCoastAndFinalPrice,
    basicData,
  } = useBudget()
  const toast = useToast()
  const [editComposition, setEditComposition] = useState(false)
  const [compositions, setCompositions] = useState<IComposition[]>([])
  const [localStepName, setLocalStepName] = useState<string>('')
  const [
    selectedComposition,
    setSelectedComposition,
  ] = useState<IComposition | null>(null)
  const [selectedQtd, setSelectedQtd] = useState('')

  const [stepId, setStepId] = useState('')

  useEffect(() => {
    updateStep()
  }, [])

  function updateStep() {
    const step = constructionSteps.find(cs => cs.id === id)
    setCompositions(step.services)
    setLocalStepName(step.stepName)
    setStepId(step.id)
  }

  useEffect(() => {
    updateStep()
  }, [selectedQtd])
  function handleEditComposition(composition: IComposition) {
    setEditComposition(true)
    setSelectedComposition(composition)
    setSelectedQtd(composition.qtd.toString())
  }

  function handleDeleteComposition(composition: IComposition) {
    console.log(composition)
    const step = constructionSteps.find(i => i.stepName === stepName)

    console.log(step)

    const stepIndex = constructionSteps.findIndex(i => i.stepName === stepName)
    const updatedCompositions = step.services.filter(
      s => s._id !== composition._id
    )

    step.services = updatedCompositions

    const updatedConstructionSteps = constructionSteps

    updatedConstructionSteps[stepIndex] = step

    if (!step.services.length) {
      const updated = constructionSteps.filter(
        step => step.stepName !== stepName
      )
      setConstructionSteps(updated)
    } else {
      setConstructionSteps(updatedConstructionSteps)
      setCompositions(updatedCompositions)
    }
  }
  function handleSaveComposition() {
    const constructionStepsData = constructionSteps

    const stepIndex = constructionSteps.findIndex(step => step.id === id)
    const compositionIndex = constructionSteps[stepIndex].services.findIndex(
      comp => comp._id === selectedComposition._id
    )
    const compositionDirectCoast =
      selectedComposition.price * parseFloat(selectedQtd)

    constructionStepsData[stepIndex].services[compositionIndex] = {
      ...selectedComposition,
      qtd: Number(selectedQtd),
      directCoast: compositionDirectCoast,
      finalPrice: compositionDirectCoast * (1 + basicData.bdi / 100),
      items: selectedComposition.items.map(i => {
        const itemQtd = parseFloat(selectedQtd) * i.coef
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
    setConstructionSteps(constructionStepsData)
    setCoastAndFinalPrice(constructionStepsData)
    // constructionStepData[stepIndex].services =

    setEditComposition(false)
    setSelectedQtd('')
    setSelectedComposition(null)
  }

  function renderModal() {
    return (
      <Modal
        isOpen={editComposition}
        onClose={() => {
          setEditComposition(false)
          setSelectedComposition(null)
        }}
        size="xl"
        closeOnOverlayClick
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar composição</ModalHeader>
          <ModalCloseButton borderRadius="full" />

          <ModalBody>
            <Flex>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Código SINAPI</Th>
                    <Th>Descrição</Th>
                    <Th>UND</Th>
                    <Th>QTD</Th>
                  </Tr>
                </Thead>
                {selectedComposition && (
                  <Tbody>
                    <Tr
                      key={selectedComposition._id}
                      fontWeight="bold"
                      background="#EEE"
                    >
                      <Td>{selectedComposition.compositionCode}</Td>
                      <Td
                        maxW="400px"
                        textOverflow="ellipsis"
                        overflow="hidden"
                      >
                        {selectedComposition.compositionDescription}
                      </Td>
                      <Td>{selectedComposition.und}</Td>
                      <Td>
                        <Flex>
                          <Input
                            value={selectedQtd}
                            onChange={e => {
                              setSelectedQtd(e.target.value)
                            }}
                            backgroundColor="white"
                          />
                        </Flex>
                      </Td>
                    </Tr>
                  </Tbody>
                )}
              </Table>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleSaveComposition}
              backgroundColor="brand.primary"
              color="white"
              _hover={{
                backgroundColor: shade(0.2, '#5ecce6'),
              }}
            >
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }

  const onDeleteStep = useCallback(() => {
    const steps = constructionSteps.filter(i => i.stepName !== stepName)
    setConstructionSteps(steps)
    toast({
      title: 'Feito!',
      description: 'Etapa removida com sucesso.',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'bottom-right',
    })
    setCoastAndFinalPrice(steps)
  }, [constructionSteps])
  return (
    <>
      <Flex flexDir="column" mt="35px" width-="100%">
        <Flex width="100%">
          <Flex
            flexDir="row"
            alignItems="center"
            justifyContent="space-between"
            w="100%"
          >
            <Tag borderRadius="lg" size="lg" colorScheme="purple">
              {localStepName}
            </Tag>
            <Flex>
              {/* <Tooltip hasArrow label="Editar etapa">
              <EditIcon w={6} h={6} cursor="pointer" />
            </Tooltip> */}
              <Tooltip hasArrow label="Deletar Etapa" bg="red.600">
                <DeleteIcon
                  _hover={{ color: 'red.700' }}
                  transition="color, 0.2s"
                  onClick={onDeleteStep}
                  ml="10px"
                  w={6}
                  h={6}
                  color="red.600"
                  cursor="pointer"
                />
              </Tooltip>
            </Flex>
          </Flex>
        </Flex>
        <Flex mt="25px" flexDir="column">
          <Table w="100%">
            <Thead>
              <Tr>
                <Th>Código SINAPI</Th>
                <Th maxW="20px">Descrição</Th>
                <Th>UND</Th>
                <Th>QTD</Th>
                <Th>Coef.</Th>
                <Th>Preço Unitário</Th>
                <Th>Custo Unitário</Th>
                <Th>Custo Direto</Th>
                <Th>Preço de venda</Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {compositions.map(s => (
                <>
                  <Tr key={s._id} fontWeight="bold" background="#EEE">
                    <Td>{s.compositionCode}</Td>
                    <Td maxW="100px" textOverflow="ellipsis" overflow="hidden">
                      {s.compositionDescription}
                    </Td>
                    <Td>{s.und}</Td>
                    <Td>
                      {s.qtd.toLocaleString('pt-BR', {
                        maximumFractionDigits: 2,
                      })}
                    </Td>
                    <Td>
                      {s.coef.toLocaleString('pt-BR', {
                        maximumFractionDigits: 2,
                      })}
                    </Td>
                    <Td>
                      {s.price.toLocaleString('pt-BR', {
                        currency: 'BRL',
                        style: 'currency',
                      })}
                    </Td>
                    <Td>
                      {s.unitCoast.toLocaleString('pt-BR', {
                        currency: 'BRL',
                        style: 'currency',
                      })}
                    </Td>
                    <Td>
                      {s.directCoast.toLocaleString('pt-BR', {
                        currency: 'BRL',
                        style: 'currency',
                      })}
                    </Td>
                    <Td>
                      {s.finalPrice.toLocaleString('pt-BR', {
                        currency: 'BRL',
                        style: 'currency',
                      })}
                    </Td>
                    <Td>
                      <EditIcon
                        cursor="pointer"
                        w={6}
                        h={6}
                        color="gray.600"
                        onClick={() => handleEditComposition(s)}
                      />
                    </Td>
                    <Td>
                      <DeleteIcon
                        cursor="pointer"
                        w={6}
                        h={6}
                        color="red.600"
                        onClick={() => handleDeleteComposition(s)}
                      />
                    </Td>
                  </Tr>
                  {s.items.map(item => (
                    <Tr key={item.itemCode}>
                      <Td>{item.itemCode}</Td>
                      <Td
                        maxW="200px"
                        textOverflow="ellipsis"
                        overflow="hidden"
                      >
                        {item.itemDescription}
                      </Td>
                      <Td>{item.und}</Td>
                      <Td>
                        {item.qtd.toLocaleString('pt-BR', {
                          maximumFractionDigits: 2,
                        })}
                      </Td>
                      <Td>
                        {item.coef.toLocaleString('pt-BR', {
                          maximumFractionDigits: 2,
                        })}
                      </Td>
                      <Td>
                        {item.unitCoast.toLocaleString('pt-BR', {
                          currency: 'BRL',
                          style: 'currency',
                        })}
                      </Td>
                      <Td>
                        {item.directCoast.toLocaleString('pt-BR', {
                          currency: 'BRL',
                          style: 'currency',
                        })}
                      </Td>
                      <Td>
                        {item.price.toLocaleString('pt-BR', {
                          currency: 'BRL',
                          style: 'currency',
                        })}
                      </Td>
                      <Td>
                        {item.finalPrice.toLocaleString('pt-BR', {
                          currency: 'BRL',
                          style: 'currency',
                        })}
                      </Td>
                    </Tr>
                  ))}
                </>
              ))}
            </Tbody>
          </Table>

          {renderModal()}
        </Flex>
      </Flex>
    </>
  )
}

export default ConstructionStep
