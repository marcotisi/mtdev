import React, { FC, useContext } from "react";

export type WizardContext = {
  stepsCount: number;
  activeStep: number;
  maxActivatedStepIndex: number;
  moveToStep: (stepIndex: number) => void;
  resetToStep: (stepIndex: number) => void;
  nextStep: () => void;
  previousStep: () => void;
};

export type WizardOnChangeHandler = (props: {
  newStepIndex: number;
  previousStepIndex: number;
  maxActivatedStepIndex: number;
}) => void;

export const WizardContext = React.createContext<WizardContext | undefined>(
  undefined,
);

export type WizardProviderProps = {
  stepsCount: number;
  initialStepIndex?: number;
  onChange?: WizardOnChangeHandler;
};

export const WizardProvider: FC<WizardProviderProps> = ({
  stepsCount,
  initialStepIndex = 0,
  onChange,
  children,
}) => {
  const [activeStep, setActiveStep] = React.useState(initialStepIndex);
  const [maxActivatedStepIndex, setMaxActivatedStepIndex] = React.useState(
    initialStepIndex,
  );

  const goToStep = (
    stepIndex: number,
    { resetMaxStepIndex = false }: { resetMaxStepIndex?: boolean } = {},
  ) => {
    if (activeStep === stepIndex || stepIndex > stepsCount - 1) {
      return;
    }
    const newMaxStepIndex = resetMaxStepIndex
      ? stepIndex
      : Math.max(stepIndex, maxActivatedStepIndex);

    if (onChange) {
      onChange({
        previousStepIndex: activeStep,
        newStepIndex: stepIndex,
        maxActivatedStepIndex: newMaxStepIndex,
      });
    }

    setActiveStep(stepIndex);
    setMaxActivatedStepIndex(newMaxStepIndex);
  };

  const nextStep = () => {
    goToStep(activeStep + 1);
  };

  const previousStep = () => {
    goToStep(Math.max(activeStep - 1, 0));
  };

  const moveToStep = (stepIndex: number) => {
    goToStep(stepIndex);
  };

  const resetToStep = (stepIndex: number) => {
    goToStep(stepIndex, { resetMaxStepIndex: true });
  };

  return (
    <WizardContext.Provider
      value={{
        stepsCount,
        activeStep,
        maxActivatedStepIndex,
        moveToStep,
        nextStep,
        previousStep,
        resetToStep,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error("useWizard must be used within a WizardProvider");
  }
  return context;
};
