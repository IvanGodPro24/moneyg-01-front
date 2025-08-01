export const getCurrencySymbol = (activeCurrency: string) => {
  switch (activeCurrency) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    default:
      return "₴";
  }
};
