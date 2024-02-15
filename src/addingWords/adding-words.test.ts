import { solve } from "./adding-words";

describe('Adding Words', () => {
  it('should solve calculation', () => {
    const solution = solve([
      "def foo 3",
      "calc foo + bar =",
      "def bar 7",
      "def programming 10",
      "calc foo + bar =",
      "def is 4",
      "def fun 8",
      "calc programming - is + fun =",
      "def fun 1",
      "calc programming - is + fun =",
      "clear",
    ]);
    
    expect(solution).toEqual([
      "unknown", 
      "programming", 
      "unknown", 
      "bar"
    ]);
  });
});
