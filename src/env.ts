import { isNumber, isBoolean } from 'util';

export const throwStringConfig = (
  env: string,
  defaultValue?: string | undefined
): string => {
  const value = process.env[env] ?? defaultValue;
  if (value === undefined) {
    throw new Error(`Env ${env} not defined`);
  }
  return value;
};

export const throwBooleanConfig = (
  env: string,
  defaultValue?: boolean | undefined
): boolean => {
  let defaultValueString;
  if (isBoolean(defaultValue)) {
    defaultValueString = defaultValue ? 'true' : '';
  }
  const stringValue = throwStringConfig(env, defaultValueString);
  return Boolean(stringValue);
};

export const throwNumberConfig = (
  env: string,
  defaultValue?: number | undefined
): number => {
  let defaultValueString;
  if (isNumber(defaultValue)) {
    defaultValueString = String(defaultValue);
  }
  const stringValue = throwStringConfig(env, defaultValueString);
  const value = Number(stringValue);
  if (isNaN(value)) {
    throw new Error(`Env ${env} not defined`);
  }
  return value;
};
