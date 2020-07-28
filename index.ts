const throwStringConfig = (
  env: string,
  defaultValue?: string | undefined
): string => {
  const value = process.env[env] || defaultValue;
  if (value === undefined || value === null) {
    throw new Error(`Env ${env} not defined`);
  }
  return value;
};

const throwBooleanConfig = (
  env: string,
  defaultValue?: boolean | undefined
): boolean => {
  try {
    const stringValue = throwStringConfig(env);
    const value = Boolean(stringValue);
    return value;
  } catch (error) {
    if (defaultValue === undefined) {
      throw new Error(`Env ${env} not defined`);
    }
    return defaultValue;
  }
};

const throwNumberConfig = (
  env: string,
  defaultValue?: number | undefined
): number => {
  const stringValue = throwStringConfig(env, `${defaultValue}`);
  const value = Number(stringValue);
  if (value === NaN) {
    throw new Error(`Env ${env} not defined`);
  }
  return value;
};

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
