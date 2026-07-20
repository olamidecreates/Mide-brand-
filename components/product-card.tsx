"use client";

import { useState, type MouseEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Eye, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Product } from "@/lib/products";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Magnetic } from "@/components/ui/magnetic";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface ProductCardProps {
  product: Product;
  loading?: boolean;
}

export function ProductCard({ product, loading = false }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(
    product.sizes.find((s) => !product.unavailableSizes?.includes(s)) ?? product.sizes[0]
  );
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 });

  function handleImageMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    // Very small translate — a hint of parallax, not a swim.
    setImageOffset({ x: relX * -10, y: relY * -10 });
  }

  function resetImageMove() {
    setImageOffset({ x: 0, y: 0 });
  }

  if (loading) {
    return <ProductCardSkeleton />;
  }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <Card className="overflow-hidden border-ink/10 shadow-[0_1px_2px_rgba(10,10,10,0.04)] transition-shadow duration-300 group-hover:shadow-[0_24px_48px_-12px_rgba(10,10,10,0.18)]">
        {/* Image */}
        <div
          className="relative overflow-hidden"
          onMouseMove={handleImageMove}
          onMouseLeave={resetImageMove}
        >
          <AspectRatio ratio={4 / 5}>
            <motion.div
              animate={{ x: imageOffset.x, y: imageOffset.y }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              className="h-full w-full"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="scale-100 object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
              />
            </motion.div>
            {/* Soft gradient overlay for legibility of overlaid controls */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </AspectRatio>

          {/* Badge */}
          {product.badge && (
            <div className="absolute left-3 top-3">
              <Badge variant={product.badge === "New" ? "default" : "dark"}>
                {product.badge}
              </Badge>
            </div>
          )}

          {/* Wishlist */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                aria-pressed={wishlisted}
                onClick={() => setWishlisted((w) => !w)}
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-paper/90 text-ink backdrop-blur-sm transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
              >
                <motion.span
                  animate={wishlisted ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex"
                >
                  <Heart
                    className={cn(
                      "h-4 w-4 transition-colors",
                      wishlisted ? "fill-electric text-electric" : "text-ink"
                    )}
                  />
                </motion.span>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              {wishlisted ? "Saved" : "Add to Wishlist"}
            </TooltipContent>
          </Tooltip>

          {/* Quick View + Add to Cart — reveal on hover */}
          <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 translate-y-2 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <HoverCard openDelay={80} closeDelay={80}>
              <HoverCardTrigger asChild>
                <button
                  type="button"
                  className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full bg-paper/95 font-mono text-[10px] uppercase tracking-widest text-ink backdrop-blur-sm transition-colors duration-200 hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
                >
                  <Eye className="h-3.5 w-3.5" />
                  Quick View
                </button>
              </HoverCardTrigger>
              <HoverCardContent side="top" align="start" className="p-0">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="320px"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-electric">
                    {product.dropCode}
                  </p>
                  <h4 className="mt-1 font-display text-base font-bold uppercase tracking-tight text-ink">
                    {product.name}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-steel">
                    {product.description}
                  </p>
                  <p className="mt-3 font-display text-sm font-bold text-ink">
                    ${product.price}
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>

            <Magnetic strength={0.25}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    aria-label={`Add ${product.name} to cart`}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-electric text-paper transition-colors duration-200 hover:bg-electric-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Add to Cart</TooltipContent>
              </Tooltip>
            </Magnetic>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-2.5 p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-electric">
                {product.dropCode}
              </p>
              <h3 className="mt-0.5 font-display text-sm font-bold uppercase tracking-tight text-ink sm:text-base">
                {product.name}
              </h3>
            </div>
            <p className="whitespace-nowrap font-display text-sm font-bold text-ink sm:text-base">
              ${product.price}
            </p>
          </div>

          {/* Colors */}
          <div className="flex items-center gap-1.5">
            {product.colors.map((color, i) => (
              <Tooltip key={color.name}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    aria-label={color.name}
                    aria-pressed={selectedColor === i}
                    onClick={() => setSelectedColor(i)}
                    className={cn(
                      "h-4 w-4 rounded-full border transition-all duration-200",
                      selectedColor === i
                        ? "border-electric ring-2 ring-electric/30"
                        : "border-ink/15"
                    )}
                    style={{ backgroundColor: color.hex }}
                  />
                </TooltipTrigger>
                <TooltipContent>{color.name}</TooltipContent>
              </Tooltip>
            ))}
          </div>

          {/* Sizes */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {product.sizes.map((size) => {
              const unavailable = product.unavailableSizes?.includes(size);
              return (
                <button
                  key={size}
                  type="button"
                  disabled={unavailable}
                  onClick={() => setSelectedSize(size)}
                  aria-pressed={selectedSize === size}
                  className={cn(
                    "flex h-7 min-w-7 items-center justify-center rounded-md border px-1.5 font-mono text-[10px] uppercase tracking-wide transition-colors duration-200",
                    unavailable &&
                      "cursor-not-allowed border-ink/10 text-steel/40 line-through",
                    !unavailable &&
                      selectedSize === size &&
                      "border-ink bg-ink text-paper",
                    !unavailable &&
                      selectedSize !== size &&
                      "border-ink/15 text-ink hover:border-ink"
                  )}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden border-ink/10">
      <AspectRatio ratio={4 / 5}>
        <Skeleton className="h-full w-full rounded-none" />
      </AspectRatio>
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-2.5 w-16" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <Skeleton className="h-4 w-10" />
        </div>
        <div className="flex gap-1.5">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
        <div className="flex gap-1.5">
          <Skeleton className="h-7 w-7" />
          <Skeleton className="h-7 w-7" />
          <Skeleton className="h-7 w-7" />
        </div>
      </div>
    </Card>
  );
}
