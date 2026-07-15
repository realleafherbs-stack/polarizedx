export const SECOND_PAIR_PRICE = 99;

interface PriceableItem {
  price: number;
  qty: number;
}

// Buy one pair, the second (cheaper) pair is SECOND_PAIR_PRICE. Cart units are
// sorted by price descending and paired sequentially, so within each pair the
// second unit is always the cheaper (or equal) one.
export function calculateItemsTotal(items: PriceableItem[]): number {
  const unitPrices: number[] = [];
  for (const item of items) {
    for (let i = 0; i < item.qty; i++) unitPrices.push(item.price);
  }
  unitPrices.sort((a, b) => b - a);

  let total = 0;
  for (let i = 0; i < unitPrices.length; i += 2) {
    total += unitPrices[i];
    if (i + 1 < unitPrices.length) {
      total += Math.min(unitPrices[i + 1], SECOND_PAIR_PRICE);
    }
  }
  return Math.round(total * 100) / 100;
}
