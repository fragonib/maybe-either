import { Inspectable } from "./container";
import { Functor } from "./functional";

export type Maybe<T> = Nothing<T> | Just<T>;

export namespace Maybe {
  export const of = <T>(value: T): Maybe<NonNullable<T>> => {
    const a = value ?  
      new Just(value as unknown as NonNullable<T>) :
      new Nothing<NonNullable<T>>();
      return a as Maybe<NonNullable<T>>;
  }
}

export class Just<T> implements Inspectable, Functor<T> {

  $value: NonNullable<T>;

  constructor(value: NonNullable<T>) {
    this.$value = value;
  }

  map<R>(fn: (value: NonNullable<T>) => R): Maybe<R> {
    return Maybe.of(fn(this.$value));
  }

  chain<R>(fn: (value: NonNullable<T>) => Maybe<R>) {
    return fn(this.$value);
  }

  getOrElse(defaultValue: NonNullable<T>): NonNullable<T> {
    return this.$value;
  }

  inspect() {
    const valueInspect =
      typeof this.$value === "object" && 'inspect' in this.$value ?
        (this.$value as unknown as Inspectable).inspect() :
        JSON.stringify(this.$value)
    return `${Just.name}(${valueInspect})`;
  }
}


export class Nothing<T> implements Inspectable, Functor<T> {

  map<R>(fn: (value: NonNullable<T>) => R): Maybe<R> {
    return new Nothing<R>();
  }

  chain<R>(fn: (value: NonNullable<T>) => Maybe<R>) {
    return new Nothing<R>();
  }

  getOrElse(defaultValue: NonNullable<T>): NonNullable<T> {
    return defaultValue;
  }

  inspect() {
    return `${Nothing.name}`;
  }
}

export const safeHead = <T>(list: T[]): Maybe<T> => Maybe.of(list[0]);