export const getCurrencySymbol = (activeCurrency) => {
  switch (activeCurrency) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    default:
      return "₴";
  }
};
