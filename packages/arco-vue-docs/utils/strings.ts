export const strEndsWith = (str: string, search: string) => {
  return str.substring(str.length - search.length, str.length) === search;
};

export const strIncludes = (str: string, search: string, start = 0) => {
  if (start + search.length > str.length) {
    return false;
  }
  return str.indexOf(search, start) !== -1;
};
