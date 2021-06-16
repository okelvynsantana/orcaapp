import { Button, Flex, Image, Text, useTheme } from '@chakra-ui/react'
import CustomHeader from '../components/CustomHeader'
import { shade } from 'polished'
import Head from 'next/head'
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
      <Head>
        <title>
          OrçaApp | Crie sua planilha orçamentária de forma fácil e rápida
        </title>
      </Head>
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
      </Flex>
      <UploadFileModal
        isOpen={openUploadFileModal}
        onClose={() => setOpenUploadFileModal(false)}
      />
    </>
  )
}

export default Home
