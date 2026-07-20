"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, ArrowUpRight } from "lucide-react";

import { cn, arrowNudgeClass } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface LookbookShot {
  image: string;
  alt: string;
  handle: string;
  /** Controls masonry rhythm — tall shots break the grid on purpose. */
  span: "tall" | "wide" | "default";
}

const SHOTS: LookbookShot[] = [
  {
    image:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1200&auto=format&fit=crop",
    alt: "Street style shot of a model in a Mide Collectives jacket at night",
    handle: "@midecollectives",
    span: "tall",
  },
  {
    image:
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=1000&auto=format&fit=crop",
    alt: "Model leaning against a concrete wall in streetwear",
    handle: "@d.odutola",
    span: "default",
  },
  {
    image:
      "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=1000&auto=format&fit=crop",
    alt: "Close crop of layered streetwear outfit",
    handle: "@midecollectives",
    span: "default",
  },
  {
    image:
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1400&auto=format&fit=crop",
    alt: "Group of friends wearing the current collection on a rooftop",
    handle: "@r.torres",
    span: "wide",
  },
  {
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop",
    alt: "Model wearing cargo pants and jacket outdoors",
    handle: "@midecollectives",
    span: "default",
  },
  {
    image:
      "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1000&auto=format&fit=crop",
    alt: "Detail shot of stitching and fabric texture",
    handle: "@n.abara",
    span: "default",
  },
  {
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1200&auto=format&fit=crop",
    alt: "Fitting session with sample garments laid out",
    handle: "@midecollectives",
    span: "tall",
  },
  {
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop",
    alt: "Model wearing a hoodie in an urban setting",
    handle: "@s.kim",
    span: "default",
  },
];

const spanClass: Record<LookbookShot["span"], string> = {
  tall: "sm:row-span-2",
  wide: "sm:col-span-2",
  default: "",
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export function Lookbook() {
  return (
    <section
      id="lookbook"
      aria-labelledby="lookbook-heading"
      className="relative bg-paper py-24 text-ink sm:py-32"
    >
      <div className="container">
        {/* Heading */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-ink/10 pb-10 sm:flex-row sm:items-end">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={container}
          >
            <motion.p
              variants={fadeUp}
              className="mb-4 font-mono text-xs uppercase tracking-widest text-electric"
            >
              @midecollectives
            </motion.p>
            <motion.h2
              id="lookbook-heading"
              variants={fadeUp}
              className="text-balance font-display text-4xl font-bold uppercase leading-[0.95] tracking-tightest text-ink sm:text-5xl md:text-6xl"
            >
              The Living
              <br />
              Lookbook
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Button variant="outlineLight" size="lg" className="group">
              Follow the Collective
              <Instagram className="transition-transform duration-200 group-hover:rotate-6" />
            </Button>
          </motion.div>
        </div>

        {/* Masonry grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:auto-rows-[220px] sm:gap-4"
        >
          {SHOTS.map((shot, i) => (
            <motion.div
              key={shot.image + i}
              variants={fadeUp}
              className={cn(
                "group relative aspect-square overflow-hidden rounded-xl border border-ink/10 sm:aspect-auto",
                spanClass[shot.span]
              )}
            >
              <Image
                src={shot.image}
                alt={shot.alt}
                fill
                sizes={
                  shot.span === "wide"
                    ? "(min-width: 640px) 50vw, 50vw"
                    : "(min-width: 640px) 25vw, 50vw"
                }
                className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex w-full items-center justify-between p-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-paper">
                    {shot.handle}
                  </span>
                  <ArrowUpRight className={cn("h-4 w-4 text-paper", arrowNudgeClass)} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
