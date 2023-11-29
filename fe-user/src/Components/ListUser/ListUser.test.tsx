import { fireEvent, render, waitFor } from "@testing-library/react";
import axios from "axios";
import ListUser from "./ListUser";
import { describe, expect, test } from "@jest/globals";

jest.mock("axios");

describe("ListUser component", () => {
  it("fetches user data and displays it in the table", async () => {
    const mockUserData = {
      userDetails: [
        {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
        },
        // Add more sample user data as needed
      ],
      totalCount: 10, // Sample total count
    };
    axios.get = jest.fn().mockResolvedValueOnce({ data: mockUserData });
    const { getByText } = render(<ListUser />);
    // Wait for the API call to resolve
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(expect.any(String), {
        headers: { "Content-Type": "application/json" },
      });
      // Verify if the user data is displayed in the table
      expect(getByText("John")).toBeInTheDocument();
      expect(getByText("Doe")).toBeInTheDocument();
      expect(getByText("john@example.com")).toBeInTheDocument();
    });
  });

  it("displays an error message if the API call fails", async () => {
    axios.get = jest.fn().mockRejectedValueOnce(new Error("API Error"));

    const { getByText } = render(<ListUser />);

    // Wait for the API call to reject
    await waitFor(() => {
      expect(getByText("Error fetching data")).toBeInTheDocument();
    });
  });

  it("displays the correct number of rows based on pagination settings", async () => {
    const mockUserData = {
      userDetails: [
        // Sample user data
      ],
      totalCount: 15, // Sample total count
    };

    axios.get = jest.fn().mockResolvedValueOnce({ data: mockUserData });

    const { getByText, getByLabelText } = render(<ListUser />);

    // Simulate changing rows per page
    fireEvent.change(getByLabelText("Rows per page"), {
      target: { value: "10" },
    });

    await waitFor(() => {
      // Verify if the table displays the correct number of rows based on pagination
      expect(getByText("John")).toBeInTheDocument();
      expect(getByText("Doe")).toBeInTheDocument();
      // Ensure only 10 rows are visible
      expect(getByText("15 selected")).toBeInTheDocument(); // Assuming 15 rows in total
      expect(getByText("List Of Users")).toBeInTheDocument();
    });
  });

  it("allows selecting rows in the table", async () => {
    const mockUserData = {
      userDetails: [
        {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
        },
        {
          id: 2,
          firstName: "Jane",
          lastName: "Doe",
          email: "jane@example.com",
        },
      ],
      totalCount: 2,
    };

    axios.get = jest.fn().mockResolvedValueOnce({ data: mockUserData });

    const { getByLabelText } = render(<ListUser />);

    // Wait for the table to render
    await waitFor(() => {
      const checkbox1 = getByLabelText("Checkbox for John");
      const checkbox2 = getByLabelText("Checkbox for Jane");

      // Simulate selecting rows
      fireEvent.click(checkbox1);
      fireEvent.click(checkbox2);

      expect(checkbox1).toBeChecked();
      expect(checkbox2).toBeChecked();
    });
  });
});
