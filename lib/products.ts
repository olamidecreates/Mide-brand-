export type ProductCategory = "Hoodies" | "T-Shirts" | "Joggers" | "Cargo";
export type ProductBadge = "New" | "Best Seller" | null;

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  dropCode: string;
  category: ProductCategory;
  price: number;
  image: string;
  badge: ProductBadge;
  colors: ProductColor[];
  sizes: string[];
  unavailableSizes?: string[];
  description: string;
}

export const FILTERS = ["All", "New Arrivals", "Hoodies", "T-Shirts", "Joggers", "Cargo"] as const;
export type Filter = (typeof FILTERS)[number];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Heavyweight Shell Hoodie",
    dropCode: "DROP 004",
    category: "Hoodies",
    price: 218,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1200&auto=format&fit=crop",
    badge: "Best Seller",
    colors: [
      { name: "Ink Black", hex: "#0A0A0A" },
      { name: "Bone", hex: "#EDEAE2" },
      { name: "Electric", hex: "#3B82F6" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    unavailableSizes: ["XS"],
    description: "14oz brushed fleece, boxed fit, ribbed hem and cuffs.",
  },
  {
    id: "p2",
    name: "Boxy Logo Tee",
    dropCode: "DROP 004",
    category: "T-Shirts",
    price: 92,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop",
    badge: "New",
    colors: [
      { name: "Ink Black", hex: "#0A0A0A" },
      { name: "Bone", hex: "#EDEAE2" },
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "220gsm heavyweight cotton, garment-dyed for a lived-in hand feel.",
  },
  {
    id: "p3",
    name: "Utility Cargo Pant",
    dropCode: "DROP 003",
    category: "Cargo",
    price: 246,
    image:
      "https://images.unsplash.com/photo-1517438322307-e67111335449?q=80&w=1200&auto=format&fit=crop",
    badge: null,
    colors: [
      { name: "Ink Black", hex: "#0A0A0A" },
      { name: "Olive", hex: "#4B5A3F" },
    ],
    sizes: ["28", "30", "32", "34", "36"],
    unavailableSizes: ["28"],
    description: "Six-pocket utility cargo in brushed cotton twill, tapered leg.",
  },
  {
    id: "p4",
    name: "Track Jogger",
    dropCode: "DROP 004",
    category: "Joggers",
    price: 188,
    image:
      "https://images.unsplash.com/photo-1626497764746-6dc36546b388?q=80&w=1200&auto=format&fit=crop",
    badge: "New",
    colors: [
      { name: "Ink Black", hex: "#0A0A0A" },
      { name: "Electric", hex: "#3B82F6" },
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Tapered fleece jogger with articulated knee and zip cuff.",
  },
  {
    id: "p5",
    name: "Oversized Pullover Hoodie",
    dropCode: "DROP 002",
    category: "Hoodies",
    price: 232,
    image:
      "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?q=80&w=1200&auto=format&fit=crop",
    badge: "Best Seller",
    colors: [
      { name: "Bone", hex: "#EDEAE2" },
      { name: "Ink Black", hex: "#0A0A0A" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Drop-shoulder silhouette in double-layer fleece.",
  },
  {
    id: "p6",
    name: "Washed Pocket Tee",
    dropCode: "DROP 003",
    category: "T-Shirts",
    price: 88,
    image:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1200&auto=format&fit=crop",
    badge: null,
    colors: [
      { name: "Olive", hex: "#4B5A3F" },
      { name: "Ink Black", hex: "#0A0A0A" },
    ],
    sizes: ["S", "M", "L", "XL"],
    unavailableSizes: ["S"],
    description: "Enzyme-washed jersey with a chest pocket and dropped hem.",
  },
  {
    id: "p7",
    name: "Cargo Jogger",
    dropCode: "DROP 004",
    category: "Cargo",
    price: 214,
    image:
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=1200&auto=format&fit=crop",
    badge: "New",
    colors: [
      { name: "Ink Black", hex: "#0A0A0A" },
      { name: "Bone", hex: "#EDEAE2" },
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Cargo pockets meet a tapered jogger cuff for a hybrid fit.",
  },
  {
    id: "p8",
    name: "Relaxed Fleece Jogger",
    dropCode: "DROP 001",
    category: "Joggers",
    price: 176,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1200&auto=format&fit=crop",
    badge: null,
    colors: [
      { name: "Ink Black", hex: "#0A0A0A" },
      { name: "Olive", hex: "#4B5A3F" },
      { name: "Bone", hex: "#EDEAE2" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    unavailableSizes: ["XS", "XL"],
    description: "Relaxed-through-the-leg fleece jogger with an elastic waist.",
  },
];
