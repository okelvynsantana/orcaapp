import { Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";

interface RenderServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddStepModal: React.FC<RenderServicesModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full" motionPreset="scale">
      <ModalOverlay />
      <ModalContent padding="30px">
        <ModalHeader mt="10px">Adicionar nova etapa</ModalHeader>
        <ModalCloseButton borderRadius="full" />
        <ModalBody>
          <Flex >
            <Input placeholder="Insira o nome da etapa" border="0" focusBorderColor="#FFF" />
            {/* <Button
              ml="20px"
              background="brand.primary"
              color="#FFF"
              padding="20px"
            >
              Salvar
            </Button> */}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddStepModal;