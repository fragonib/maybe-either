interface Inspectable {
  inspect(): string;
}

export class Container<T> implements Inspectable {
  $value: T;

  constructor(value: T) {
    this.$value = value;
  }

  static of<T>(value: T): Container<T> {
    return new Container(value);
  }

  map<R>(fn: (value: T) => R): Container<R> {
    return Container.of(fn(this.$value));
  };

  toString() {
    return `Container(${this.$value})`;
  }

  inspect() {
    const valueInspect = 
      typeof this.$value === "object" && 'inspect' in (this.$value ?? {}) ?
        (this.$value as unknown as Inspectable).inspect() :
        JSON.stringify(this.$value)
    return `Container(${valueInspect})`;
  }

}