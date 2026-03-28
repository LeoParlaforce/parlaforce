export type Currency = {
  symbol: string;
  code: string;
  rate: number; // Taux par rapport à l'Euro (fixe pour éviter les APIs payantes)
};

export const CURRENCIES: Record<string, Currency> = {
  US: { symbol: "$", code: "USD", rate: 1.08 },
  CA: { symbol: "CA$", code: "CAD", rate: 1.46 },
  FR: { symbol: "€", code: "EUR", rate: 1 },
  DEFAULT: { symbol: "€", code: "EUR", rate: 1 },
};

export function getCurrencyByCountry(countryCode: string): Currency {
  return CURRENCIES[countryCode] || CURRENCIES.DEFAULT;
}