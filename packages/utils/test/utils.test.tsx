import { isReactElement } from "../src";
import React from "react";

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
});
