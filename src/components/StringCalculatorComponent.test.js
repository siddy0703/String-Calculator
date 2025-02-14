import { render, screen, fireEvent } from "@testing-library/react";
import StringCalculator from "../components/StringCalculator";

describe("StringCalculator Component", () => {
    // Test 1: Checks if the component renders correctly
    test("renders correctly", () => { 
        render(<StringCalculator />);

        // Check if the heading exists
        expect(screen.getByText(/String Calculator/i)).toBeInTheDocument();

        // Check if the input box is present
        expect(screen.getByPlaceholderText(/Enter numbers/i)).toBeInTheDocument();

        // Check if the button exists
        expect(screen.getByText(/Calculate/i)).toBeInTheDocument();
    });

    // Test 2: Ensures correct calculation for simple input
    test("calculates sum correctly", () => {
        render(<StringCalculator />);

        // Get input box and button elements
        const input = screen.getByPlaceholderText(/Enter numbers/i);
        const button = screen.getByText(/Calculate/i);

        // Simulate user typing "1,2,3" into the input field
        fireEvent.change(input, { target: { value: "1,2,3" } });

        // Click the "Calculate" button
        fireEvent.click(button);

        // Expect to see the correct sum displayed
        expect(screen.getByText(/Sum: 6/i)).toBeInTheDocument();
    });

    // Test 3: Ensures the component correctly handles new lines (`\n`)
    test("handles newline as a separator", () => {
        render(<StringCalculator />);

        const input = screen.getByPlaceholderText(/Enter numbers/i);
        const button = screen.getByText(/Calculate/i);

        // Simulate user entering values with new line separator
        fireEvent.change(input, { target: { value: "1\n2,3" } });
        fireEvent.click(button);

        // Expected sum: 1 + 2 + 3 = 6
        expect(screen.getByText(/Sum: 6/i)).toBeInTheDocument();
    });

    // Test 4: Handles custom delimiter correctly
    test("supports custom delimiter", () => {
        render(<StringCalculator />);

        const input = screen.getByPlaceholderText(/Enter numbers/i);
        const button = screen.getByText(/Calculate/i);

        // Custom delimiter `;` with format `//;\n1;2`
        fireEvent.change(input, { target: { value: "//;\n1;2" } });
        fireEvent.click(button);

        // Expected sum: 1 + 2 = 3
        expect(screen.getByText(/Sum: 3/i)).toBeInTheDocument();
    });

    test("displays error for negative numbers", () => {
        render(<StringCalculator />);
        const input = screen.getByPlaceholderText(/Enter numbers/i);
        const button = screen.getByText(/Calculate/i);

        fireEvent.change(input, { target: { value: "1,-2,3,-4" } });
        fireEvent.click(button);

        expect(screen.getByText(/negative numbers not allowed: -2,-4/i)).toBeInTheDocument();
    });
});