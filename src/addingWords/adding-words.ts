import * as fs from 'fs';
import { Maybe } from '../maybe';

type CalcState = {
    variablesMap: Map<string, number>,
    valuesMap: Map<number, string>,
}
type ExpressionResult = string

export const solve = (expressions: string[]): ExpressionResult[] => {
    const initialState: CalcState = {
        variablesMap: new Map(),
        valuesMap: new Map()
    };
    return calcExpressions(expressions, initialState);
};

const calcExpressions = (expressions: string[], state: CalcState): ExpressionResult[] => {
    if (expressions.length === 0) return [];
    const [expr, ...restOfExprs] = expressions

    const [command, ...args] = expr.split(" ");
    switch (command) {
        case "def": {
            const [varName, valueStr] = args;
            const value = parseInt(valueStr);
            storeVariable(varName, value, state);
            return calcExpressions(restOfExprs, state);
        }
        case "clear": {
            clearState(state);
            return calcExpressions(restOfExprs, state);
        }
        case "calc": {
            const result = calcExpression(args, state)
                .join((value) => getValueName(value, state))
                .getOrElse("unknown");
            return [result, ...calcExpressions(restOfExprs, state)];
        }
        default:
            return [];
    }
};

const calcExpression = (
    expression: string[],
    state: CalcState
): Maybe<number> => {
    
    function helper(initValue: Maybe<number>, acc: string[], state: CalcState): Maybe<number> {
        if (acc.length === 0) return initValue;
        const [operator, targetVarName, ...restEx] = acc
        const targetValue = readVariable(targetVarName, state);
        if (operator === "+")
            return helper(initValue.join((v) => targetValue.map(add(v))), restEx, state);
        if (operator === "-")
            return helper(initValue.join((v) => targetValue.map(subtract(v))), restEx, state);
        return initValue;
    }

    const [varName, ...rest] = expression;
    const varValue = readVariable(varName, state);
    return helper(varValue, rest, state);
};

const add = (a: number) => (b: number): number => a + b;
const subtract = (a: number) => (b: number): number => a - b;

const storeVariable = (varName: string, value: number, state: CalcState): void => {
    const { variablesMap, valuesMap } = state;
    variablesMap.set(varName, value);
    valuesMap.set(value, varName);
};

const getValueName = (value: number, state: CalcState): Maybe<string> => {
    const { valuesMap } = state;
    return Maybe.of(valuesMap.get(value));
};

const readVariable = (varName: string, state: CalcState): Maybe<number> => {
    const { variablesMap } = state;
    return Maybe.of(variablesMap.get(varName));
};

const clearState = (state: CalcState): void => {
    const { variablesMap, valuesMap } = state;
    variablesMap.clear();
    valuesMap.clear();
};

export const readInputLines = (): string[] =>
    fs.readFileSync('./src/addingWords/adding-words.in', 'utf8')
        .split("\n");

const writeOutput = (output: string[]) => 
    output.join("\n");

const main = (): void => {
    const problem = readInputLines();
    const solution: ExpressionResult[] = solve(problem);
    console.log(writeOutput(solution));
};