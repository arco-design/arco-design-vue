export function padStart(
  string: string | number,
  length: number,
  char = ' '
): string {
  const s = String(string);
  if (!length) {
    return s;
  }
  const newString = s.length < length ? `${char}${s}` : s;
  return newString.length < length
    ? padStart(newString, length, char)
    : newString;
}

export function padEnd(
  string: string | number,
  length: number,
  char = ' '
): string {
  const s = String(string);
  if (!length) {
    return s;
  }
  const newString = s.length < length ? `${s}${char}` : s;
  return newString.length < length
    ? padEnd(newString, length, char)
    : newString;
}
