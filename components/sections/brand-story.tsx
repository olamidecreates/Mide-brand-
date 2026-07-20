"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { arrowNudgeClass } from "@/lib/utils";

const FEATURES = [
  {
    label: "Process",
    title: "Cut in Small Batches",
    description:
      "Every pattern is graded by hand and cut in runs under 400 units, in the same ateliers in Portugal and Japan we've worked with since our first drop.",
  },
  {
    label: "Material",
    title: "Deadstock First",
    description:
      "We source deadstock and mill overrun fabric before anything virgin. Off-cuts go back to the same mills as scrap yarn, not landfill.",
  },
  {
    label: "Scarcity",
    title: "Capped Before We Cut",
    description:
      "Every drop is numbered and sized against pre-orders before production starts. When a size sells out, it's gone — we don't restock to chase a number.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const quoteContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const quoteLine = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const landscapeRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: portraitProgress } = useScroll({
    target: portraitRef,
    offset: ["start end", "end start"],
  });
  const portraitY = useTransform(portraitProgress, [0, 1], ["-8%", "8%"]);

  const { scrollYProgress: landscapeProgress } = useScroll({
    target: landscapeRef,
    offset: ["start end", "end start"],
  });
  const landscapeY = useTransform(landscapeProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      ref={sectionRef}
      id="story"
      aria-labelledby="brand-story-heading"
      className="relative overflow-hidden bg-ink py-28 text-paper sm:py-36"
    >
      <div className="container">
        {/* Eyebrow */}
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-14 font-mono text-xs uppercase tracking-widest text-electric sm:mb-20"
        >
          Our Philosophy
        </motion.p>

        {/* Row 1 — pull quote + portrait, offset for asymmetry */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={quoteContainer}
            className="lg:col-span-7 lg:pr-10"
          >
            <motion.span
              variants={quoteLine}
              aria-hidden="true"
              className="mb-2 block font-display text-7xl leading-none text-electric/50 sm:text-8xl"
            >
              &ldquo;
            </motion.span>
            <motion.h2
              id="brand-story-heading"
              variants={quoteLine}
              className="text-balance font-display text-3xl font-bold uppercase leading-[1.05] tracking-tight sm:text-4xl md:text-5xl"
            >
              We don&rsquo;t design for trends. We design for the six a.m.
              train, the studio, the block — clothes built to survive all
              three.
            </motion.h2>
            <motion.cite
              variants={quoteLine}
              className="mt-6 block font-mono text-xs not-italic uppercase tracking-widest text-steel"
            >
              — Founding Note, Mide Collectives
            </motion.cite>
          </motion.div>

          <motion.div
            ref={portraitRef}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="lg:col-span-5 lg:mt-20"
          >
            <div className="relative overflow-hidden rounded-2xl border border-paper/10">
              <AspectRatio ratio={3 / 4}>
                <motion.div style={{ y: portraitY }} className="h-[116%] w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1400&auto=format&fit=crop"
                    alt="Close-up of hand-finished stitching on a Mide Collectives jacket"
                    fill
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-cover object-center"
                  />
                </motion.div>
              </AspectRatio>
            </div>
          </motion.div>
        </div>

        <Separator className="my-20 bg-paper/10 sm:my-28" />

        {/* Row 2 — landscape image + philosophy copy / feature cards */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <motion.div
            ref={landscapeRef}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="order-2 lg:order-1 lg:col-span-6 lg:-mt-12"
          >
            <div className="relative overflow-hidden rounded-2xl border border-paper/10">
              <AspectRatio ratio={4 / 3}>
                <motion.div style={{ y: landscapeY }} className="h-[116%] w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1400&auto=format&fit=crop"
                    alt="Sample garments laid out during a fitting session"
                    fill
                    sizes="(min-width: 1024px) 45vw, 90vw"
                    className="object-cover object-center"
                  />
                </motion.div>
              </AspectRatio>
            </div>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-steel">
              Portugal Atelier — FW26 Sample Round
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="order-1 lg:order-2 lg:col-span-6"
          >
            <p className="max-w-md text-balance font-body text-base leading-relaxed text-steel-light sm:text-lg">
              Mide Collectives started as pattern-cutting sessions in a Lagos
              guest room and grew into a small house that still keeps its
              production runs small on purpose. We&rsquo;d rather sell out in
              four hours than sit on a rack for four months.
            </p>

            <div className="mt-10 flex flex-col">
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card className="group border-x-0 border-t-0 border-b border-paper/10 !bg-transparent p-0 text-paper transition-colors duration-200 last:border-b-0 hover:border-paper/20">
                    <div className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:gap-6">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-electric transition-colors duration-200 group-hover:text-electric-glow sm:w-24 sm:shrink-0">
                        {feature.label}
                      </span>
                      <div>
                        <h3 className="font-display text-lg font-bold uppercase tracking-tight text-paper">
                          {feature.title}
                        </h3>
                        <p className="mt-2 max-w-md font-body text-sm leading-relaxed text-steel">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-20 flex justify-start sm:mt-24"
        >
          <Button variant="outline" size="lg" className="group">
            Read the Full Story
            <ArrowUpRight className={arrowNudgeClass} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
