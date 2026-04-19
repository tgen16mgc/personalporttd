"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import Floating, { FloatingElement } from "@/components/fancy/image/parallax-floating";
import { AfterworkItem } from "@/content/pages/about";
import { X } from "lucide-react";

export function AfterworkParallax({ items }: { items: AfterworkItem[] }) {
  const [selected, setSelected] = useState<AfterworkItem | null>(null);

  const positions = [
    { depth: 0.5, className: "top-[15%] left-[10%]", size: "w-24 h-24 md:w-32 md:h-32" },
    { depth: 1.2, className: "top-[10%] left-[60%]", size: "w-32 h-40 md:w-40 md:h-56" },
    { depth: 2, className: "top-[5%] left-[30%]", size: "w-28 h-28 md:w-40 md:h-40" },
    { depth: 1, className: "top-[35%] left-[80%]", size: "w-24 h-24 md:w-32 md:h-32" },
    { depth: 2, className: "top-[60%] left-[10%]", size: "w-32 h-32 md:w-48 md:h-48" },
    { depth: 3, className: "top-[70%] left-[85%]", size: "w-32 h-40 md:w-48 md:h-64" },
    { depth: 0.8, className: "top-[80%] left-[30%]", size: "w-24 h-24 md:w-36 md:h-36" },
    { depth: 1.5, className: "top-[75%] left-[60%]", size: "w-40 h-40 md:w-56 md:h-56" },
    { depth: 0.6, className: "top-[45%] left-[15%]", size: "w-20 h-20 md:w-28 md:h-28" },
  ];

  return (
    <section className="bg-white relative h-[100svh] overflow-hidden select-none">
      <Container className="h-full flex flex-col items-center justify-center relative pointer-events-none">
        {/* Center Title Group */}
        <motion.div
          className="z-50 text-center space-y-4 items-center flex flex-col shrink-0"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.88 }}
        >
          <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)] mb-2 bg-white/80 px-2 py-1 rounded-full backdrop-blur-sm">
            Life outside work
          </p>
          <h2 className="text-6xl md:text-8xl lg:text-[8rem] text-[var(--color-ink)] font-[var(--font-display)] font-semibold italic leading-none drop-shadow-sm">
            After&middot;work
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-ink-light)] py-2 max-w-sm bg-white/80 px-4 py-2 rounded-full backdrop-blur-sm">
            The things that make me better at understanding people.
          </p>
        </motion.div>
      </Container>

      {/* Parallax Floating Container */}
      <Floating sensitivity={-0.6} className="overflow-hidden z-10 pointer-events-auto cursor-crosshair">
        {items.map((item, index) => {
          const pos = positions[index % positions.length];
          return (
            <FloatingElement key={item.id} depth={pos.depth} className={pos.className}>
              <motion.div
                layoutId={`modal-${item.id}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelected(item)}
                className={`relative group cursor-pointer overflow-hidden rounded-[1.5rem] shadow-lg ring-1 ring-black/5 ${pos.size}`}
              >
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    draggable={false}
                  />
                ) : (
                  <div
                    className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${item.bgGradient} transition-transform duration-500 group-hover:scale-105`}
                  >
                    <span className="text-4xl md:text-6xl drop-shadow-sm">{item.emoji}</span>
                  </div>
                )}
                {/* Overlay text on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium text-sm md:text-base px-4 text-center drop-shadow-md">
                    {item.title}
                  </span>
                </div>
              </motion.div>
            </FloatingElement>
          );
        })}
      </Floating>

      {/* Modal / Expanded Story View */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 pointer-events-auto"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/20 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />

            {/* Modal Box */}
            <motion.div
              layoutId={`modal-${selected.id}`}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10"
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0, hover: { duration: 0.3 } }}
            >
              {/* Image Side */}
              <div className={`w-full md:w-1/2 h-64 md:h-auto shrink-0 relative bg-gradient-to-br ${selected.bgGradient}`}>
                {selected.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-8xl drop-shadow-lg">{selected.emoji}</span>
                  </div>
                )}
              </div>

              {/* Content Side */}
              <div className="flex-1 p-8 md:p-10 flex flex-col justify-center overflow-y-auto">
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors"
                >
                  <X size={20} className="text-[var(--color-ink)]" />
                </button>
                
                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)] mb-3">
                  {selected.subtitle || "Afterwork"}
                </p>
                <h3 className="text-3xl md:text-4xl font-[var(--font-display)] font-semibold text-[var(--color-ink)] mb-6">
                  {selected.title}
                </h3>
                <div className="space-y-4 text-base md:text-lg text-[var(--color-ink-light)] leading-relaxed mb-8">
                  <p>{selected.description}</p>
                </div>
                
                <div className="mt-auto pt-6 border-t border-black/5">
                  <p className="text-sm font-medium text-[var(--color-ink)] flex items-center gap-2">
                    <span className="text-[var(--color-cyan)]">&rarr;</span>
                    {selected.takeaway}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
