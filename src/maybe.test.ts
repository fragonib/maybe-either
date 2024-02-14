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
        .map(prop<Person>('age'))
        .map(add(10))
        .inspect()
    ).toBe('Nothing');
  });

  it("can host any value", () => {
    expect(
      Maybe.of({ name: 'Dinah', age: 14 })
        .map(prop<Person>('age'))
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

type PropType<T, K extends keyof T> = T[K];
export const prop = <T>(name: keyof T) => (obj: T): PropType<T, typeof name> => obj[name]

const name = 'age';
let pepe: PropType<Person, typeof name> = 5;
const person: Person = { name: 'Dinah', age: 14 }
const a: string | number | undefined = prop<Person>('age')(person)

