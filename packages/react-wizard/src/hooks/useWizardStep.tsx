import React, { FC, useContext } from "react";
import { useWizard, WizardContext } from "./useWizard";

export type WizardStepContext = {
  isActive: boolean;
  hasBeenActive: boolean;
  stepIndex: number;
} & WizardContext;

export const WizardStepContext = React.createContext<
  WizardStepContext | undefined
>(undefined);

export type WizardStepProviderProps = {
  stepIndex: number;
};

export const WizardStepProvider: FC<WizardStepProviderProps> = ({
  stepIndex,
  children,
}) => {
  const { activeStep, maxActivatedStepIndex, ...wizardProps } = useWizard();

  return (
    <WizardStepContext.Provider
      value={{
        stepIndex,
        isActive: activeStep === stepIndex,
        hasBeenActive: maxActivatedStepIndex >= stepIndex,
        activeStep,
        maxActivatedStepIndex,
        ...wizardProps,
      }}
    >
      {children}
    </WizardStepContext.Provider>
  );
};

export const useWizardStep = () => {
  const context = useContext(WizardStepContext);
  if (context === undefined) {
    throw new Error("useWizardStep must be used within a WizardStepProvider");
  }
  return context;
};
