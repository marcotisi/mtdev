import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { Wizard, useWizardStep, useWizard, WizardProps } from "../src";

afterEach(cleanup);
afterEach(jest.clearAllMocks);

describe("@mtdev/react-wizard", () => {
  const StepOne: React.FC = () => {
    const { isActive, stepIndex, hasBeenActive } = useWizardStep();

    return (
      <div data-testid="one">
        <p>Step one</p>
        <p>
          My index is <span data-testid="index-one">{stepIndex}</span>
        </p>
        {isActive && <span data-testid="index-one-active">I'm active</span>}
        {hasBeenActive && (
          <span data-testid="index-one-has-been-active">I've been active</span>
        )}
      </div>
    );
  };

  const StepTwo: React.FC = () => {
    const { isActive, stepIndex, hasBeenActive } = useWizardStep();

    return (
      <div data-testid="two">
        <p>Step two</p>
        <p>
          My index is <span data-testid="index-two">{stepIndex}</span>
        </p>
        {isActive && <span data-testid="index-two-active">I'm active</span>}
        {hasBeenActive && (
          <span data-testid="index-two-has-been-active">I've been active</span>
        )}
      </div>
    );
  };

  const StepThree: React.FC = () => {
    const { isActive, stepIndex, hasBeenActive } = useWizardStep();

    return (
      <div data-testid="three">
        <p>Step three</p>
        <p>
          My index is <span data-testid="index-three">{stepIndex}</span>
        </p>
        {isActive && <span data-testid="index-three-active">I'm active</span>}
        {hasBeenActive && (
          <span data-testid="index-three-has-been-active">
            I've been active
          </span>
        )}
      </div>
    );
  };

  const WizardFooter: React.FC = () => {
    const {
      activeStep,
      maxActivatedStepIndex,
      nextStep,
      previousStep,
      moveToStep,
      resetToStep,
    } = useWizard();

    return (
      <div data-testid="footer">
        <p>
          Active step: <span data-testid="active-step">{activeStep}</span>
        </p>
        <p>
          Max activated step:
          <span data-testid="max-activated-step">{maxActivatedStepIndex}</span>
        </p>
        <button data-testid="previous-step" onClick={() => previousStep()}>
          Previous Step
        </button>
        <button data-testid="next-step" onClick={() => nextStep()}>
          Next Step
        </button>
        <button data-testid="move-to-step-three" onClick={() => moveToStep(2)}>
          Move to step three
        </button>
        <button data-testid="reset-to-step-two" onClick={() => resetToStep(1)}>
          Reset to step two
        </button>
      </div>
    );
  };

  const MyWizard: React.FC<WizardProps> = ({ children, ...props }) => (
    <Wizard {...props}>
      <Wizard.Steps>
        <StepOne />
        <StepTwo />
        <StepThree />
      </Wizard.Steps>
      <WizardFooter />
    </Wizard>
  );

  it("mounts", () => {
    render(<MyWizard />);
  });

  it("renders first step only", () => {
    const wizard = render(<MyWizard />);

    expect(wizard.queryByTestId("index-one-active")).toBeTruthy();
    expect(wizard.queryByTestId("index-two-active")).toBeNull();
    expect(wizard.queryByTestId("index-three-active")).toBeNull();
  });

  it("honors initialStepIndex parameter", () => {
    const wizard = render(<MyWizard initialStepIndex={1} />);

    expect(wizard.queryByTestId("index-one-active")).toBeNull();
    expect(wizard.queryByTestId("index-two-active")).toBeTruthy();
    expect(wizard.queryByTestId("index-three-active")).toBeNull();
  });

  it("navigates correctly between steps", () => {
    const wizard = render(<MyWizard />);

    expect(wizard.queryByTestId("index-one-active")).toBeTruthy();

    fireEvent.click(wizard.queryByTestId("next-step")!);

    expect(wizard.queryByTestId("index-one-active")).toBeNull();
    expect(wizard.queryByTestId("index-two-active")).toBeTruthy();
    expect(wizard.queryByTestId("index-three-active")).toBeNull();

    fireEvent.click(wizard.queryByTestId("previous-step")!);

    expect(wizard.queryByTestId("index-one-active")).toBeTruthy();
    expect(wizard.queryByTestId("index-two-active")).toBeNull();
    expect(wizard.queryByTestId("index-three-active")).toBeNull();

    fireEvent.click(wizard.queryByTestId("move-to-step-three")!);

    expect(wizard.queryByTestId("index-one-active")).toBeNull();
    expect(wizard.queryByTestId("index-two-active")).toBeNull();
    expect(wizard.queryByTestId("index-three-active")).toBeTruthy();

    fireEvent.click(wizard.queryByTestId("reset-to-step-two")!);

    expect(wizard.queryByTestId("index-one-active")).toBeNull();
    expect(wizard.queryByTestId("index-two-active")).toBeTruthy();
    expect(wizard.queryByTestId("index-three-active")).toBeNull();
  });

  it("gets the correct step index", () => {
    const wizard = render(<MyWizard />);

    expect(wizard.queryByTestId("index-one")!.textContent).toBe("0");

    fireEvent.click(wizard.queryByTestId("next-step")!);

    expect(wizard.queryByTestId("index-two")!.textContent).toBe("1");

    fireEvent.click(wizard.queryByTestId("next-step")!);

    expect(wizard.queryByTestId("index-three")!.textContent).toBe("2");
  });

  it("gets the correct active step number", () => {
    const wizard = render(<MyWizard />);

    expect(wizard.queryByTestId("active-step")!.textContent).toBe("0");

    fireEvent.click(wizard.queryByTestId("next-step")!);

    expect(wizard.queryByTestId("active-step")!.textContent).toBe("1");

    fireEvent.click(wizard.queryByTestId("previous-step")!);

    expect(wizard.queryByTestId("active-step")!.textContent).toBe("0");

    fireEvent.click(wizard.queryByTestId("move-to-step-three")!);

    expect(wizard.queryByTestId("active-step")!.textContent).toBe("2");

    fireEvent.click(wizard.queryByTestId("reset-to-step-two")!);

    expect(wizard.queryByTestId("active-step")!.textContent).toBe("1");
  });

  it("gets the correct max activated step number", () => {
    const wizard = render(<MyWizard />);

    expect(wizard.queryByTestId("max-activated-step")!.textContent).toBe("0");

    fireEvent.click(wizard.queryByTestId("next-step")!);

    expect(wizard.queryByTestId("max-activated-step")!.textContent).toBe("1");

    fireEvent.click(wizard.queryByTestId("previous-step")!);

    expect(wizard.queryByTestId("max-activated-step")!.textContent).toBe("1");

    fireEvent.click(wizard.queryByTestId("move-to-step-three")!);

    expect(wizard.queryByTestId("max-activated-step")!.textContent).toBe("2");

    fireEvent.click(wizard.queryByTestId("reset-to-step-two")!);

    expect(wizard.queryByTestId("max-activated-step")!.textContent).toBe("1");
  });

  it("gets the correct hasBeenActive flag", () => {
    const wizard = render(<MyWizard />);

    expect(wizard.queryByTestId("index-one-has-been-active")).toBeTruthy();
    expect(wizard.queryByTestId("index-two-has-been-active")).toBeNull();
    expect(wizard.queryByTestId("index-three-has-been-active")).toBeNull();

    fireEvent.click(wizard.queryByTestId("next-step")!);

    expect(wizard.queryByTestId("index-one-has-been-active")).toBeTruthy();
    expect(wizard.queryByTestId("index-two-has-been-active")).toBeTruthy();
    expect(wizard.queryByTestId("index-three-has-been-active")).toBeNull();

    fireEvent.click(wizard.queryByTestId("previous-step")!);

    expect(wizard.queryByTestId("index-one-has-been-active")).toBeTruthy();
    expect(wizard.queryByTestId("index-two-has-been-active")).toBeTruthy();
    expect(wizard.queryByTestId("index-three-has-been-active")).toBeNull();

    fireEvent.click(wizard.queryByTestId("move-to-step-three")!);

    expect(wizard.queryByTestId("index-one-has-been-active")).toBeTruthy();
    expect(wizard.queryByTestId("index-two-has-been-active")).toBeTruthy();
    expect(wizard.queryByTestId("index-three-has-been-active")).toBeTruthy();

    fireEvent.click(wizard.queryByTestId("reset-to-step-two")!);

    expect(wizard.queryByTestId("index-one-has-been-active")).toBeTruthy();
    expect(wizard.queryByTestId("index-two-has-been-active")).toBeTruthy();
    expect(wizard.queryByTestId("index-three-has-been-active")).toBeNull();
  });
});
