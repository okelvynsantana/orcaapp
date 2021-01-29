import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface IBasicData {
  constructionName: string;
  proprietary: string;
  technicalManager: string;
  address: string;
  bdi: number;
}

interface IBudgetData {
  basicData: IBasicData;
  step: number;
  setStep: (step: number) => void;
  setBasicData: (data: IBasicData) => void;
}

const budgetState = {
  basicData: {
    constructionName: "",
    proprietary: "",
    technicalManager: "",
    address: "",
    bdi: 0,
  },
  setBasicData: () => {},
  step: 1,
  setStep: () => {}
};
const BudgetContext = createContext<IBudgetData>(budgetState);

function BudgetProvider({ children }) {
  const [basicData, setBasicData] = useState(budgetState.basicData);
  const [step, setStep] = useState(1)
  return (
    <BudgetContext.Provider value={{ basicData, setBasicData, step, setStep }}>
      {children}
    </BudgetContext.Provider>
  );
};


const useBudget = (): IBudgetData => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error("useBudget must be used within a BudgetProvider.");
  }

  return context;
};

export { BudgetContext, BudgetProvider, useBudget };
