export class Container<T> {
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

}

Object.prototype.toString = function () {
  return JSON.stringify(this);
};