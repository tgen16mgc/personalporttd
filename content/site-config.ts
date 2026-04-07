/**
 * SITE CONFIGURATION
 * 
 * Edit this file to update your portfolio content.
 * No CMS needed! Just change the values and save.
 * 
 * After editing, run: npm run dev
 */

export const siteConfig = {
  // Personal Info
  name: "Tien Duong Ngoc",
  shortName: "Tien",
  title: "Account Executive",
  company: "Red Agency JSC",
  location: "Hanoi, Vietnam",
  email: "tiendn.fw@gmail.com",
  phone: "(+84) 345 205 918",
  linkedin: "https://www.linkedin.com/in/tienduongngoc/",
  
  // Hero Section
  hero: {
    greeting: "Hi, I'm Tien.",
    tagline: "I help brands stop talking at people and start talking with them. The kind of work that makes someone say \"finally, they get it\" not just \"oh, another ad.\"",
    currentRole: "Account Executive (Hybrid) @ Red Agency JSC",
    previousRole: "Creative Executive (Part-time) @ VuVer.vn",
    education: "Marketing @ NEU, GPA 3.69 (yes, I actually study)",
    status: "Open to opportunities",
  },

  // About Page
  about: {
    hook: "Xin chào. Hello. I'm Tien.<br /><span class=\"text-[var(--color-ink-light)]\">Think of me as the person who makes brands sound human instead of corporate. Especially when they're talking to people who can smell inauthenticity from a mile away.</span>",
    
    experience: [
      { company: "Red Agency JSC", location: "Hanoi, Vietnam", role: "Account Executive", period: "2025 - present" },
      { company: "Red Agency JSC", location: "Hanoi, Vietnam", role: "Marketing Intern", period: "2024" },
    ],
    
    recognition: [
      { title: "Account Executive", event: "Social Pioneers 2025", note: "team Chuồn Ngố" },
      { title: "Account Executive", event: "Digital Creatory 2024" },
      { title: "Account Executive", event: "Marketing Olympics ASEAN 2025" },
    ],
    
    education: {
      school: "National Economics University",
      location: "Hanoi, Vietnam",
      degree: "Marketing",
      graduation: "2027",
      gpa: "3.69/4.0",
    },
  },

  // Fun facts shown as floating badges
  funFacts: ["🏆 Champion", "Social Pioneers '25", "☕ Runs on cà phê sữa đá", "🎮 10yr LoL veteran (mid main)"],

  // Industries & Tools (shown in hero)
  industries: ["F&B", "Hospitality", "Lifestyle", "FMCG"],
  tools: ["Meta", "TikTok", "AI Tools", ""],

  // Navigation
  navigation: [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

/**
 * AFTERWORK CONTENT
 * 
 * Your hobbies/interests section.
 * Each item gets its own card in the bento grid.
 */
export const afterworkContent = [
  {
    id: "lol",
    title: "Account Executive",
    subtitle: "Account Executive",
    description: "The best players make everyone else look good. That's support in a nutshell. Also: staying calm when the team is flaming at 11pm? That skill transfers directly to client crises.",
    takeaway: "Learning to lose gracefully",
    image: "/afterwork/lol.jpg",
    emoji: "🎮",
    imageFile: "lol.jpg",
    bgColor: "bg-gradient-to-br from-violet-50 to-indigo-100",
    size: "large",
  },
  {
    id: "guitar", 
    title: "Account Executive",
    subtitle: null,
    description: "Self-taught. Still can't nail barre chords. But choosing to be a beginner keeps you humble.",
    takeaway: "The discipline of being bad at something",
    image: "/afterwork/guitar.jpg",
    emoji: "🎸",
    imageFile: "guitar.jpg",
    bgColor: "bg-gradient-to-br from-amber-50 to-orange-100",
    size: "small",
  },
  {
    id: "coffee",
    title: "Account Executive",
    subtitle: null,
    description: "Morning. Afternoon. Evening. Sitting at vỉa hè stalls, watching Hanoi go by.",
    takeaway: "Insights live in the pauses",
    image: "/afterwork/coffee.jpg",
    emoji: "☕",
    imageFile: "coffee.jpg",
    bgColor: "bg-gradient-to-br from-amber-50 to-yellow-100", 
    size: "small",
  },
  {
    id: "cat",
    title: "Account Executive",
    subtitle: "Account Executive",
    description: "She ignores me when I want attention. Demands pets at the worst times. Zero respect for my deadlines. Perfect training for understanding that the world doesn't revolve around your brand.",
    takeaway: "Your customer has a whole life going on",
    image: "/afterwork/cat.jpg",
    emoji: "🐱",
    imageFile: "cat.jpg",
    bgColor: "bg-gradient-to-br from-pink-50 to-rose-100",
    size: "large",
  },
];

/**
 * PHILOSOPHY CONTENT
 */
export const philosophyContent = {
  approach: {
    headline: "Marketing isn't about winning customers.",
    subheadline: "It's about understanding people well enough to actually help them.",
    paragraphs: [
      "My approach is deeply inspired by Hùng Võ (APAC 2021 Top 50 CMO) and his philosophy of \"Hiểu để yêu thương\": understand in order to love. Marketing isn't a battle for attention. It's a battle of moving people from mind to heart.",
      "That means starting every project not with \"how do we get people to buy?\" but with \"what struggle do they wake up worrying about?\"",
      "The campaigns I'm most proud of aren't the ones that hit the biggest numbers. They're the ones where someone reached out saying \"I felt seen.\"",
    ],
  },
  
  quote: "The best marketing doesn't feel like marketing. It feels like someone finally understood what you were going through.",
  
  mission: "I'm not chasing awards or viral moments. I'm trying to create work that makes people feel less alone. Work that gives them belonging, confidence, or just a moment of real connection.",
};
