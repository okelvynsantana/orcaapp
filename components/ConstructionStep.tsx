import { Flex, Tag } from '@chakra-ui/react'

interface IService {
  serviceCode: string
  serviceDescription: string
  und: string
  coef: string
  qtd: number
}

interface ConstructionStepProps {
  stepName: string
  services: IService[]
}

const ConstructionStep: React.FC<ConstructionStepProps> = ({ stepName }) => {
  return (
    <Flex flexDir="column" mt="35px">
      <Flex>
        <Flex flexDir="column">
          <Tag borderRadius="lg" size="lg" colorScheme="purple">
            {stepName}
          </Tag>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ConstructionStep
