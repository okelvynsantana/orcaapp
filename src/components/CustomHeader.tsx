import { Flex, Image, Link } from '@chakra-ui/react'
// import { FaGithub } from 'react-icons/fa'

const CustomHeader: React.FC = () => {
  return (
    <Flex
      background="#FFF"
      width="100%"
      padding="5px"
      alignItems="center"
      justifyContent="space-between"
    >
      <Link href="/">
        <Image src="logo.svg" marginLeft="25px" maxW="200px" />
      </Link>
      <Flex>
        <Link
          href="https://www.ifmg.edu.br/piumhi"
          target="_blank"
          marginLeft="20px"
          marginRight="24px"
        >
          <Image src="vertical_1.png" w="120px" />
        </Link>
      </Flex>
    </Flex>
  )
}

export default CustomHeader
