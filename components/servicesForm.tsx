import { Button, Flex, Text, useDisclosure, useTheme } from '@chakra-ui/react'
import { shade } from 'polished'
import { useBudget } from '../context/BudgetContext'
import AddStepModal from './AddStepModal'
import ConstructionStep from './ConstructionStep'

const ServicesForm: React.FC = () => {
  const { constructionSteps } = useBudget()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const theme = useTheme()
  return (
    <Flex width="100%" mt="40px" flexDir="column">
      <Flex alignItems="center" marginTop="10px" justifyContent="space-between">
        <Text fontSize="24px">Etapas da obra</Text>
        <Button
          background="brand.primary"
          color="#FFF"
          _hover={{
            background: shade(0.2, theme.colors.brand.primary),
          }}
          transition="background, 0.2s"
          onClick={onOpen}
        >
          Nova Etapa
        </Button>
        <AddStepModal onOpen={onOpen} onClose={onClose} isOpen={isOpen} />
      </Flex>
      {/* TODO: fazer map para cada contructionStep */}
      {constructionSteps.map(c => (
        <ConstructionStep
          key={c.stepName}
          stepName={c.stepName}
          services={c.services}
        />
      ))}
    </Flex>
  )
}

export default ServicesForm
