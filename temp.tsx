function toCamelCase(str: string): string {
  return str
    .replace(/([-_][a-z])/gi, (match) =>
      match.toUpperCase().replace('-', '').replace('_', '')
    );
}

// Example usage:
console.log(toCamelCase("hello_world")); // Output: "helloWorld"
console.log(toCamelCase("convert-this-string")); // Output: "convertThisString"