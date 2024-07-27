export function formatCityAndState({
  city,
  state,
}: {
  city: string;
  state: string;
}): string {
  return `${city.toLowerCase()}-(${state.toUpperCase()})`;
}
