import { Flex } from '@chakra-ui/react'

const CardBody: React.FC = props => {
  return (
    <Flex
      bg="#FFF"
      padding="40px"
      width="100%"
      mt="20px"
      borderRadius="6px"
      flexDir="column"
    >
      {props.children}
    </Flex>
  )
}

export default CardBody
