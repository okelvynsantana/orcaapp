import { Button, Flex, Image, Text, useTheme } from '@chakra-ui/react'
import CustomHeader from '../components/CustomHeader'
import { shade } from 'polished'
import NextHead from 'next/head'
import { UploadFileModal } from '../components/UploadFileModal'
import { useState } from 'react'

const Home: React.FC = () => {
  const theme = useTheme()
  const [openUploadFileModal, setOpenUploadFileModal] = useState(false)
  const handleOnClick = () => {
    setOpenUploadFileModal(true)
  }
  return (
    <>
      <NextHead>
        <title>
          OrçaApp | Crie sua planilha orçamentária de forma fácil e rápida
        </title>
      </NextHead>
      <Flex
        flexDir="column"
        w="100%"
        alignItems="center"
        justifyContent="center"
      >
        <CustomHeader />
        <Flex
          flexDir="column"
          paddingY="60px"
          alignItems="center"
          justifyContent="center"
        >
          <Image src="construction.svg" />
          <Text fontSize="24px" mt="20px" fontWeight="600" color="#333">
            Crie sua planilha orçamentária de forma fácil e rápida
          </Text>
          <Button
            w="140px"
            onClick={handleOnClick}
            bg="brand.primary"
            color="#FFF"
            mt="40px"
            _hover={{
              bg: shade(0.2, theme.colors.brand.primary),
            }}
          >
            Criar Novo
          </Button>
        </Flex>
        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          pb="50px"
        >
          <Text textAlign="center">
            Aplicativo desenvolvido para Trabalho de Conclusão de Curso -
            Bacharelado Engenharia Civil{' '}
            <Text>
              Instituto Federal de Educação, Ciência e Tecnologia de Minas
              Gerais - Campus Avançado Piumhi -
              <a href="https://www.ifmg.edu.br/piumhi">
                <strong>www.ifmg.edu.br/piumhi</strong>
              </a>
            </Text>
            <Text>
              Prof. M.Sc. Humberto Melo -{' '}
              <a href="mailto:humberto.melo@ifmg.edu.br">
                <strong>humberto.melo@ifmg.edu.br</strong>
              </a>
            </Text>
            <Text>
              {' '}
              Mariana Souza -{' '}
              <a href="mailto:marianaus2013@gmail.com">
                <strong>marianaus2013@gmail.com</strong>
              </a>
            </Text>
          </Text>
        </Flex>
      </Flex>
      <UploadFileModal
        isOpen={openUploadFileModal}
        onClose={() => setOpenUploadFileModal(false)}
      />
    </>
  )
}

export default Home
