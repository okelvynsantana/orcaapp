import { Button, Flex, Image, Text } from "@chakra-ui/react";
import CustomHeader from "./components/header";
import { shade } from 'polished'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter();

  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push("/teste")
  }


  return (
    <Flex flexDir="column" alignItems="center" justifyContent="center">
      <CustomHeader />
      <Image src="undraw.svg" width="720px" marginTop="30px"/>
      <Text fontSize="24px" mt="20px" fontWeight="600" color="#000">Crie sua planilha orçamentária de forma fácil e rápida</Text>
      <Button onClick={handleOnClick} bg="#6F10BA" color="#FFF" mt="40px" _hover={{
        bg: shade(0.2, "#6F10BA")
      }}>Criar Novo</Button>
    </Flex>

  )
}
