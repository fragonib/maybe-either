export const compose = <T>(...functionList: Function[]) => (value: T) =>
  functionList.reduceRight((result, fn) => fn(result), value);

export const curry = (fn: Function) => {
  const arity = fn.length;
  return function $curry(...args: any[]): Function {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }
    return fn.call(null, ...args);
  };
}

export type Functor = {
  map: (fn: Function) => Functor
}

export const map = (fn: Function) => (anStructure: Functor) => anStructure.map(fn);