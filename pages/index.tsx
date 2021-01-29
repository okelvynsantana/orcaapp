import { Button, Flex, Image, Text, useTheme } from "@chakra-ui/react";
import CustomHeader from "../components/header";
import { shade } from 'polished'
import { useRouter } from 'next/router'

const Home: React.FC = () => {
  const theme = useTheme()
  const router = useRouter();

  const handleOnClick = (e: any) => {
    e.preventDefault()
    router.push("/create-budget")
  }


  return (
    <Flex flexDir="column" alignItems="center" justifyContent="center">
      <CustomHeader />
      <Image src="undraw.svg" width="720px" marginTop="30px"/>
      <Text fontSize="24px" mt="20px" fontWeight="600" color="#000">Crie sua planilha orçamentária de forma fácil e rápida</Text>
      <Button onClick={handleOnClick} bg="brand.primary" color="#FFF" mt="40px" _hover={{
        bg: shade(0.2, theme.colors.brand.primary)
      }}>Criar Novo</Button>
    </Flex>

  )
}

export default Home