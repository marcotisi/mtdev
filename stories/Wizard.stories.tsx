import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { action } from "@storybook/addon-actions";
import { Wizard, WizardProps } from "../packages/react-wizard/src";
import { useWizard, useWizardStep } from "../packages/react-wizard/src";

export default {
  title: "Wizard",
  component: Wizard,
  args: {
    onChange: action("onChange"),
  },
  argTypes: {
    initialStepIndex: {
      table: {
        disable: true,
      },
    },
    onChange: {
      table: {
        disable: true,
      },
    },
  },
} as Meta;

const Button: React.FC<React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>> = ({ children, ...props }) => (
  <button
    {...props}
    style={{
      flexGrow: 1,
      backgroundColor: "#3b82f6",
      color: "white",
      fontSize: "1rem",
      border: 0,
      outline: "none",
      padding: "10px",
    }}
  >
    {children}
  </button>
);

const Step: React.FC<{
  color: string;
}> = ({ color }) => {
  const { stepIndex, isActive } = useWizardStep();

  return isActive ? (
    <div
      style={{
        backgroundColor: color,
        color: "white",
        height: "60vh",
        display: "grid",
        placeItems: "center",
        fontSize: "5rem",
      }}
    >
      {stepIndex + 1}
    </div>
  ) : null;
};

const Header: React.FC = () => {
  const { activeStep, maxActivatedStepIndex, stepsCount } = useWizard();

  return (
    <>
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Step {activeStep + 1} of {stepsCount}
      </h1>
      <h3
        style={{
          textAlign: "center",
        }}
      >
        Max activated step: {maxActivatedStepIndex + 1}
      </h3>
    </>
  );
};

const Footer: React.FC = () => {
  const { nextStep, previousStep, moveToStep, resetToStep } = useWizard();

  return (
    <div
      style={{
        display: "grid",
        marginTop: "10px",
        gridGap: "5px",
        gridAutoFlow: "column",
      }}
    >
      <Button onClick={() => previousStep()}>Previous Step</Button>
      <Button onClick={() => moveToStep(2)}>Move to step three</Button>
      <Button onClick={() => resetToStep(1)}>Reset to step two</Button>
      <Button onClick={() => nextStep()}>Next Step</Button>
    </div>
  );
};

const Template: Story<WizardProps> = args => (
  <Wizard {...args}>
    <Header />
    <Wizard.Steps>
      <Step color="#8b5cf6" />
      <Step color="#06b6d4" />
      <Step color="#10b981" />
      <Step color="#ef4444" />
      <Step color="#64748b" />
    </Wizard.Steps>
    <Footer />
  </Wizard>
);

export const Default = Template.bind({});
Default.args = {};

export const StartFromStepThree = Template.bind({});
StartFromStepThree.args = {
  initialStepIndex: 2,
};
