import { compose, map } from "./functional";
import { Maybe, safeHead } from "./maybe";

describe("Maybe Container", () => {
  it("can host any value", () => {
    expect(
      Maybe.of('Fran')
        .map(match(/a/ig))
        .toString()
    ).toEqual('Just(True)');
  });

  it("can deal with nulls", () => {
    expect(
      Maybe.of<string>(null)
        .map(match(/a/ig))
        .toString()
    ).toEqual('Nothing');
  });

  it("can deal when map returns a null", () => {
    expect(
      Maybe.of({ name: 'Boris' })
        .map(prop('age'))
        .map(add(10))
        .toString()
    ).toEqual('Nothing');
  });

  it("can host any value", () => {
    expect(
      Maybe.of({ name: 'Dinah', age: 14 })
        .map(prop('age'))
        .map(add(10))
        .toString()
    ).toEqual('Just(24)');
  })

  it("can be composed", async () => {
    const streetName = compose(
      map(prop('street')),
      safeHead,
      prop('addresses')
    );

    expect(streetName({ addresses: [] }).toString()).toEqual('Nothing');
    expect(streetName({ addresses: [{ street: 'Shady Ln.', number: 4201 }] }).toString()).toEqual('Just(Shady Ln.)');

  });

  const match = (what: RegExp) => (str: string) => what.test(str);
  const add = (a: number) => (b: number) => a + b;
  const prop = (name: string) => (obj: Record<string, any>) => obj[name];

});


