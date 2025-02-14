import { render, screen, fireEvent } from "@testing-library/react";
import StringCalculator from "../components/StringCalculator";

describe("StringCalculator Component", () => {
    
    // Test 1: Check if the component renders correctly
    test("renders correctly", () => {
        render(<StringCalculator />); // Render the component
        
        // Check if the title exists
        expect(screen.getByText(/String Calculator/i)).toBeInTheDocument();
        
        // Check if the input box exists
        expect(screen.getByPlaceholderText(/Enter numbers/i)).toBeInTheDocument();
    });

    // Test 2: Check if the calculation works correctly for a simple input
    test("calculates sum correctly", () => {
        render(<StringCalculator />); // Render the component
        
        const input = screen.getByPlaceholderText(/Enter numbers/i); // Get input field
        const button = screen.getByText(/Calculate/i); // Get the calculate button
        
        // Simulate user typing "1,2,3" in the input field
        fireEvent.change(input, { target: { value: "1,2,3" } });

        // Click the calculate button
        fireEvent.click(button);

        // Check if the correct sum (6) is displayed
        expect(screen.getByText(/Sum: 6/i)).toBeInTheDocument();
    });

    // Test 3: Check if the component properly displays an error message for negative numbers
    test("displays error for negative numbers", () => {
        render(<StringCalculator />); // Render the component
        
        const input = screen.getByPlaceholderText(/Enter numbers/i); // Get input field
        const button = screen.getByText(/Calculate/i); // Get the calculate button
        
        // Simulate user typing "1,-2,3,-4" in the input field
        fireEvent.change(input, { target: { value: "1,-2,3,-4" } });

        // Click the calculate button
        fireEvent.click(button);

        // Check if the correct error message is displayed
        expect(screen.getByText(/negative numbers not allowed: -2,-4/i)).toBeInTheDocument();
    });

});