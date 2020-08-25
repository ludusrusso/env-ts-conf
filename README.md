# env-ts-conf

## Typed environment configuration for node

**env-ts-conf** is a simple library that provides types and autocompletion for configuration loaded from environment file.

### Usage

Install with `npm i env-ts-conf`!

Then define your configuration object with

```typescript
import { getConfigs } from 'env-ts-conf';

const config = getConfigs({
  test: {
    type: 'string',
    variableName: 'TEST_VARIABLE',
    default: 'test',
  },
  myNumber: {
    type: 'number',
    variableName: 'MY_NUMBER',
    default: 10,
  },
});
```

and you'll get back a typed object:

```ts
const config: {
  test: string;
  myNumber: number;
};
```

![Example image](./img.png)

## Features

1. Simple to use
2. Configuration output is typed
3. Supports `number`, `string` and `boolean`
4. Supports default values,
5. Panic at starup if configuration is not found

## Contribution

The library has been just released and is not jet super perfect. If you like
to help me improve it, feel free to submit an issue or a pull request!
