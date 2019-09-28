export const getTop50Entries = (state) => {
  return state.redditEntry.slice(0,50);
};

export const getRedditEntry = (state, entryId) => {
  return state.redditEntry.find(e => e.id === entryId);
};