export const getTop50Entries = (state) => {
  return state.redditEntry.slice(0,50);
};