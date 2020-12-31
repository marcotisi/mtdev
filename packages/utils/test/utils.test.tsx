import { isReactElement } from "../src";
import React from "react";
import { findComponentInChildren } from "../dist";
import { render } from "@testing-library/react";

describe("@mtdev/utils", () => {
  describe("isReactElement", () => {
    it("returns true for a React component", () => {
      const ReactComponent: React.FC = () => {
        return null;
      };
      expect(isReactElement(<ReactComponent />)).toBe(true);
    });
    it("returns false for a non-React component", () => {
      expect(isReactElement({})).toBe(false);
    });
  });

  describe("findComponentInChildren", () => {
    const ComponentOne: React.FC = () => (
      <div data-testid="component-one">Component one</div>
    );
    const ComponentTwo: React.FC = () => (
      <div data-testid="component-two">Component two</div>
    );
    const ComponentThree: React.FC = () => (
      <div data-testid="component-three">Component three</div>
    );
    const Container: React.FC = ({ children }) =>
      findComponentInChildren(children, ComponentOne) || null;
    it("finds the correct component", () => {
      const container = render(
        <Container>
          <ComponentOne />
          <ComponentTwo />
          <ComponentThree />
        </Container>,
      );

      expect(container.queryByTestId("component-one")).toBeTruthy();
      expect(container.queryByTestId("component-two")).toBeNull();
      expect(container.queryByTestId("component-three")).toBeNull();
    });
    it("returns undefined if the component has not been found", () => {
      const container = render(
        <Container>
          <ComponentTwo />
          <ComponentThree />
        </Container>,
      );

      expect(container.queryByTestId("component-one")).toBeNull();
      expect(container.queryByTestId("component-two")).toBeNull();
      expect(container.queryByTestId("component-three")).toBeNull();
    });
  });
});
