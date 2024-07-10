const formatToUSD = (number: number): string => {
  return number?.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
};

const usd = (number: number): string => {
  return number?.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
};

export { formatToUSD, usd };
