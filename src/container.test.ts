import { Container } from "./container"

describe("Container", () => {
  it("can host any value", () => {
    expect(Container.of(3).inspect())
      .toEqual('Container(3)');
    expect(Container.of('hotdogs').inspect())
      .toEqual('Container("hotdogs")');
    expect(Container.of(Container.of({ name: "yoda" })).inspect())
      .toEqual('Container(Container({"name":"yoda"}))');
  })

  it("can apply any function", () => {
    const toNumber = (literal: string) => parseInt(literal, 10);
    expect(Container.of("2").map(toNumber).inspect()).toEqual('Container(2)');
  })
})
