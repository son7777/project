export const randomNumBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export function sortArrayOfObject(array, key, reverse = false) {
  const rtnArr = [
    ...array.sort((a, b) => {
      return b[key].toLowerCase() > a[key].toLowerCase() ? 1 : -1;
    }),
  ];
  return reverse ? rtnArr.reverse() : rtnArr;
}

export const filterArrayOfObjectsByTerm = (term, array, key) => {
  const searchTerm = term.trim();
  const arrayFiltered = array.filter((item) => {
    return item[key].toLowerCase().includes(searchTerm.toLowerCase());
  });
  return arrayFiltered;
};
