import {
  throwStringConfig,
  throwNumberConfig,
  throwBooleanConfig,
} from './env';

describe('Load Environment Tests', () => {
  describe('String Env', () => {
    let defaultEnv = process.env;
    const expectedEnv = {
      TEST_VARIABLE: 'env',
    };

    beforeEach(() => {
      defaultEnv = process.env;
      process.env = expectedEnv;
    });

    afterEach(() => {
      process.env = defaultEnv;
    });

    it('test load string variable', () => {
      const conf = throwStringConfig('TEST_VARIABLE', 'default');
      expect(conf).toBe('env');
    });

    it('test load undefined variable shold throw error', () => {
      const loadFunc = () => throwStringConfig('UNDEFINED_VARIABLE');
      expect(loadFunc).toThrowError('Env UNDEFINED_VARIABLE not defined');
    });

    it('test load undefined variable with default should return default', () => {
      const conf = throwStringConfig('UNDEFINED_VARIABLE', 'default');
      expect(conf).toBe('default');
    });
  });

  describe('Number Env', () => {
    let defaultEnv = process.env;
    const expectedEnv = {
      TEST_VARIABLE: '10',
      NOT_NUMBER_VARIABLE: 'string',
    };

    beforeEach(() => {
      defaultEnv = process.env;
      process.env = expectedEnv;
    });

    afterEach(() => {
      process.env = defaultEnv;
    });

    it('test load string variable', () => {
      const conf = throwNumberConfig('TEST_VARIABLE', 0);
      expect(conf).toBe(10);
    });

    it('test load undefined variable should throw error', () => {
      const loadFunc = () => throwNumberConfig('UNDEFINED_VARIABLE');
      expect(loadFunc).toThrowError('Env UNDEFINED_VARIABLE not defined');
    });

    it('test load undefined variable with default should return default', () => {
      const conf = throwNumberConfig('UNDEFINED_VARIABLE', 0);
      expect(conf).toBe(0);
    });

    it('test defined variable with value not number should throw error', () => {
      const loadFunc = () => throwNumberConfig('NOT_NUMBER_VARIABLE');
      expect(loadFunc).toThrowError('Env NOT_NUMBER_VARIABLE not defined');
    });
  });

  describe('Boolean Env', () => {
    let defaultEnv = process.env;
    const expectedEnv = {
      TRUE_VARIABLE: 'true',
      FALSE_VARIABLE: '',
      NOT_BOOLEAN_VARIABLE: 'string',
    };

    beforeEach(() => {
      defaultEnv = process.env;
      process.env = expectedEnv;
    });

    afterEach(() => {
      process.env = defaultEnv;
    });

    it('test load true variable', () => {
      const conf = throwBooleanConfig('TRUE_VARIABLE');
      expect(conf).toBe(true);
    });

    it('test load false variable', () => {
      const conf = throwBooleanConfig('FALSE_VARIABLE');
      expect(conf).toBe(false);
    });

    it('test load undefined variable should throw error', () => {
      const loadFunc = () => throwBooleanConfig('UNDEFINED_VARIABLE');
      expect(loadFunc).toThrowError('Env UNDEFINED_VARIABLE not defined');
    });

    it('test load undefined variable with default should return default', () => {
      const conf = throwBooleanConfig('UNDEFINED_VARIABLE', false);
      expect(conf).toBe(false);
    });

    it('test load defined variable with value not boolean should throw error', () => {
      const loadFunc = () => throwNumberConfig('NOT_BOOLEAN_VARIABLE');
      expect(loadFunc).toThrowError('Env NOT_BOOLEAN_VARIABLE not defined');
    });
  });
});
