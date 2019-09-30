import { createReduxStore } from '../../../src/reduxstore';
import { createReduxTestInspector } from './redux-inspector.test';

export function createReduxStoreWithInspector({ doInit, doLogging } = {}) {
  const storeInspector = createReduxTestInspector(doLogging);
  const store = createReduxStore([storeInspector.middleware]);

  return [store, storeInspector];
}
