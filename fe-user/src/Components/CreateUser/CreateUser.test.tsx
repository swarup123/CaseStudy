import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import CreateUser from "./CreateUser";
import { describe, expect, test } from "@jest/globals";

// Mock the axios.post method for testing
jest.mock("axios");

describe("CreateUser component", () => {
  it("should create a new user", async () => {
    // Mock successful response from API call
    axios.post = jest.fn().mockResolvedValue({
      status: 200,
      data: {
        statusCode: 200,
        userDetails: {
          firstName: "John",
        },
      },
    });

    const { getByLabelText, getByText } = render(<CreateUser />);

    // Fill in form fields
    fireEvent.change(getByLabelText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(getByLabelText("Last Name"), { target: { value: "Doe" } });
    fireEvent.change(getByLabelText("Email Address"), {
      target: { value: "john@example.com" },
    });

    // Submit form
    fireEvent.click(getByText("Create User"));

    // Wait for the API call to resolve and check if success message is displayed
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
      });
      expect(getByText("User created Successfully- John")).toBeInTheDocument();
    });
  });

  it("should handle duplicate user creation", async () => {
    // Mock response for duplicate user creation
    axios.post = jest.fn().mockResolvedValue({
      status: 200,
      data: {
        statusCode: 204,
        success: "User already exists",
      },
    });

    const { getByLabelText, getByText } = render(<CreateUser />);

    // Fill in form fields
    fireEvent.change(getByLabelText("First Name"), {
      target: { value: "Jane" },
    });
    fireEvent.change(getByLabelText("Last Name"), { target: { value: "Doe" } });
    fireEvent.change(getByLabelText("Email Address"), {
      target: { value: "jane@example.com" },
    });
    // Submit form
    fireEvent.click(getByText("Create User"));

    // Wait for the API call to resolve and check if duplicate message is displayed
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
      });
      expect(getByText("Duplicate - User already exists")).toBeInTheDocument();
    });
  });
});
