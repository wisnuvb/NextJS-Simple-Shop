const fs = require("fs");
const { faker } = require("@faker-js/faker");

const FILE = "./common/data.ts";

const currencies = [
  { key: "usd", symbol: "$", usdCoef: 1 },
  { key: "eur", symbol: "€", usdCoef: 0.87534666 },
  { key: "gbp", symbol: "£", usdCoef: 0.7386999 },
  { key: "cad", symbol: "$", usdCoef: 1.2671499 },
  { key: "jpy", symbol: "¥", usdCoef: 115.52954 },
];

const items = Array.from({ length: 100 }, () => ({
  id: faker.datatype.uuid(),
  title: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  imageSrc: faker.image.technics(),
  price: faker.datatype.float(),
  priceCurrency: faker.random.arrayElement(currencies.map((c) => c.key)),
  createdAt: new Date(faker.date.past(1)),
  updatedAt: new Date(faker.date.recent(faker.datatype.number())),
}));

const contents = `\
import { Currency, Item } from './types'\
\n\n
export const currencies: Currency[] = ${JSON.stringify(currencies, null, 2)};\
\n\n
export const items: Item[] = ${JSON.stringify(items, null, 2)};
`;

try {
  fs.unlinkSync(FILE);
} catch (err) {
  // its cool, file doesn't exist
}

fs.writeFileSync(FILE, contents);
