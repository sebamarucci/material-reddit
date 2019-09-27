import get from 'lodash/get';
import size from 'lodash/size';

export const redditEntryReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_REDDIT_ENTRIES_SUCCESS':
      if(size(get(action.payload, "data.children")) > 0){
        return action.payload.data.children.map(c => c.data);
      }
      return [];

    case 'UPDATE_REDDIT_ENTRY_SUCCESS':
      return state.map(e => {
        if (e.id === action.payload.id){
          return action.payload;
        }
        return e;
      });

    default:
      return state;
  }
};