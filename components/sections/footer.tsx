"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowUp, Instagram, Twitter, Youtube } from "lucide-react";

import { useEmailSignup } from "@/lib/use-email-signup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SHOP_LINKS = [
  { label: "New Arrivals", href: "#" },
  { label: "Best Sellers", href: "#best-sellers" },
  { label: "Outerwear", href: "#" },
  { label: "Accessories", href: "#" },
];

const COMPANY_LINKS = [
  { label: "Our Story", href: "#story" },
  { label: "Lookbook", href: "#lookbook" },
  { label: "Sustainability", href: "#" },
  { label: "Careers", href: "#" },
];

const SUPPORT_LINKS = [
  { label: "Shipping & Returns", href: "#" },
  { label: "Size Guide", href: "#" },
  { label: "Track Order", href: "#" },
  { label: "FAQ", href: "#" },
];

const SOCIALS = [
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "Twitter", href: "#", Icon: Twitter },
  { label: "YouTube", href: "#", Icon: Youtube },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
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

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <motion.div variants={fadeUp}>
      <h3 className="font-mono text-[10px] uppercase tracking-widest text-steel">
        {title}
      </h3>
      <ul className="mt-5 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="rounded-sm font-body text-sm text-paper/80 transition-colors duration-200 hover:text-electric focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function Footer() {
  const { email, setEmail, submitted, handleSubmit } = useEmailSignup();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="container py-20 sm:py-24">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8"
        >
          {/* Brand mission */}
          <motion.div variants={fadeUp} className="lg:col-span-5">
            <span className="font-display text-2xl font-bold uppercase tracking-tight text-paper">
              Mide Collectives
            </span>
            <p className="mt-5 max-w-sm text-balance font-body text-sm leading-relaxed text-steel-light">
              A small streetwear house cutting limited runs at the
              intersection of luxury and the street. We&rsquo;d rather sell
              out in four hours than sit on a rack for four months.
            </p>

            {/* Mini newsletter */}
            <div className="mt-8 max-w-sm">
              <p className="font-mono text-[10px] uppercase tracking-widest text-steel">
                Get the next drop first
              </p>
              {submitted ? (
                <p className="mt-3 font-mono text-xs uppercase tracking-widest text-electric">
                  You&rsquo;re in — welcome to the list.
                </p>
              ) : (
                <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
                  <label htmlFor="footer-email" className="sr-only">
                    Email address
                  </label>
                  <Input
                    id="footer-email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 flex-1 rounded-full px-4 text-xs"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="h-11 w-11 shrink-0 rounded-full bg-paper text-ink hover:bg-electric hover:text-paper"
                    aria-label="Subscribe"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Quick links */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-5 lg:col-start-7">
            <FooterColumn title="Shop" links={SHOP_LINKS} />
            <FooterColumn title="Company" links={COMPANY_LINKS} />
            <FooterColumn title="Support" links={SUPPORT_LINKS} />
          </div>

          {/* Contact + socials */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-6 lg:col-span-2 lg:col-start-12 lg:items-end"
          >
            <div className="lg:text-right">
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-steel">
                Contact
              </h3>
              <a
                href="mailto:hello@midecollectives.com"
                className="mt-5 block rounded-sm font-body text-sm text-paper/80 transition-colors duration-200 hover:text-electric focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
              >
                hello@midecollectives.com
              </a>
              <p className="mt-2 font-body text-sm text-paper/80">
                Lagos · Lisbon
              </p>
            </div>
            <div className="flex gap-3 lg:justify-end">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/15 text-paper/70 transition-colors duration-200 hover:border-electric hover:text-electric focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-6 border-t border-paper/10 pt-8 sm:flex-row sm:items-center sm:gap-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-steel">
            © {new Date().getFullYear()} Mide Collectives. Drop 004 — FW26.
          </p>

          <div className="flex items-center gap-6">
            <span className="hidden font-mono text-[10px] uppercase tracking-widest text-steel sm:inline">
              Est. Lagos
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-paper/15 text-paper/70 transition-colors duration-200 hover:border-electric hover:text-electric focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
            >
              <ArrowUp className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
