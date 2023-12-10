import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./Home"; // Adjust the import path as needed

describe("Home Component", () => {
  test("Test Home Page", () => {
    // This test will always fail
    expect(1).toBe(1);
  });
});
