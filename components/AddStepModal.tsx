// import { AddIcon } from '@chakra-ui/icons'
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
} from '@chakra-ui/react'
import axios from 'axios'
import { useCallback, useState } from 'react'
// import { useBudget } from '../context/BudgetContext'

interface RenderServicesModalProps {
  isOpen: boolean
  onClose: () => void
}

const AddStepModal: React.FC<RenderServicesModalProps> = ({
  isOpen,
  onClose,
}) => {
  // const { constructionSteps, setConstructionSteps } = useBudget()
  const [searchService, setSearchService] = useState('')
  const [resultServices, setResultServices] = useState([])
  const [stepName, setStepName] = useState('')
  const [loading, setLoading] = useState(false)

  // const handleSearchServices = useCallback(async () => {
  //   setResultServices([])
  //   const result = await search(
  //     `/api/SearchProducts?searchTerm=${searchService}`
  //   )
  //   setResultServices(result.data)
  //   console.log(resultServices)
  //   setSearchService('')
  // }, [searchService])

  const RenderTable = () => {
    return (
      <>
        {!resultServices.length ? (
          <RenderEmptyContent />
        ) : (
          <Table variant="simple" flexDir="row" marginTop="25px">
            <Thead>
              <Tr>
                <Th>Código</Th>
                <Th>Serviço</Th>
                <Th>UND</Th>
                <Th>COEF</Th>
                <Th>QTD</Th>
                <Th>Preço Unitário</Th>
                <Th>Preço total</Th>
              </Tr>
            </Thead>
            <Tbody>
              {resultServices.map(result => (
                <Tr key={result.compositionCode}>
                  <Td>{result.compositionCode}</Td>
                  <Td maxW="100px" textOverflow="ellipsis" overflow="hidden">
                    {result.compositionDescription}
                  </Td>
                  <Td>UND</Td>
                  <Td>COEF</Td>
                  <Td>
                    <Input maxW="50px" type="number"></Input>
                  </Td>
                  <Td>1</Td>
                  <Td>2</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
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
        mt="40px"
      >
        <Spinner />
        <Text>Carregando...</Text>
      </Flex>
    )
  }
  const RenderEmptyContent = () => {
    return (
      <Flex
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        mt="40px"
      >
        <Text>
          Não há resultados para o termo pesquisado, tente com outro termo
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
  const handleAddNewStep = useCallback(() => {}, [])
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
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
            <Button onClick={handleAddNewStep}>Salvar Etapa</Button>
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

            {/* <Button
              background="brand.primary"
              color="#FFF"
              ml="10px"
              onClick={handleSearchServices}
            >
              Buscar
            </Button> */}
          </Flex>
          {loading ? <RenderLoading /> : <RenderTable />}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default AddStepModal
