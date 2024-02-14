import * as fs from 'fs';
import { Maybe } from '../maybe';

type Variables = Map<string, number>;
type Values = Map<number, string>;

const initialState: [Variables, Values] = [new Map(), new Map()];

export const solve = (tokens: string[][]): string[] => {
    return solveM(tokens, initialState);
};

const solveM = (tokens: string[][], state: [Variables, Values]): string[] => {
    if (tokens.length === 0) return [];
    const [command, ...args] = tokens[0];

    if (command === "def") {
        const [varName, valueStr] = args;
        const value = parseInt(valueStr);
        storeVariable(varName, value, state);
        return solveM(tokens.slice(1), state);
    } else if (command === "calc") {
        const result = calcExpression(args, state)
            .join((v) => getValueName(v, state))
            .getOrElse("unknown");
        return [result, ...solveM(tokens.slice(1), state)];
    } else if (command === "clear") {
        clearState(state);
        return solveM(tokens.slice(1), state);
    } else {
        return solveM(tokens.slice(1), state);
    }
};

const calcExpression = (args: string[], state: [Variables, Values]): Maybe<number> => {
    const [varName, ...rest] = args;
    const varValue = readVariable(varName, state);
    console.log(varName, varValue.inspect());
    
    const r = rest.reduce((acc: Maybe<number>, op: string) => {
        if (op === "+") {
            const nextVarName = rest[1];
            const nextValue = readVariable(nextVarName, state);
            console.log(nextVarName, nextValue.inspect());
            const newLocal: Maybe<number> = nextValue.join((v) => calcExpression(rest.slice(2), state).map((v2) => v + v2));
            return newLocal;
        } else if (op === "-") {
            const nextVarName = rest[1];
            const nextValue = readVariable(nextVarName, state);
            const newLocal_1 = nextValue.join((v) => calcExpression(rest.slice(2), state).map((v2) => v - v2));
            return newLocal_1;
        } else {
            return acc;
        }
    }, varValue);
    console.log("r", r.inspect());
    return r;
};

const storeVariable = (varName: string, value: number, state: [Variables, Values]): void => {
    const [variablesMap, valuesMap] = state;
    variablesMap.set(varName, value);
    valuesMap.set(value, varName);
};

const getValueName = (value: number, state: [Variables, Values]): Maybe<string> => {
    const [, valuesMap] = state;
    return Maybe.of(valuesMap.get(value));
};

const readVariable = (varName: string, state: [Variables, Values]): Maybe<number> => {
    const [variablesMap] = state;
    return Maybe.of(variablesMap.get(varName));
};

const clearState = (state: [Variables, Values]): void => {
    const [variablesMap, valuesMap] = state;
    variablesMap.clear();
    valuesMap.clear();
};

export const readInput = (): string[][] => {
  const input = fs.readFileSync('./src/addingWords/adding-words.in', 'utf8');
  return input.split("\n")
    .map(line => line.split(" "));
};

const writeOutput = (output: string[]) => {
    return output.join("\n");
};

const main = (): void => {
    const problem = readInput();
    const solution = writeOutput(solve(problem));
    console.log(solution);
};