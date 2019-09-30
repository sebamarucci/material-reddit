export const createReduxTestInspector = logActions => {
  const callbacksAfter = {};
  const actions = [];

  return {
    actions: () => actions,

    actionCount: () => actions.length,

    afterNActions: (n, cb) => {
      callbacksAfter[n] = cb;
    },

    expectActionMatching: subAction => {
      expect(actions).toEqual(expect.arrayContaining([expect.objectContaining(subAction)]));
    },

    expectLastActionMatches: subAction => {
      const lastAction = actions[actions.length - 1];
      expect(lastAction).toEqual(expect.objectContaining(subAction));
    },

    expectNOActionMatching: subAction => {
      expect(actions).not.toEqual(expect.arrayContaining([expect.objectContaining(subAction)]));
    },

    middleware: store => {
      return next => {
        return action => {
          if (logActions) _console.log('* ReduxTestInspector: action: ' + action.type);

          actions.push(action);
          if (callbacksAfter[actions.length]) {
            try {
              callbacksAfter[actions.length]();
            } catch (e) {}
          }
          next(action);
        };
      };
    },
  };
};

test("dummy test. So that Jest doesn't complain about this module", () => {});
