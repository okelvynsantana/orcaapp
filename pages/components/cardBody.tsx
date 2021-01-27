import { Flex } from "@chakra-ui/react"

const CardBody: React.FC = (props) => {
  return(
    <Flex bg="#FFF" padding="40px" width="75%" mt="20px" borderRadius="6px">
      {props.children}
    </Flex>
  )
}

export default CardBody