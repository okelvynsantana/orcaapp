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
interface RootComposition {
  _id: string
  compositionCode: string
  compositionDescription: string
  items: RootService[]
}

interface RootService {
  _id: string
  itemCode: string
  itemDescription: string
  und: string
  coef: number
  price: number
}

interface IConstuctionStep {
  stepName: string
  services: IComposition[]
}

interface IBudgetData {
  basicData: IBasicData
  setBasicData: (data: IBasicData) => void
  constructionSteps: IConstuctionStep[]
  setConstructionSteps: (constructionSteps: IConstuctionStep[]) => void
  step: number
  setStep: (step: number) => void
  rootCompositions: RootComposition[]
  setRootCompositions: (compositions: RootComposition[]) => void
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
  rootCompositions: [],
  setRootCompositions: () => {},
}
const BudgetContext = createContext<IBudgetData>(budgetState)
function BudgetProvider({ children }) {
  const [basicData, setBasicData] = useState(budgetState.basicData)
  const [step, setStep] = useState(1)
  const [constructionSteps, setConstructionSteps] = useState([])
  const [rootCompositions, setRootCompositions] = useState<RootComposition[]>(
    []
  )

  return (
    <BudgetContext.Provider
      value={{
        basicData,
        setBasicData,
        step,
        setStep,
        constructionSteps,
        setConstructionSteps,
        rootCompositions,
        setRootCompositions,
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
