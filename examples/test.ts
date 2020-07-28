import { getConfigs } from '../src/config';

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

config.myNumber
config.test.toUpperCase();
