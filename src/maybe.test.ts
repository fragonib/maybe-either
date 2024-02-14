import { Maybe } from "./maybe";

describe("Maybe Container", () => {

  it("can contain not null values", () => {
    expect(
      Maybe.of('Fran')
        .map(match(/a/ig))
        .inspect()
    ).toBe('Just(true)');
  });

  it("can deal with nulls", () => {
    expect(
      Maybe.of(null)
        .map(match(/a/ig))
        .inspect()
    ).toBe('Nothing');
  });

  it("can deal when map returns a null", () => {
    expect(
      Maybe.of({ name: 'Boris' })
        .map(prop<number>('age'))
        .map(add(10))
        .inspect()
    ).toBe('Nothing');
  });

  it("can host any value", () => {
    expect(
      Maybe.of({ name: 'Dinah', age: 14 })
        .map(prop<number>('age'))
        .map(add(10))
        .inspect()
    ).toBe('Just(24)');
  });

});

export const add = (a: number) => (b: number) => a + b;
export const match = (what: RegExp) => (str: string) => what.test(str);
export const prop = <T>(name: string) => (obj: Record<string, any>) => obj[name] as T