import { PRODUCTS, type Product } from "./products";

export interface BestSellerSignal {
  productId: string;
  rank: number;
  rating: number;
  reviewCount: number;
  weeklyBuyers: number;
  stockRemaining: number;
  stockTotal: number;
  quote: string;
  reviewerName: string;
}

export const BEST_SELLERS: BestSellerSignal[] = [
  {
    productId: "p1",
    rank: 1,
    rating: 4.9,
    reviewCount: 412,
    weeklyBuyers: 134,
    stockRemaining: 6,
    stockTotal: 60,
    quote:
      "Wears like a heavier hoodie without the bulk. Ordered a second one in Bone before the first restock closed.",
    reviewerName: "J. Odutola",
  },
  {
    productId: "p5",
    rank: 2,
    rating: 4.8,
    reviewCount: 287,
    weeklyBuyers: 96,
    stockRemaining: 11,
    stockTotal: 50,
    quote: "The drop shoulder actually fits right instead of looking borrowed from someone bigger.",
    reviewerName: "M. Reyes",
  },
  {
    productId: "p4",
    rank: 3,
    rating: 4.7,
    reviewCount: 203,
    weeklyBuyers: 71,
    stockRemaining: 4,
    stockTotal: 45,
    quote: "Only jogger I own that survives a full shift on my feet without bagging out by noon.",
    reviewerName: "T. Ferreira",
  },
  {
    productId: "p3",
    rank: 4,
    rating: 4.7,
    reviewCount: 168,
    weeklyBuyers: 58,
    stockRemaining: 9,
    stockTotal: 40,
    quote: "Pockets actually hold a phone and keys without flapping. Rare for cargo at this weight.",
    reviewerName: "A. Kowalski",
  },
];

export function getBestSellerProduct(signal: BestSellerSignal): Product {
  const product = PRODUCTS.find((p) => p.id === signal.productId);
  if (!product) {
    throw new Error(`No product found for best-seller id: ${signal.productId}`);
  }
  return product;
}
