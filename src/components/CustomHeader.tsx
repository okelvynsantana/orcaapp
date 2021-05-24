import { Flex, Icon, Image, Link, Tooltip } from '@chakra-ui/react'
import { FaGithub } from 'react-icons/fa'

const CustomHeader: React.FC = () => {
  return (
    <Flex
      background="#FFF"
      width="100vw"
      padding="20px"
      alignItems="center"
      justifyContent="space-between"
    >
      <Link href="/">
        <Image src="logo.svg" marginLeft="25px" w="130px" />
      </Link>
      <Flex>
        <Tooltip
          label="Veja o código  deste projeto no github"
          hasArrow
          placement="left-start"
          background="brand.primary"
        >
          <Link
            href="https://github.com/okelvynsantana/budget-generator"
            target="_blank"
          >
            <Icon as={FaGithub} w={8} h={8} mr="25px" color="brand.primary" />
          </Link>
        </Tooltip>
        <Link
          href="https://www.ifmg.edu.br/portal/home"
          target="_blank"
          marginLeft="20px"
          marginRight="24px"
        >
          <Image src="logovertical.jpg" w="60px" />
        </Link>
      </Flex>
    </Flex>
  )
}

export default CustomHeader
