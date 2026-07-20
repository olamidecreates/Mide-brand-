"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { BadgeCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";

interface Testimonial {
  quote: string;
  initials: string;
  city: string;
  date: string;
  image: string;
  imageAlt: string;
}

const FEATURED: Testimonial = {
  quote:
    "I almost returned the coach jacket — felt stiff out of the bag. Wore it through a wet March in Manchester instead and it's broken in exactly where my elbows bend. That's the only fit note that matters to me now.",
  initials: "D.O.",
  city: "Manchester, UK",
  date: "Purchased Mar 2026",
  image:
    "https://images.unsplash.com/photo-1548126032-079a0fb0099d?q=80&w=1400&auto=format&fit=crop",
  imageAlt: "Customer wearing the Mide Collectives coach jacket on a city street",
};

const SECONDARY: Testimonial[] = [
  {
    quote:
      "Ordered a size up for the drop-shoulder and still had to size down on the restock. Read the fit notes twice before you check out.",
    initials: "R.T.",
    city: "Austin, TX",
    date: "Purchased Jan 2026",
    image:
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Customer in a streetwear outfit leaning against a wall",
  },
  {
    quote:
      "The cargo pockets sit flat when empty, which sounds small until you've owned three pairs that didn't.",
    initials: "N.A.",
    city: "Lagos, Nigeria",
    date: "Purchased Nov 2025",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Customer wearing cargo pants and a jacket outdoors",
  },
  {
    quote:
      "Washed it cold, hung to dry like the tag said, zero shrink after six months of weekly wear. First hoodie I've kept that long.",
    initials: "S.K.",
    city: "Toronto, ON",
    date: "Purchased Aug 2025",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Customer wearing a hoodie in an urban setting",
  },
  {
    quote:
      "Bought the bone colorway expecting it to yellow by winter. Still reads clean — the fabric they used holds up better than it should at this price.",
    initials: "M.F.",
    city: "Lisbon, Portugal",
    date: "Purchased Feb 2026",
    image:
      "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Close-up of garment fabric and stitching detail",
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

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

function VerifiedMeta({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <span className="font-mono text-[10px] uppercase tracking-widest text-steel">
        {testimonial.initials} — {testimonial.city}
      </span>
      <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-electric">
        <BadgeCheck className="h-3 w-3" />
        Verified Buyer
      </span>
      <span className="font-mono text-[10px] uppercase tracking-widest text-steel/70">
        {testimonial.date}
      </span>
    </div>
  );
}

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden bg-ink py-28 text-paper sm:py-36"
    >
      <div className="container">
        {/* Eyebrow + heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
          className="max-w-2xl"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 font-mono text-xs uppercase tracking-widest text-electric"
          >
            In Their Words
          </motion.p>
          <motion.h2
            id="testimonials-heading"
            variants={fadeUp}
            className="text-balance font-display text-4xl font-bold uppercase leading-[0.95] tracking-tightest sm:text-5xl md:text-6xl"
          >
            Worn In, Not Just Worn
          </motion.h2>
        </motion.div>

        {/* Featured testimonial — asymmetric, offset image */}
        <div className="mt-20 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-6 sm:mt-28">
          <motion.div
            ref={imageRef}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="lg:col-span-5 lg:col-start-1"
          >
            <div className="relative overflow-hidden rounded-2xl border border-paper/10">
              <AspectRatio ratio={4 / 5}>
                <motion.div style={{ y: imageY }} className="h-[116%] w-full">
                  <Image
                    src={FEATURED.image}
                    alt={FEATURED.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-cover object-center"
                  />
                </motion.div>
              </AspectRatio>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="lg:col-span-6 lg:col-start-7 lg:mt-16"
          >
            <span
              aria-hidden="true"
              className="mb-2 block font-display text-6xl leading-none text-electric/50 sm:text-7xl"
            >
              &ldquo;
            </span>
            <p className="text-balance font-display text-2xl font-medium leading-[1.3] tracking-tight sm:text-3xl">
              {FEATURED.quote}
            </p>
            <div className="mt-6">
              <VerifiedMeta testimonial={FEATURED} />
            </div>
          </motion.div>
        </div>

        <Separator className="my-20 bg-paper/10 sm:my-28" />

        {/* Secondary testimonials — staggered offset grid for editorial asymmetry */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4"
        >
          {SECONDARY.map((testimonial, i) => (
            <motion.figure
              key={testimonial.initials}
              variants={fadeUp}
              className={cn(
                "flex flex-col",
                // Alternate vertical offset between columns for an asymmetric,
                // magazine-style rhythm rather than a rigid grid.
                i % 2 === 1 ? "sm:mt-12" : "sm:mt-0",
                i >= 2 ? "lg:mt-24" : "lg:mt-0"
              )}
            >
              <div className="relative overflow-hidden rounded-xl border border-paper/10">
                <AspectRatio ratio={3 / 4}>
                  <Image
                    src={testimonial.image}
                    alt={testimonial.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.06]"
                  />
                </AspectRatio>
              </div>
              <blockquote className="mt-5">
                <p className="text-balance font-body text-sm leading-relaxed text-paper/90">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-4">
                <VerifiedMeta testimonial={testimonial} />
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
