import { jest } from '@jest/globals';
import { inspect } from 'util';
inspect.defaultOptions.depth = 10;

jest.setTimeout(5000000);

globalThis.jest = jest;
global.jest = jest;