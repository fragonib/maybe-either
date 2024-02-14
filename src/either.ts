export type Either<L, R> = Left<L> | Right<R>;

export class Left<L>  {

  $error: L;

  constructor(error: L) {
    this.$error = error;
  }

  static of<LEFT>(error: LEFT) {
    return new Left(error);
  }

  map(fn: (i: any) => any) {
    return this;
  }

  toString() {
    return `Left(${this.$error})`;
  }
}

export class Right<R> {

  $value: R;

  constructor(value: R) {
    this.$value = value;
  }

  static of<R>(value: R) {
    return new Right(value);
  }

  map<TARGET>(fn: (i: R) => TARGET) {
    return Right.of(fn(this.$value));
  }

  toString() {
    return `Right(${this.$value})`;
  }
}
