import { add } from "../utils/StringCalculator";

describe("StringCalculator", () => {
    // Test 1: Empty string should return 0
    test("returns 0 for an empty string", () => {
        expect(add("")).toBe(0);
    });

    // Test 2: Single number should return the number itself
    test("returns number itself if one number is provided", () => {
        expect(add("1")).toBe(1);
    });

    // Test 3: Two numbers separated by a comma should return their sum
    test("returns the sum of two numbers separated by a comma", () => {
        expect(add("1,5")).toBe(6);
    });

    test("handles newline as a separator", () => {
        expect(add("1\n2,3")).toBe(6);
    });

    test("supports custom single-character delimiter", () => {
        expect(add("//;\n1;2")).toBe(3);
    });

    test("supports custom multi-character delimiter", () => {
        expect(add("//[***]\n1***2***3")).toBe(6);
    });

    test("supports multiple custom delimiters", () => {
        expect(add("//[*][%]\n1*2%3")).toBe(6);
    });

    test("supports multiple multi-character delimiters", () => {
        expect(add("//[**][%%]\n1**2%%3")).toBe(6);
    });

    test("throws an error if negative numbers are present", () => {
        expect(() => add("1,-2,3,-4")).toThrow("negative numbers not allowed: -2,-4");
    });
});