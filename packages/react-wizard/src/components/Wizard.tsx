import React from "react";
import { findComponentInChildren } from "@mtdev/utils";
import {
  WizardOnChangeHandler,
  WizardProvider,
  WizardStepProvider,
} from "../hooks";

export type WizardProps = {
  initialStepIndex?: number;
  onChange?: WizardOnChangeHandler;
};

const Steps: React.FC = ({ children }) => (
  <>
    {React.Children.map(children, (child, index) => (
      <WizardStepProvider stepIndex={index}>{child}</WizardStepProvider>
    ))}
  </>
);

export const Wizard: React.FC<WizardProps> & {
  Steps: typeof Steps;
} = ({ initialStepIndex, onChange, children }) => {
  const wizardStepsComponent = findComponentInChildren(children, Steps);

  if (!wizardStepsComponent) {
    throw new Error("A <Wizard> component must have one <Wizard.Steps> child.");
  }
  return (
    <WizardProvider
      stepsCount={React.Children.count(wizardStepsComponent.props.children)}
      initialStepIndex={initialStepIndex}
      onChange={onChange}
    >
      {children}
    </WizardProvider>
  );
};

Wizard.Steps = Steps;
