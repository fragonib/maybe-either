import { Maybe, safeHead } from "./maybe";

describe("Functor Container", () => {
  it("can host any value", () => {
    expect(
      Maybe.of('Malkovich Malkovich')
      .map(match(/a/ig))
      .toString()
      ).toEqual('Just(True)');
  });
  
  it("can host any value", () => {
    expect(
      Maybe.of<string>(null)
      .map(match(/a/ig))
      .toString()
      ).toEqual('Nothing');
  });

  it("can host any value", () => {
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

  test("compose with maybe", async () => {

    const streetName = compose(map(prop('street')), safeHead, prop('addresses'));

    expect(streetName({ addresses: [] }).toString()).toEqual('Nothing');
    expect(streetName({ addresses: [{ street: 'Shady Ln.', number: 4201 }] }).toString()).toEqual('Just(Shady Ln.)');

  });

  const match = (what: RegExp) => (str: string) => what.test(str);
  const add = (a: number) => (b: number) => a + b;
  const prop = (name: string) => (obj: any) => obj[name];

});


