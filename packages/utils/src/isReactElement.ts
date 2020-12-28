import { ReactElement } from "react";

export const isReactElement = (child: {}): child is ReactElement => {
  return child.hasOwnProperty("type");
};
