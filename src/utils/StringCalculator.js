export function add(numbers) {
    if (!numbers) return 0;

    let delimiters = [",", "\n"];
    let input = numbers;

    // Check for custom delimiter
    if (numbers.startsWith("//")) {
        const delimiterEndIndex = numbers.indexOf("\n");
        let customDelimiter = numbers.substring(2, delimiterEndIndex);

        // Handle multiple delimiters like //[***][%%]
        if (customDelimiter.startsWith("[") && customDelimiter.endsWith("]")) {
            delimiters = customDelimiter.match(/\[(.*?)\]/g).map(d => d.slice(1, -1));
        } else {
            delimiters = [customDelimiter];
        }

        input = numbers.substring(delimiterEndIndex + 1);
    }

    // Build regex dynamically to handle multiple delimiters
    const delimiterRegex = new RegExp(delimiters.map(d => escapeRegex(d)).join("|"), "g");
    const numberArray = input.split(delimiterRegex).map(Number);

    // Handle negative numbers
    const negatives = numberArray.filter(num => num < 0);
    if (negatives.length > 0) {
        throw new Error(`negative numbers not allowed: ${negatives.join(",")}`);
    }

    // Calculate sum
    return numberArray.reduce((sum, num) => sum + num, 0);
}

// Helper function to escape regex special characters
function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}