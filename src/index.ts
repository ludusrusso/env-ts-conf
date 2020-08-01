import {
  throwBooleanConfig,
  throwStringConfig,
  throwNumberConfig,
} from './env';

interface StringConfigDefinition {
  readonly variableName: string;
  readonly type: 'string';
  readonly default?: string;
}

interface NumberConfigDefinition {
  readonly variableName: string;
  readonly type: 'number';
  default?: number;
}

interface BooleanConfigDefinition {
  readonly variableName: string;
  readonly type: 'boolean';
  default?: boolean;
}

export type ConfigDefinition =
  | StringConfigDefinition
  | NumberConfigDefinition
  | BooleanConfigDefinition;

interface TypeNames {
  string: string;
  number: number;
  boolean: boolean;
}

export type EnvConfigs = { [k: string]: ConfigDefinition };
export type EnvData<T extends EnvConfigs> = {
  [k in keyof T]: TypeNames[T[k]['type']];
};

export function getConfigs<T extends EnvConfigs>(defs: T): EnvData<T> {
  const res: EnvData<T> = Object.keys(defs).reduce((acc, k) => {
    return {
      ...acc,
      [k]: getConfValueOrThrow(defs[k]),
    };
  }, {} as EnvData<T>);
  return res;
}

export function getConfValueOrThrow(def: ConfigDefinition) {
  if (def.type === 'boolean') {
    return throwBooleanConfig(def.variableName, def.default);
  }
  if (def.type === 'string') {
    return throwStringConfig(def.variableName, def.default);
  }
  if (def.type === 'number') {
    return throwNumberConfig(def.variableName, def.default);
  }
}
