export const removeDuplicateSearch = (recentSearch, description) => {
  recentSearch.forEach((item, index) => {
    if (item.description === description) {
      recentSearch.splice(index, 1);
    }
  });
};

// Sequence generator function
export const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
