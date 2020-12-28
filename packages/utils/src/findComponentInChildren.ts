import React, { JSXElementConstructor, ReactElement, ReactNode } from "react";
import { isReactElement } from "./isReactElement";

export const findComponentInChildren = <
  T extends string | JSXElementConstructor<any> =
    | string
    | JSXElementConstructor<any>
>(
  children: ReactNode,
  component: T,
): ReactElement | undefined =>
  React.Children.toArray(children)
    .filter(isReactElement)
    .find(child => child.type === component);
