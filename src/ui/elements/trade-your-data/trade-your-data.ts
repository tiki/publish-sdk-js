/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./trade-your-data.css";
import Html from "./trade-your-data-html";
import { cssVar } from "../../utils/null-safe";

export interface Style {
  /**
   * The text color
   */
  textColor?: string;

  /**
   * The accent text color
   */
  accentColor?: string;

  /**
   * The text font-family
   */
  fontFamily?: string;
}

/**
 * Create the pre-built UI element for the Your Choice banner
 *
 * @param style - The {@link Style} to apply to the element
 */
export function create(style?: Style): HTMLSpanElement {
  const span: HTMLSpanElement = document.createElement("span");
  span.innerHTML = Html();
  span.className = "tiki-trade-your-data";
  cssVar(span, [
    { property: "--tiki-trade-your-data-text-color", value: style?.textColor },
    {
      property: "--tiki-trade-your-data-accent-color",
      value: style?.accentColor,
    },
    {
      property: "--tiki-trade-your-data-font-family",
      value: style?.fontFamily,
    },
  ]);
  return span;
}
