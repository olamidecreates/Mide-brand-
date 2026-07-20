"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronDown, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { arrowNudgeClass } from "@/lib/utils";

const TICKER_ITEMS = [
  "MIDE COLLECTIVES",
  "DROP 004 — FW26",
  "LIMITED RUN",
  "FREE SHIPPING OVER $200",
  "MADE TO LAST",
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Subtle parallax: the backdrop image drifts slower than scroll, the
  // foreground copy fades as the visitor scrolls past the hero.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], ["0%", "8%"]);

  return (
    <section
      ref={sectionRef}
      aria-label="Hero"
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-ink"
    >
      {/* Backdrop photography */}
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=2400&auto=format&fit=crop"
          alt="Model wearing a Mide Collectives oversized jacket against an urban backdrop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-70"
        />
        {/* Layered gradients for legibility + mood */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/20 to-transparent" />
      </motion.div>

      {/* Grain texture for a tactile, premium surface */}
      <div className="grain absolute inset-0" aria-hidden="true" />

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="container relative z-10 flex flex-1 flex-col justify-center pt-28 pb-16 md:pt-32"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          {/* Eyebrow / drop code — grounded in streetwear release culture */}
          <motion.div
            variants={fadeUp}
            className="mb-7 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-steel-light"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-blink rounded-full bg-electric" />
            </span>
            Drop 004 / FW26 — Now Live
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-balance text-[13vw] font-bold uppercase leading-[0.9] tracking-tightest text-paper sm:text-[9vw] md:text-[6.4vw] lg:text-[5.6rem]"
          >
            Built for
            <br />
            the{" "}
            <span className="text-electric [text-shadow:0_0_40px_rgba(59,130,246,0.35)]">
              street.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-md text-balance font-body text-base leading-relaxed text-steel-light sm:text-lg"
          >
            Mide Collectives is a modern streetwear house — limited-run
            essentials engineered with luxury materials and worn like armor.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button size="lg" className="group">
              Shop the Collection
              <ArrowUpRight className={arrowNudgeClass} />
            </Button>
            <Button variant="outline" size="lg" className="group">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-paper/10 transition-colors duration-200 group-hover:bg-electric">
                <Play className="ml-0.5 h-3 w-3 fill-current" />
              </span>
              Watch the Film
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="pointer-events-none absolute bottom-24 right-6 z-10 hidden flex-col items-center gap-2 text-paper/50 md:right-10 md:flex lg:bottom-28"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest [writing-mode:vertical-rl]">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.div>

      {/* Ticker strip */}
      <div className="relative z-10">
        <Marquee items={TICKER_ITEMS} className="bg-ink/60 backdrop-blur-sm" />
      </div>
    </section>
  );
}
