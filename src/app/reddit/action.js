export const loadTopEntries = (after, count, limit, onSuccess, onFailure) => ({ type: 'REDDIT_API',
  REDDIT_API: { endpoint: "top.json?count="+count+"&limit="+limit,
    action_type: 'LOAD_REDDIT_ENTRIES',
    onSuccess,
    onFailure,
  }
});


export const updateEntry = (entry) => ({
  type: "UPDATE_REDDIT_ENTRY_SUCCESS",
  payload: entry
});