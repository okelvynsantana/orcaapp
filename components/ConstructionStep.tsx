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
} from '@chakra-ui/react'
import { useCallback } from 'react'
import { useBudget } from '../context/BudgetContext'

interface IService {
  itemCode: string
  itemDescription: string
  und: string
  coef: number
  price: number
}
interface IComposition {
  _id: string
  compositionCode: string
  compositionDescription: string
  coef: number
  price: number
  und: string
  qtd: number
  items: IService[]
}
interface ConstructionStepProps {
  stepName: string
  services: IComposition[]
}

const ConstructionStep: React.FC<ConstructionStepProps> = ({
  stepName,
  services,
}) => {
  const { constructionSteps, setConstructionSteps } = useBudget()
  const toast = useToast()

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
  }, [constructionSteps])
  return (
    <Flex flexDir="column" mt="35px" width-="100%">
      <Flex width="100%">
        <Flex
          flexDir="row"
          alignItems="center"
          justifyContent="space-between"
          w="100%"
        >
          <Tag borderRadius="lg" size="lg" colorScheme="purple">
            {stepName}
          </Tag>
          <Flex>
            <Tooltip hasArrow label="Editar etapa">
              <EditIcon w={6} h={6} cursor="pointer" />
            </Tooltip>
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
      <Flex mt="25px">
        <Table>
          <Thead>
            <Tr>
              <Th>Código SINAPI</Th>
              <Th>Descrição</Th>
              <Th>UND</Th>
              <Th>QTD</Th>
              <Th>Coeficiente</Th>
              <Th>Preço</Th>
            </Tr>
          </Thead>
          <Tbody>
            {services.map(s => (
              <>
                <Tr key={s._id} fontWeight="bold">
                  <Td>{s.compositionCode}</Td>
                  <Td>{s.compositionDescription}</Td>
                  <Td>{s.und}</Td>
                  <Td>{s.qtd}</Td>
                  <Td>{s.coef}</Td>
                  <Td>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(s.price)}
                  </Td>
                </Tr>
                {s.items.map(item => (
                  <Tr key={item.itemCode}>
                    <Td>{item.itemCode}</Td>
                    <Td>{item.itemDescription}</Td>
                    <Td>{item.und}</Td>
                    <Td>{s.qtd}</Td>
                    <Td>{item.coef}</Td>
                    <Td>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(item.price)}
                    </Td>
                  </Tr>
                ))}
              </>
            ))}
          </Tbody>
        </Table>
      </Flex>
    </Flex>
  )
}

export default ConstructionStep
