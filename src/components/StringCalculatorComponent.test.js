import { render, screen, fireEvent } from "@testing-library/react";
import StringCalculator from "../components/StringCalculator";

describe("StringCalculator Component", () => {
    test("renders correctly", () => {
        render(<StringCalculator />);
        expect(screen.getByText(/String Calculator/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter numbers/i)).toBeInTheDocument();
    });

    test("calculates sum correctly", () => {
        render(<StringCalculator />);
        const input = screen.getByPlaceholderText(/Enter numbers/i);
        const button = screen.getByText(/Calculate/i);

        fireEvent.change(input, { target: { value: "1,2,3" } });
        fireEvent.click(button);

        expect(screen.getByText(/Sum: 6/i)).toBeInTheDocument();
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