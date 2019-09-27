// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.


import axios from "axios";
import isFunction from "lodash/isFunction";

const redditAxios = axios.create({
  baseURL: 'http://www.reddit.com',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});




const API_ROOT = '/';
const callApi = (endpoint, method, payload) => {
  // TODO: passing query params and escaping all URL and query params
  const url = API_ROOT +endpoint;

  const requestPromise = redditAxios.request({
    url,
    method,
    data: payload,
  });

  // TODO: error handling
  return requestPromise.then(response => {
    return response.data;
  });
};


const REDDIT_API = 'REDDIT_API';
export default store => next => action => {

  const redditAPI = action[REDDIT_API];
  if (typeof redditAPI === 'undefined') {
    return next(action);
  }

  const { endpoint, method = "GET", payload, headers,
    action_type, silent = method === "GET",
    successMessage, errorMessage, onSuccess, onError } = redditAPI;



  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  // if (!schema) {
  //   throw new Error('Specify one of the exported Schemas.')
  // }

  if (typeof action_type !== 'string') {
    throw new Error('Specify a string action_type.');
  }

  const actionWith = newAction => {
    let a = Object.assign({}, action, newAction);
    delete a[REDDIT_API];

    a.meta = Object.assign({}, a.meta, {request: action});
    return Object.assign(a, newAction);
  };

  const requestType = action_type+'_PENDING',
    successType = action_type+'_SUCCESS',
    failureType = action_type+'_FAILURE';

  store.dispatch(actionWith({ type: requestType, silent }));



  return callApi(endpoint, method, payload).then(
    response => {
      if(isFunction(onSuccess)){
        const result = onSuccess(response);
        if(result){
          store.dispatch(result);
        }
      }
      return store.dispatch(actionWith({
        payload: response,
        type: successType,
        message: successMessage,
        silent,
      }));
    },
    error => {
      if(isFunction(onError)){
        const result = onError(error);
        if(result){
          store.dispatch(result);
        }
      }
      return store.dispatch(actionWith({
        type: failureType,
        message: errorMessage,
        error: error,
      }));
    }
  )
};
