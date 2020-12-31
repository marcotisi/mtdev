# React Hooks Wizard

[![Stable release](https://img.shields.io/npm/v/@mtdev/react-wizard.svg)](https://npm.im/@mtdev/react-wizard)
[![codecov](https://codecov.io/gh/marcotisi/mtdev/branch/main/graph/badge.svg?token=57DD0LENB1&flag=react-wizard)](https://codecov.io/gh/marcotisi/mtdev/tree/main/packages/react-wizard/src)

A UI-free React Wizard package. Stop overriding css/components and build your own Wizard!

## Quick start

1. Install `@mtdev/react-wizard`:

   ```console
   npm install @mtdev/react-wizard

   yarn add @mtdev/react-wizard
   ```

1. Create your wizard!

   ```typescript jsx
   import { Wizard, useWizardStep, useWizardStep } from "@mtdev/react-wizard";

   const Step = () => {
     const { isActive, stepIndex } = useWizardStep();

     return isActive ? <div>Step {stepIndex + 1}</div> : null;
   };

   const Header = () => {
     const { activeStep, stepsCount } = useWizard();

     return (
       <h1>
         Step {activeStep + 1} of {stepsCount}
       </h1>
     );
   };

   const Footer = () => {
     const { nextStep, previousStep } = useWizard();

     return (
       <>
         <button onClick={previousStep}>Previous step</button>
         <button onClick={nextStep}>Next step</button>
       </>
     );
   };

   export default MyWizard = () => (
     <Wizard>
       <Header />
       <Wizard.Steps>
         <Step />
         <Step />
         <Step />
         <Step />
         <Step />
       </Wizard.Steps>
       <Footer />
     </Wizard>
   );
   ```

## Documentation

### `Wizard`

A `Wizard` component must have one `Wizard.Steps` child which contains the actual steps.
It is used to count the number of steps and to wrap each step with a `WizardStepProvider`.

- `initialStepIndex`: the index of the initial step
- `onChange`: a function called every time the current step changes

### `useWizard`

It's a hook that can be used either inside a step or to create a header or a footer.

- `stepsCount`: the total number or steps
- `activeStep`: the index of the current active step
- `maxActivatedStepIndex`: the index of the maximum activated step
- `moveToStep(stepIndex)`: a function used to jump to a specific step
- `resetToStep(stepIndex)`: a function used to jump to a specific step and reset `maxActivatedStepIndex` to that step
- `nextStep()`: a function to go to the next step
- `previousStep()`: a function to go to the previous step

### `useWizardStep`

It's a hook that can be used inside a step. It returns the same properties and functions of `useWizard` plus a some additional properties:

- `isActive`: a boolean indicating if the step is active
- `hasBeenActive`: a boolean indicating if the step has been active
- `stepIndex`: the step index

