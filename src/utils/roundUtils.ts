export const round = (value: number, decimals: number) => {
  return Number(
    Math.round(parseFloat(value + "e" + decimals)) + "e-" + decimals
  );
};
