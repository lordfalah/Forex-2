export const ratesForex = async () => {
  const req = await fetch(
    `https://openexchangerates.org/api/latest.json?app_id=${
      process.env.EXPO_PUBLIC_API_KEY || ""
    }`,
    { method: "GET" }
  );

  const res = await req.json();
  return res;
};

export const currenciesForex = async () => {
  const req = await fetch("https://openexchangerates.org/api/currencies.json");
  const res = await req.json();

  return res;
};
