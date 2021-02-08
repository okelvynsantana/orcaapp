import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Flex, Tag, Tooltip, useToast } from '@chakra-ui/react'
import { useCallback } from 'react'
import { useBudget } from '../context/BudgetContext'

interface IService {
  serviceCode: string
  serviceDescription: string
  und: string
  coef: number
  qtd: number
  price: number
}

interface ConstructionStepProps {
  stepName: string
  services: IService[]
}

const ConstructionStep: React.FC<ConstructionStepProps> = ({ stepName }) => {
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
              <EditIcon w={6} h={6} />
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
              />
            </Tooltip>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ConstructionStep
