import { Image } from '@chakra-ui/image'
import { Flex, Text } from '@chakra-ui/layout'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import { Spinner } from '@chakra-ui/spinner'
import axios from 'axios'
import { useCallback, useState } from 'react'
import Dropzone, { FileWithPath } from 'react-dropzone'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/toast'

interface UploadFileModalProps {
  onClose: () => void
  isOpen: boolean
}
export function UploadFileModal({ isOpen, onClose }: UploadFileModalProps) {
  const toast = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const handleSendFile = async (formData: FormData) => {
    try {
      const response = await axios.post('/api/extractExcelData', formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })

      localStorage.setItem('collection', response.data.collectionName)

      setLoading(false)
      onClose()
      router.push('/criar-orcamento')
    } catch (err) {
      toast({
        title: 'Erro!',
        description:
          'Ocorreu um erro ao extrair os dados do seu arquivo, verifique o seu arquivo e tente novamente mais tarde',
        isClosable: true,
        status: 'error',
        duration: 3000,
        position: 'bottom-right',
      })
      setLoading(false)
      onClose()
    }
  }

  const handleDropFile = useCallback(async (acceptedFiles: FileWithPath[]) => {
    setLoading(true)

    const [file] = acceptedFiles

    const reader = new FileReader()
    reader.onload = async () => {
      const formData = new FormData()
      formData.append('file', file)
      await handleSendFile(formData)
    }
    reader.readAsArrayBuffer(file)
  }, [])
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text textAlign="center">Upload planilha SINAPI</Text>
        </ModalHeader>
        <ModalBody padding="80px">
          {loading ? (
            <Flex flexDir="column" alignItems="center" justifyContent="center">
              <Spinner size="xl" color="brand.primary" />
              <Text textAlign="center" mt="36px" fontWeight="600" fontSize="lg">
                Aguarde enquanto extraímos os dados de sua planilha...
              </Text>
            </Flex>
          ) : (
            <Dropzone onDrop={handleDropFile}>
              {({ getInputProps, getRootProps }) => (
                <Flex as="div" {...getRootProps()} flexDir="column">
                  <input
                    {...getInputProps()}
                    style={{ display: 'none' }}
                  ></input>
                  <Image src="upload.svg" />
                  <Text as="p" mt="30px" textAlign="center" fontWeight="bold">
                    Arraste o arquivo ou clique para fazer upload.
                  </Text>
                </Flex>
              )}
            </Dropzone>
          )}
        </ModalBody>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  )
}
