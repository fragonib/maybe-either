import { readInput, solve } from "./adding-words";

describe('Adding Words', () => {
  it('should work', () => {
    const solution = solve(readInput());
    
    expect(solution).toBe([
      "unknown", 
      "programming", 
      "unknown", 
      "bar"
    ]);
  });
});
