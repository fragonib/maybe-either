type Nullable<T> = T | null;

export class Maybe<T> {

  $value: Nullable<T>;

  static of<T>(value: Nullable<T>): Maybe<T> {
    return new Maybe(value);
  }

  constructor(value: Nullable<T>) {
    this.$value = value;
  }

  map<R>(fn: (value: NonNullable<T>) => R): Maybe<R> {
    if (this.$value === null || this.$value === undefined) 
      return this as unknown as Maybe<R> 
    else 
      return Maybe.of(fn(this.$value));
  }

  toString() {
    return this.$value === null || this.$value === undefined ? 'Nothing' : `Just(${this.$value})`;
  }
}

export const safeHead = <T>(list: T[]) => Maybe.of(list[0]);
