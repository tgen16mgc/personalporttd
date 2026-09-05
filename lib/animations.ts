import type { Variants } from "framer-motion";

const fluidEase: [number, number, number, number] = [0.32, 0.72, 0, 1];

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: fluidEase },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

export const cardCascade = (index: number): Variants => ({
  hidden: {
    opacity: 0,
    y: 80,
    rotate: index % 2 === 0 ? -3 : 3,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    rotate: index % 2 === 0 ? -1.5 : 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: fluidEase,
      delay: index * 0.12,
    },
  },
});

export const revealOnScroll: Variants = {
  hidden: {
    opacity: 0,
    y: 100,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: fluidEase,
    },
  },
};
