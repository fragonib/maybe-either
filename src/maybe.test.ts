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


type Person = {
  name: string;
  age?: number;
}

export const add = (a: number) => (b: number) => a + b;
export const match = (what: RegExp) => (str: string) => what.test(str);

export type Obj = { [key: string]: any };
export const prop = <T>(name: string) => (obj: Obj): T | undefined => obj[name];

type PropType<T, K extends keyof T> = T[K];
const name = 'age';
const person: Person = { name: 'Dinah', age: 14 }
const age: PropType<Person, typeof name> = 5;
const age2: number | undefined = prop<number>('age')(person)

