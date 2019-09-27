import React from 'react';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import redditAPIMiddleware from './reddit-middleware';
import {redditEntryReducer} from "../app/reddit/reddit";
//
// Redux setup
//


export const rootReducer = combineReducers({
  redditEntry: redditEntryReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const createReduxStore = (extraMiddleware = []) => {

  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(redditAPIMiddleware,
      ...extraMiddleware))
  );
};

export const store = createReduxStore();
