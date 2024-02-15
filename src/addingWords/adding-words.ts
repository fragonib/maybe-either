import * as fs from 'fs';
import { Just, Maybe, Nothing } from '../maybe';

export class CalcState {
    variablesMap: Map<string, number> = new Map();
    valuesMap: Map<number, string> = new Map();
}
export type CommandResult = Maybe<string> | CalcState

/**
 * Pseudocode:
 * 
 * const calculate = () => {
 *     calcLine
 *      .chain(
 *         parseCommand
 *             .chain((command) => {
 *                 switch(command) {
 *                     case "def": return defCommand();
 *                     case "clear": return clearCommand();
 *                     case "calc": return calcCommand();
 *                 }
 *             })
 *     )
 *     .fold(
 *         something: console.log,
 *         nothing: console.error
 *     )
 * }
 */
const main = (): void => {
    const problem = readInputLines();
    const solution: string[] = solve(problem)
    console.log(writeOutput(solution));
};

export const solve = (expressions: string[]): string[] => {
    return resolveCommands(expressions, initialState())
        .map((exprResult) => exprResult.getOrElse("unknown"));
};

export const resolveCommands = (expressions: string[], initialState: CalcState): Maybe<string>[] => {
    const initialResult: [CalcState, Maybe<string>[]] = [initialState, []];
    const [_finalState, results] = fold(expressions, initialResult, (acc, expr: string) => {
        const [state, results] = acc;
        const result: CommandResult = resolveCommand(expr, state);
        switch (result.constructor) {
            case Just:
            case Nothing: return [state, results.concat([result as Maybe<string>])];
            case CalcState: return [clearState(state), results];
            default: return [state, results];
        }
    });
    return results;
}

const resolveCommand = (command: string, state: CalcState): CommandResult => {
    const [verb, ...commandArgs] = command.split(" ");
    switch (verb) {
        case "def": return defVariable(commandArgs, state);
        case "clear": return clearState(state);
        case "calc": return calcExpression(commandArgs, state);
        default: return state;
    }
};

const defVariable = (expression: string[], state: CalcState): CalcState => {
    const [varName, valueStr] = expression;
    const varValue = parseInt(valueStr);
    const { variablesMap, valuesMap } = state;
    return {
        variablesMap: variablesMap.set(varName, varValue),
        valuesMap: valuesMap.set(varValue, varName)
    };
};

const clearState = (_currentState: CalcState): CalcState => {
    return initialState();
};

const calcExpression = (
    expression: string[],
    state: CalcState
): Maybe<string> => {
    const [firstVarName, ...rest] = expression;
    const firstVarValue = getVariableValue(firstVarName, state);
    return doCalc(firstVarValue, rest, state)
        .chain((v) => getResultName(v, state));
};

const doCalc = (accValue: Maybe<number>, expression: string[], state: CalcState): Maybe<number> => {

    const add = (a: number) => (b: number): number => a + b;
    const subtract = (a: number) => (b: number): number => a - b;

    const [operator, targetVarName, ...restEx] = expression;
    const targetValue = getVariableValue(targetVarName, state);
    switch (operator) {
        case "+": {
            const newExprValue = accValue.chain((v) => targetValue.map(add(v)));
            return doCalc(newExprValue, restEx, state);
        }
        case "-": {
            const newExprValue = accValue.chain((v) => targetValue.map(subtract(v)));
            return doCalc(newExprValue, restEx, state);
        }
        default: return accValue;
    }
};

const initialState = (): CalcState => {
    return {
        variablesMap: new Map(),
        valuesMap: new Map()
    };
};

const getVariableValue = (varName: string, state: CalcState): Maybe<number> => {
    const { variablesMap } = state;
    return Maybe.of(variablesMap.get(varName));
};

const getResultName = (value: number, state: CalcState): Maybe<string> => {
    const { valuesMap } = state;
    return Maybe.of(valuesMap.get(value));
};

const readInputLines = (): string[] => fs.readFileSync('./src/addingWords/adding-words.in', 'utf8')
    .split("\n");

const writeOutput = (output: string[]) => output.join("\n");

const fold = <T, U>(arr: T[], initial: U, f: (acc: U, val: T) => U): U => {
    return arr.reduce(f, initial);
};
