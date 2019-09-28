export const getTop50Entries = (state) => {
  return state.redditEntry.data.slice(0,50);
};

export const getRedditEntry = (state, entryId) => {
  return state.redditEntry.data.find(e => e.id === entryId);
};

export const getRedditLoadStatus = state => {
  return state.redditEntry.status;
}