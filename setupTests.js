import _ from "lodash";

global._ = _;

global._console = global.console;
global.console = {
  debug: jest.fn(),
  info: jest.fn(),
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
