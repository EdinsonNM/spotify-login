import React from "react";
import { render } from "@testing-library/react";
import Root from "./app";

describe("Root component", () => {
  it("should be in the document", () => {
    const { getByText } = render(<Root code="123" />);
    expect(getByText(/Testapp is mounted!/i)).toBeInTheDocument();
  });
});
