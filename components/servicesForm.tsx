import {
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useTheme,
} from '@chakra-ui/react'
import { shade } from 'polished'
import { useCallback, useState } from 'react'
import { useBudget } from '../context/BudgetContext'
import AddStepModal from './AddStepModal'
import ConstructionStep from './ConstructionStep'

const ServicesForm: React.FC = () => {
  const { constructionSteps } = useBudget()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [openDownloadModal, setOpenDownloadModal] = useState(false)
  const theme = useTheme()

  const handleDownload = useCallback(() => {
    setOpenDownloadModal(true)
  }, [])
  return (
    <Flex width="100%" mt="40px" flexDir="column">
      <Flex></Flex>
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
      {constructionSteps.length > 0 ? (
        constructionSteps.map(c => (
          <ConstructionStep
            key={c.stepName}
            stepName={c.stepName}
            services={c.services}
          />
        ))
      ) : (
        <Flex alignItems="center" justifyContent="center" marginTop="60px">
          <Text fontSize="24px" color="#cacaca" fontWeight="bold">
            Adicione uma etapa para comerçar a visualizar sua planilha.
          </Text>
        </Flex>
      )}
      {constructionSteps.length > 0 && (
        <Flex justifyContent="flex-end" mt="40px">
          <Button
            onClick={handleDownload}
            background="brand.primary"
            color="#FFF"
            _hover={{
              background: shade(0.2, theme.colors.brand.primary),
            }}
            transition="background, 0.2s"
          >
            Exportar planilha
          </Button>
        </Flex>
      )}
      <Modal
        isOpen={openDownloadModal}
        onClose={() => setOpenDownloadModal(false)}
      >
        <ModalOverlay>
          <ModalContent>
            <ModalCloseButton borderRadius="full" />
            <ModalBody padding="50px" w="455px">
              <Image src="/download.svg" mt="25px" />
              <Text fontWeight="bold" mt="45px" textAlign="center">
                Aguarde, sua planilha orçamentária está sendo gerada, o download
                começa em instantes.
              </Text>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Flex>
  )
}

export default ServicesForm
