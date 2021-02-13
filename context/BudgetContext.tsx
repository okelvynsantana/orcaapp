import { createContext, useContext, useState } from 'react'

interface IBasicData {
  constructionName: string
  proprietary: string
  technicalManager: string
  address: string
  bdi: number
}

interface IService {
  itemCode: string
  itemDescription: string
  und: string
  coef: number
  price: number
  qtd: number
  unitCoast: number
  directCoast: number
  finalPrice: number
}

interface IComposition {
  _id: string
  compositionCode: string
  compositionDescription: string
  coef: number
  price: number
  und: string
  qtd: number
  unitCoast: number
  directCoast: number
  finalPrice: number
  items: IService[]
}

interface IConstuctionStep {
  stepName: string
  services: IComposition[]
}

interface IBudgetData {
  basicData: IBasicData
  constructionSteps: IConstuctionStep[]
  setConstructionSteps: (constructionSteps: IConstuctionStep[]) => void
  step: number
  setStep: (step: number) => void
  setBasicData: (data: IBasicData) => void
}

const budgetState: IBudgetData = {
  basicData: {
    constructionName: '',
    proprietary: '',
    technicalManager: '',
    address: '',
    bdi: 0,
  },
  setBasicData: () => {},
  step: 1,
  setStep: () => {},
  constructionSteps: [],
  setConstructionSteps: () => {},
}
const BudgetContext = createContext<IBudgetData>(budgetState)

function BudgetProvider({ children }) {
  const [basicData, setBasicData] = useState(budgetState.basicData)
  const [step, setStep] = useState(1)
  const [constructionSteps, setConstructionSteps] = useState([])
  return (
    <BudgetContext.Provider
      value={{
        basicData,
        setBasicData,
        step,
        setStep,
        constructionSteps,
        setConstructionSteps,
      }}
    >
      {children}
    </BudgetContext.Provider>
  )
}
const useBudget = (): IBudgetData => {
  const context = useContext(BudgetContext)
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider.')
  }

  return context
}

export { BudgetContext, BudgetProvider, useBudget }
