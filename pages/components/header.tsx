import { Flex, Image } from "@chakra-ui/react";

const CustomHeader = () => {
  return(
    <Flex background="#FFF" width="100vw" padding="20px" alignItems="center">
      <Image src="logo.svg" marginLeft="10px"/>
    </Flex>
  )
}

export default CustomHeader;