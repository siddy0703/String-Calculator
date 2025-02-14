import React, { useState } from "react";
import { add } from "../utils/StringCalculator";

const StringCalculator = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const handleCalculate = () => {
        try {
            setError("");  // Clear previous errors
            const sanitizedInput = input.replace(/\\n/g, "\n"); // Convert literal "\n" to real newline
            setResult(add(sanitizedInput)); // Pass fixed input
        } catch (err) {
            setResult(null);
            setError(err.message);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2>String Calculator</h2>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter numbers"
                style={{ padding: "10px", width: "300px" }}
            />
            <button onClick={handleCalculate} style={{ marginLeft: "10px", padding: "10px 20px" }}>
                Calculate
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {result !== null && <p>Sum: {result}</p>}
        </div>
    );
};

export default StringCalculator;