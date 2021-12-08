import { createContext, useContext, useEffect, useState } from 'react'

interface IBasicData {
  constructionName: string
  proprietary: string
  technicalManager: string
  address: string
  bdi: number
  totalPrice: number
  totalCoast: number
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
  id: string
  stepName: string
  services: IComposition[]
}

type IBudgetData = {
  basicData: IBasicData
  setBasicData: (data: IBasicData) => void
  constructionSteps: IConstuctionStep[]
  setConstructionSteps: (constructionSteps: IConstuctionStep[]) => void
  step: number
  setStep: (step: number) => void
  setCoastAndFinalPrice: (constructionSteps: IConstuctionStep[]) => void
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
    totalPrice: 0,
    totalCoast: 0,
  },
  setBasicData: () => {},
  step: 1,
  setStep: () => {},
  constructionSteps: [],
  setConstructionSteps: () => {},
  rootCompositions: [],
  setRootCompositions: () => {},
  setCoastAndFinalPrice: () => {},
}
const BudgetContext = createContext<IBudgetData>(budgetState)
function BudgetProvider({ children }) {
  const [basicData, setBasicData] = useState(budgetState.basicData)
  const [step, setStep] = useState(1)
  const [constructionSteps, setConstructionSteps] = useState<
    IConstuctionStep[]
  >([])
  const [rootCompositions, setRootCompositions] = useState<RootComposition[]>(
    []
  )

  useEffect(() => {
    if (constructionSteps.length) {
      const newConstructionSteps = constructionSteps.map(constructionStep => ({
        ...constructionStep,
        services: constructionStep.services.map(service => {
          const compositionDirectCoast = service.price * service.qtd

          return {
            ...service,
            unitCoast: service.price * service.coef,
            directCoast: compositionDirectCoast,
            finalPrice: compositionDirectCoast * (1 + basicData.bdi / 100),
            items: service.items.map(item => {
              const itemQtd = service.qtd * item.coef
              const itemDirectCoast = item.price * itemQtd
              return {
                ...item,
                qtd: itemQtd,
                unitCoast: item.price * item.coef,
                directCoast: itemDirectCoast,
                finalPrice: itemDirectCoast * (1 + basicData.bdi / 100),
              }
            }),
          }
        }),
      }))
      setConstructionSteps(newConstructionSteps)
    }
  }, [basicData])

  function updateCoasts(steps: IConstuctionStep[]) {
    let directCoast = 0
    let finalPrice = 0
    steps.map(cs => {
      cs.services.map(service => {
        directCoast = directCoast + service.directCoast
        finalPrice = finalPrice + service.finalPrice
      })
    })
    return {
      totalPrice: finalPrice,
      totalCoast: directCoast,
    }
  }

  const setCoastAndFinalPrice = (cs: IConstuctionStep[]) => {
    const coasts = updateCoasts(cs)

    setBasicData({
      ...basicData,
      totalCoast: coasts.totalCoast,
      totalPrice: coasts.totalPrice,
    })
  }

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
        setCoastAndFinalPrice,
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
