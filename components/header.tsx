import { Flex, Image, Link } from '@chakra-ui/react'

const CustomHeader: React.FC = () => {
  return (
    <Flex background="#FFF" width="100vw" padding="20px" alignItems="center">
      <Link href="/">
        <Image src="logo.svg" marginLeft="10px" />
      </Link>
    </Flex>
  )
}

export default CustomHeader
