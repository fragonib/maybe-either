export const curry = (fn: Function) => {
  const arity = fn.length;
  return function $curry(...args: any[]): Function {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }
    return fn.call(null, ...args);
  };
}

export const compose = <T>(...functionList: Function[]) => (value: T) => 
  functionList.reduceRight((result, fn) => fn(result), value);

export type Functor = {
  map: (fn: Function) => Functor
}

export const map = (fn: (i: any) => any) => (anyFunctor: Functor) => anyFunctor.map(fn);