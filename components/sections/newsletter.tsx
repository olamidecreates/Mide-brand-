"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

import { useEmailSignup } from "@/lib/use-email-signup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";

const PERKS = [
  "Early access",
  "Limited drops",
  "Behind-the-scenes",
  "Members-only releases",
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export function Newsletter() {
  const { email, setEmail, submitted, handleSubmit } = useEmailSignup();

  return (
    <section
      id="newsletter"
      aria-labelledby="newsletter-heading"
      className="grain relative overflow-hidden bg-ink py-28 text-paper sm:py-36"
    >
      {/* Beautiful background — blurred lifestyle photography + radial glow */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2400&auto=format&fit=crop"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30 blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/25 blur-[140px]"
        />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="mx-auto max-w-2xl"
        >
          {/* Glass card */}
          <div className="rounded-3xl border border-paper/15 bg-paper/[0.06] p-8 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:p-14">
            <motion.p
              variants={fadeUp}
              className="text-center font-mono text-xs uppercase tracking-widest text-electric"
            >
              The List
            </motion.p>
            <motion.h2
              id="newsletter-heading"
              variants={fadeUp}
              className="mt-4 text-balance text-center font-display text-4xl font-bold uppercase leading-[0.95] tracking-tightest sm:text-5xl"
            >
              Join The Collective
            </motion.h2>

            <motion.ul
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
            >
              {PERKS.map((perk, i) => (
                <li key={perk} className="flex items-center">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-steel-light">
                    {perk}
                  </span>
                  {i < PERKS.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="ml-3 h-1 w-1 rounded-full bg-electric/70"
                    />
                  )}
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-10">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center justify-center gap-3 rounded-full border border-electric/40 bg-electric/10 px-6 py-4"
                  >
                    <Check className="h-4 w-4 text-electric" />
                    <span className="font-mono text-xs uppercase tracking-widest text-paper">
                      You&rsquo;re on the list — check your inbox
                    </span>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 sm:flex-row"
                  >
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email address
                    </label>
                    <Input
                      id="newsletter-email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1"
                    />
                    <Magnetic strength={0.15}>
                      <Button
                        type="submit"
                        size="lg"
                        className="group w-full bg-electric text-paper hover:bg-electric-glow sm:w-auto"
                      >
                        Sign Up
                        <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
                      </Button>
                    </Magnetic>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-center font-body text-xs text-steel"
            >
              No spam, unsubscribe anytime. One or two emails a month, only
              when there&rsquo;s something worth saying.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
