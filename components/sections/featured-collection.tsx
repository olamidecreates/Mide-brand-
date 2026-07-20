"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { cn, arrowNudgeClass } from "@/lib/utils";
import { FILTERS, PRODUCTS, type Filter } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { ProductCard, ProductCardSkeleton } from "@/components/product-card";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

function filterProducts(filter: Filter) {
  if (filter === "All") return PRODUCTS;
  if (filter === "New Arrivals") return PRODUCTS.filter((p) => p.badge === "New");
  return PRODUCTS.filter((p) => p.category === filter);
}

export function FeaturedCollection() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [loading, setLoading] = useState(true);

  // Simulated fetch — demonstrates the skeleton state on first paint.
  // In production this flag is driven by real product data loading.
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const products = useMemo(() => filterProducts(activeFilter), [activeFilter]);

  return (
    <section
      id="collection"
      aria-labelledby="featured-collection-heading"
      className="relative bg-paper py-24 sm:py-32"
    >
      <div className="container">
        {/* Editorial heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="flex flex-col items-start justify-between gap-8 border-b border-ink/10 pb-10 lg:flex-row lg:items-end"
        >
          <div className="max-w-xl">
            <motion.p
              variants={fadeUp}
              className="mb-4 font-mono text-xs uppercase tracking-widest text-electric"
            >
              FW26 — Curated Selection
            </motion.p>
            <motion.h2
              id="featured-collection-heading"
              variants={fadeUp}
              className="text-balance font-display text-4xl font-bold uppercase leading-[0.95] tracking-tightest text-ink sm:text-5xl md:text-6xl"
            >
              Featured
              <br />
              Collection
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="max-w-sm text-balance font-body text-sm leading-relaxed text-steel sm:text-base"
          >
            Each piece is produced in limited runs and numbered by drop. Once
            a size sells out within a drop, it does not return.
          </motion.p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center gap-2"
        >
          {FILTERS.map((filter) => {
            const active = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                aria-pressed={active}
                className={cn(
                  "relative rounded-full px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric",
                  active ? "text-paper" : "text-steel hover:text-ink"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="active-filter-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-ink"
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
          ) : (
            <AnimatePresence mode="popLayout">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {!loading && products.length === 0 && (
          <p className="mt-16 text-center font-body text-sm text-steel">
            No pieces in this category yet — check back with the next drop.
          </p>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-16 flex justify-center"
        >
          <Button variant="outlineLight" size="lg" className="group">
            Explore Full Collection
            <ArrowUpRight className={arrowNudgeClass} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
