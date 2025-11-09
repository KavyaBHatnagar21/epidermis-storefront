export const formatPrice = (amount, currencyCode) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currencyCode || "INR",
  }).format(amount);
};