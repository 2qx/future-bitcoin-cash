import { jest } from '@jest/globals';

jest.setTimeout(5000000);

globalThis.jest = jest;
global.jest = jest;