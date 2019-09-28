import get from 'lodash/get';
import size from 'lodash/size';

export const redditEntryReducer = (state = {status: "NOT_LOADED", data: []}, action) => {
  switch (action.type) {
    case 'LOAD_REDDIT_ENTRIES_PENDING':
      return {...state, status: "LOADING"};

    case 'LOAD_REDDIT_ENTRIES_ERROR':
      return {...state, status: "ERROR_LOADING"};

    case 'LOAD_REDDIT_ENTRIES_SUCCESS':
      let result = {status: "LOADED", data: []};
      if (size(get(action.payload, "data.children")) > 0) {
        result.data = action.payload.data.children.map(c => c.data);
      }
      return result;

    case 'UPDATE_REDDIT_ENTRY_SUCCESS':
      return {
        status: state.status, data: state.data.map(e => {
          if (e.id === action.payload.id) {
            return action.payload;
          }
          return e;
        })
      };

    default:
      return state;
  }
};