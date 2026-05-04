import { Variants, Transition } from "framer-motion";

// Premium cubic-bezier (Awwwards-tier fluid motion)
const fluidEase: [number, number, number, number] = [0.32, 0.72, 0, 1];

// Spring configurations matching design system
export const spring = {
  gentle: { type: "spring", stiffness: 100, damping: 20 } as Transition,
  bouncy: { type: "spring", stiffness: 300, damping: 20 } as Transition,
  snappy: { type: "spring", stiffness: 500, damping: 30 } as Transition,
};

// Fade variants
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8, ease: fluidEase }
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: fluidEase },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30, filter: "blur(4px)" },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: fluidEase },
  },
};

// Stagger container
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

// Scale variants
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(6px)" },
  visible: { 
    opacity: 1, 
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: fluidEase },
  },
};

// Slide variants
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -80, filter: "blur(6px)" },
  visible: { 
    opacity: 1, 
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: fluidEase },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 80, filter: "blur(6px)" },
  visible: { 
    opacity: 1, 
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: fluidEase },
  },
};

// Hover animations (premium cubic-bezier)
export const hoverLift = {
  y: -6,
  transition: { duration: 0.5, ease: fluidEase },
};

export const hoverScale = {
  scale: 1.03,
  transition: { duration: 0.5, ease: fluidEase },
};

// Magnetic button effect (use with custom hook)
export const magneticButton = {
  rest: { x: 0, y: 0 },
  hover: { scale: 1.05 },
};

// Page transition
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 30, filter: "blur(8px)" },
  animate: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: fluidEase,
    },
  },
  exit: { 
    opacity: 0, 
    y: -20,
    filter: "blur(4px)",
    transition: {
      duration: 0.4,
      ease: fluidEase,
    },
  },
};

// Card cascade (Z-axis effect)
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

// Reveal on scroll (use with intersection observer)
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

// Text reveal (character by character)
export const textRevealContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
    },
  },
};

export const textRevealChar: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Float animation (perpetual)
export const floatAnimation = {
  y: [0, -8, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};
