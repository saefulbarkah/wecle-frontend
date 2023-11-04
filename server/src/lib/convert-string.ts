export function toCapitalizeString(value: string) {
  const results = value.toLowerCase();
  return results
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function toSlug(value: string) {
  return value.split(' ').join('-');
}
