/* eslint-disable @typescript-eslint/no-explicit-any */
type UnaryFunction = (input: any) => any;

type Composable<Fn> = 
  Fn extends readonly [UnaryFunction]
    ? Fn : Fn extends readonly [any, ...infer Rest extends readonly UnaryFunction[]]
    ? readonly [(arg: ComposeReturn<Rest>) => any, ...Composable<Rest>]
    : never;
type ComposeReturn<Fns extends readonly UnaryFunction[]> = 
  ReturnType<Fns[0]>;
type ComposeParams<Fns> = 
  Fns extends readonly [...any[], infer Last extends UnaryFunction]
    ? Parameters<Last>[0]
    : never;

export const compose = <Fns extends readonly UnaryFunction[]>(
  ...fns: Composable<Fns>
) => {
  return (arg: ComposeParams<Fns>): ComposeReturn<Fns> =>
    fns.reduceRight((acc, cur) => cur(acc), arg) as ComposeReturn<Fns>;
};

export const curry = (fn: Function) => {
  const arity = fn.length;
  return function $curry(...args: any[]): Function {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }
    return fn.call(null, ...args);
  };
}

export type Functor<T> = {
  map: <R>(fn: (value: T) => R) => Functor<R>;
}

export const map = <T, R>(fn: (value: T) => R) => (anStructure: Functor<T>) => anStructure.map(fn) as Functor<R>;