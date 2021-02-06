import { Button, Flex, Text } from '@chakra-ui/react'
import { useState } from 'react'
import AddStepModal from './AddStepModal'
import ConstructionStep from './ConstructionStep'

const ServicesForm: React.FC = () => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <Flex width="100%" mt="40px" flexDir="column">
      <Flex alignItems="center" marginTop="10px" justifyContent="space-between">
        <Text fontSize="24px">Etapas da obra</Text>
        <Button
          onClick={() => {
            setOpenModal(true)
          }}
        >
          Nova Etapa
        </Button>
        <AddStepModal
          isOpen={openModal}
          onClose={() => {
            setOpenModal(false)
          }}
        />
      </Flex>
      {/* TODO: fazer map para cada contructionStep */}
      <ConstructionStep
        stepName="Terraplanagem"
        services={[
          {
            serviceCode: '123',
            coef: '1',
            qtd: 2,
            serviceDescription: 'to nem ai',
            und: 'KG',
          },
        ]}
      />
    </Flex>
  )
}

export default ServicesForm
