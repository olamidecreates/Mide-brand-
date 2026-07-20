"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, ShoppingBag, ArrowUpRight } from "lucide-react";

import { cn, arrowNudgeClass } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Magnetic } from "@/components/ui/magnetic";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const COLLECTIONS = [
  {
    title: "Outerwear",
    description: "Shells, coaches jackets, heavyweight fleece",
    href: "#",
  },
  {
    title: "Tops",
    description: "Tees, long sleeves, knitwear",
    href: "#",
  },
  {
    title: "Bottoms",
    description: "Denim, cargos, sweatpants",
    href: "#",
  },
  {
    title: "Accessories",
    description: "Headwear, bags, small leather goods",
    href: "#",
  },
];

const NAV_LINKS = [
  { label: "New Arrivals", href: "#" },
  { label: "Best Sellers", href: "#" },
  { label: "About", href: "#" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(2);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-200 ease-out",
        scrolled
          ? "border-b border-paper/10 bg-ink/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        {/* Wordmark */}
        <Link
          href="/"
          className="rounded-sm font-display text-lg font-bold uppercase tracking-tight text-paper transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric sm:text-xl"
        >
          Mide<span className="text-electric">.</span>Collectives
        </Link>

        {/* Desktop nav */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Collections</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[640px] grid-cols-[1fr_280px]">
                  {/* Category links */}
                  <ul className="grid grid-cols-2 gap-1 p-5">
                    {COLLECTIONS.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="group flex flex-col gap-1 rounded-xl p-3 transition-colors duration-200 hover:bg-paper/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
                          >
                            <span className="flex items-center gap-1.5 font-display text-sm font-bold uppercase tracking-tight text-paper">
                              {item.title}
                              <ArrowUpRight className="h-3.5 w-3.5 text-electric opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                            </span>
                            <span className="font-body text-xs leading-relaxed text-steel">
                              {item.description}
                            </span>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>

                  {/* Featured drop card */}
                  <NavigationMenuLink asChild>
                    <Link
                      href="#"
                      className="group relative m-3 ml-0 flex flex-col justify-end overflow-hidden rounded-xl border border-paper/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
                    >
                      <Image
                        src="https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop"
                        alt="Featured look from Drop 004"
                        fill
                        sizes="280px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                      <div className="relative p-4">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-electric">
                          Drop 004
                        </span>
                        <p className="mt-1 font-display text-sm font-bold uppercase tracking-tight text-paper">
                          Shop the Drop
                        </p>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {NAV_LINKS.map((link) => (
              <NavigationMenuItem key={link.label}>
                <NavigationMenuLink asChild>
                  <Link
                    href={link.href}
                    className="inline-flex h-9 items-center rounded-full px-4 font-mono text-xs uppercase tracking-widest text-paper/80 transition-colors duration-200 hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
                  >
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          {/* Cart */}
          <button
            type="button"
            aria-label={`Cart, ${cartCount} items`}
            onClick={() => setCartCount((c) => c + 1)}
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-paper transition-colors duration-200 hover:bg-paper/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
          >
            <ShoppingBag className="h-5 w-5" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className="absolute -right-0.5 -top-0.5"
                >
                  <Badge aria-hidden="true">{cartCount}</Badge>
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Desktop CTA — magnetic */}
          <Magnetic className="hidden lg:block">
            <Button size="sm" className="group">
              Shop Now
              <ArrowUpRight className={arrowNudgeClass} />
            </Button>
          </Magnetic>

          {/* Mobile menu trigger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="flex h-11 w-11 items-center justify-center rounded-full text-paper transition-colors duration-200 hover:bg-paper/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-sm">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>Mide Collectives — FW26</SheetDescription>
              </SheetHeader>

              <nav className="flex flex-col gap-1 px-6 py-8">
                <span className="mb-2 font-mono text-[10px] uppercase tracking-widest text-steel">
                  Collections
                </span>
                {COLLECTIONS.map((item) => (
                  <SheetClose asChild key={item.title}>
                    <Link
                      href={item.href}
                      className="border-b border-paper/10 py-3 font-display text-xl font-bold uppercase tracking-tight text-paper transition-colors hover:text-electric focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
                    >
                      {item.title}
                    </Link>
                  </SheetClose>
                ))}

                <span className="mb-2 mt-6 font-mono text-[10px] uppercase tracking-widest text-steel">
                  Explore
                </span>
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.label}>
                    <Link
                      href={link.href}
                      className="border-b border-paper/10 py-3 font-body text-sm text-steel-light transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-3 px-6 pb-8">
                <Button size="lg" className="w-full">
                  Shop Now
                  <ArrowUpRight />
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
