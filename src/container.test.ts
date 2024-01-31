import { Container } from "./container"

describe("Functor Container", () => {
  it("can host any value", () => {
    expect(Container.of(3).toString())
      .toEqual('Container(3)');
    expect(Container.of('hotdogs').toString())
      .toEqual('Container(hotdogs)');
    expect(Container.of(Container.of({ name: "yoda" })).toString())
      .toEqual('Container(Container({"name":"yoda"}))');
  })
})
