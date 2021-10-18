import { Flex, Text } from '@chakra-ui/react'
import NextHead from 'next/head'
import FormContainer from '../components/Container'
import CustomHeader from '../components/CustomHeader'

import { BudgetProvider } from '../context/BudgetContext'

const createBudget: React.FC = () => {
  return (
    <div>
      <NextHead>
        <title>MeuOrçamentoFacil | Criar Orçamento</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </NextHead>
      <BudgetProvider>
        <Flex flexDir="column" alignItems="center" justifyContent="center">
          <CustomHeader />
          <Text as="h1" mt="20px" fontWeight="bold" fontSize="36px">
            Criar Orçamento
          </Text>
          <FormContainer />
        </Flex>
      </BudgetProvider>
    </div>
  )
}

export default createBudget
