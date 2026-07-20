"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { BEST_SELLERS, getBestSellerProduct, type BestSellerSignal } from "@/lib/best-sellers";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Progress } from "@/components/ui/progress";
import { StarRating } from "@/components/ui/star-rating";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

function stockLabel(signal: BestSellerSignal) {
  const pct = (signal.stockRemaining / signal.stockTotal) * 100;
  if (pct <= 15) return { text: `Only ${signal.stockRemaining} left`, urgent: true, pct };
  return { text: `${signal.stockRemaining} left in this size`, urgent: false, pct };
}

export function BestSellers() {
  const [spotlight, ...rest] = BEST_SELLERS;
  const spotlightProduct = getBestSellerProduct(spotlight);
  const spotlightStock = stockLabel(spotlight);

  return (
    <section
      id="best-sellers"
      aria-labelledby="best-sellers-heading"
      className="relative bg-paper py-24 text-ink sm:py-32"
    >
      <div className="container">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="max-w-2xl border-b border-ink/10 pb-10"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 font-mono text-xs uppercase tracking-widest text-electric"
          >
            Most Loved
          </motion.p>
          <motion.h2
            id="best-sellers-heading"
            variants={fadeUp}
            className="text-balance font-display text-4xl font-bold uppercase leading-[0.95] tracking-tightest text-ink sm:text-5xl md:text-6xl"
          >
            Best Sellers
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-md text-balance font-body text-sm leading-relaxed text-steel sm:text-base"
          >
            Ranked by reorders, not ad spend — these are the pieces our
            customers keep coming back to buy again.
          </motion.p>
        </motion.div>

        {/* Spotlight — No. 1 */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="grid grid-cols-1 items-center gap-10 border-b border-ink/10 py-16 lg:grid-cols-12 lg:gap-8"
        >
          <motion.div variants={fadeUp} className="group relative lg:col-span-6">
            <div className="relative overflow-hidden rounded-2xl border border-ink/10">
              <AspectRatio ratio={4 / 5}>
                <Image
                  src={spotlightProduct.image}
                  alt={spotlightProduct.name}
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                />
              </AspectRatio>
              <div className="absolute left-4 top-4">
                <Badge variant="dark" className="px-3 py-1 text-[10px]">
                  No. 1 — Most Reordered
                </Badge>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="lg:col-span-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-electric">
              {spotlightProduct.dropCode}
            </p>
            <h3 className="mt-2 text-balance font-display text-3xl font-bold uppercase leading-[1.02] tracking-tight text-ink sm:text-4xl">
              {spotlightProduct.name}
            </h3>

            <div className="mt-4 flex items-center gap-3">
              <StarRating rating={spotlight.rating} />
              <span className="font-body text-sm text-steel">
                {spotlight.rating} · {spotlight.reviewCount} Reviews
              </span>
            </div>

            <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-steel">
              {spotlight.weeklyBuyers} people bought this in the last 7 days
            </p>

            <p className="mt-6 font-display text-2xl font-bold text-ink">
              ${spotlightProduct.price}
            </p>

            {/* Stock signal */}
            <div className="mt-6 max-w-xs">
              <div className="mb-2 flex items-center justify-between">
                <span
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-widest",
                    spotlightStock.urgent ? "text-electric" : "text-steel"
                  )}
                >
                  {spotlightStock.text}
                </span>
              </div>
              <Progress value={spotlightStock.pct} />
            </div>

            {/* Customer quote */}
            <blockquote className="mt-8 max-w-md border-l-2 border-electric/40 pl-4">
              <p className="text-balance font-body text-sm leading-relaxed text-ink">
                &ldquo;{spotlight.quote}&rdquo;
              </p>
              <footer className="mt-3 flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-steel">
                  — {spotlight.reviewerName}
                </span>
                <Badge variant="outline" className="gap-1 border-ink/15 px-2 py-0.5 text-ink">
                  <ShieldCheck className="h-2.5 w-2.5" />
                  Verified Buyer
                </Badge>
              </footer>
            </blockquote>

            <div className="mt-8 flex items-center gap-4">
              <Magnetic strength={0.2}>
                <Button size="lg" className="group bg-ink text-paper hover:bg-electric hover:text-paper">
                  Add to Cart
                  <Plus className="transition-transform duration-200 group-hover:rotate-90" />
                </Button>
              </Magnetic>
            </div>
          </motion.div>
        </motion.div>

        {/* Ranked grid — No. 2–4 */}
        <div className="grid grid-cols-1 gap-6 py-16 sm:grid-cols-3">
          {rest.map((signal, i) => (
            <RankedCard key={signal.productId} signal={signal} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RankedCard({ signal, index }: { signal: BestSellerSignal; index: number }) {
  const product = getBestSellerProduct(signal);
  const stock = stockLabel(signal);

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -6 }}
    >
      <div className="group">
        <div className="relative overflow-hidden rounded-2xl border border-ink/10 shadow-[0_1px_2px_rgba(10,10,10,0.04)] transition-shadow duration-300 group-hover:shadow-[0_20px_40px_-14px_rgba(10,10,10,0.18)]">
          <AspectRatio ratio={4 / 5}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 640px) 33vw, 90vw"
              className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
            />
          </AspectRatio>
          <div className="absolute left-3 top-3">
            <Badge variant="dark" className="text-[10px]">
              No. {signal.rank}
            </Badge>
          </div>
          <Magnetic strength={0.25} className="absolute bottom-3 right-3">
            <button
              type="button"
              aria-label={`Add ${product.name} to cart`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-paper/95 text-ink opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:opacity-100 hover:bg-electric hover:text-paper focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
            >
              <Plus className="h-4 w-4" />
            </button>
          </Magnetic>
        </div>

        <div className="mt-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-electric">
                {product.dropCode}
              </p>
              <h3 className="mt-0.5 font-display text-sm font-bold uppercase tracking-tight text-ink">
                {product.name}
              </h3>
            </div>
            <p className="whitespace-nowrap font-display text-sm font-bold text-ink">
              ${product.price}
            </p>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <StarRating rating={signal.rating} />
            <span className="font-body text-xs text-steel">
              {signal.rating} ({signal.reviewCount})
            </span>
          </div>

          <p className="mt-3 text-balance font-body text-xs italic leading-relaxed text-steel">
            &ldquo;{signal.quote}&rdquo;
          </p>

          <div className="mt-3">
            <div className="mb-1.5 flex items-center justify-between">
              <span
                className={cn(
                  "font-mono text-[10px] uppercase tracking-widest",
                  stock.urgent ? "text-electric" : "text-steel"
                )}
              >
                {stock.text}
              </span>
            </div>
            <Progress value={stock.pct} className="h-0.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
