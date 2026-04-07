"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Footer } from "@/components/layout/Footer";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Camera } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      {/* Hero - Big Photo + Simple Intro (like Hoang's page) */}
      <section className="pt-40 pb-24">
        <Container>
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
              {/* Left: Photo */}
              <motion.div 
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="lg:col-span-5"
              >
                <div className="p-2 rounded-[2rem] bg-white/60 ring-1 ring-black/[0.04]">
                  <div className="rounded-[calc(2rem-0.5rem)] bg-[var(--color-cream-dark)] aspect-[3/4] overflow-hidden relative">
                    {/* Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center text-[var(--color-ink-muted)]">
                      <div className="text-center">
                        <Camera className="w-16 h-16 mx-auto mb-3 text-[var(--color-ink-muted)]" strokeWidth={1} />
                        <p className="text-sm">Your photo here</p>
                        <p className="text-xs text-[var(--color-ink-muted)] mt-1">/public/tien-about.jpg</p>
                      </div>
                    </div>
                    {/* <img src="/tien-about.jpg" alt="Tien Duong" className="w-full h-full object-cover" /> */}
                  </div>
                </div>
              </motion.div>

              {/* Right: Content - inspired by Hoang's format */}
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="lg:col-span-7"
              >
                {/* The Hook - inspired by "bridge between sriracha and ranch" */}
                <motion.h1 
                  variants={fadeInUp}
                  className="text-[clamp(1.75rem,4vw,2.5rem)] font-[var(--font-display)] font-semibold text-[var(--color-ink)] mb-8 leading-[1.2]"
                >
                  Xin chào. Hello. I'm Tien.<br />
                  <span className="text-[var(--color-ink-light)]">
                    Think of me as the person who makes brands sound human 
                    instead of corporate. Especially when they're talking to 
                    people who can smell inauthenticity from a mile away.
                  </span>
                </motion.h1>

                {/* Experience - simple like Hoang/Kien */}
                <motion.div variants={fadeInUp} className="mb-8">
                  <p className="text-sm font-medium text-[var(--color-ink)] uppercase tracking-wider mb-4">Experience</p>
                  <ul className="space-y-2 text-[var(--color-ink-light)]">
                    <li><span className="text-[var(--color-ink)] font-medium">Red Agency JSC</span>, Hanoi | Account Executive (2025 - present)</li>
                    <li><span className="text-[var(--color-ink)] font-medium">LG Electronics</span>, Hanoi | Marketing Intern (2024)</li>
                  </ul>
                </motion.div>

                {/* Personal bits - like Hoang's food-verse links */}
                <motion.div variants={fadeInUp} className="mb-8 space-y-2">
                  <p className="text-[var(--color-ink-light)]">
                    • I run on <span className="text-[var(--color-ink)]">cà phê sữa đá</span> and can debate LoL builds for hours. 
                    Check out my <Link href="/work" className="text-[var(--color-cyan)] hover:underline">work</Link>.
                  </p>
                  <p className="text-[var(--color-ink-light)]">
                    • I dream of having croissants in Paris one day. 
                    Until then, <span className="text-[var(--color-ink)]">bánh mì chả</span> in Hanoi hits different.
                  </p>
                </motion.div>

                {/* Recognition - simple bullet list like Kien's */}
                <motion.div variants={fadeInUp} className="mb-8">
                  <p className="text-sm font-medium text-[var(--color-ink)] uppercase tracking-wider mb-4">Recognition</p>
                  <ul className="space-y-2 text-[var(--color-ink-light)]">
                    <li>
                      <span className="text-[var(--color-ink)] font-medium">Champion</span>, Social Pioneers 2025 (team Chuồn Ngố)
                    </li>
                    <li>
                      <span className="text-[var(--color-ink)] font-medium">1st Runner-up</span>, Digital Creatory 2024
                    </li>
                    <li>
                      <span className="text-[var(--color-ink)] font-medium">Semi-finalist</span>, Marketing Olympics ASEAN 2025
                    </li>
                  </ul>
                </motion.div>

                {/* Education - simple like Hoang's */}
                <motion.div variants={fadeInUp}>
                  <p className="text-sm font-medium text-[var(--color-ink)] uppercase tracking-wider mb-4">Education</p>
                  <p className="text-[var(--color-ink-light)]">
                    <span className="text-[var(--color-ink)] font-medium">National Economics University</span> | Hanoi<br />
                    Marketing (Graduating 2027) | GPA 3.69/4.0
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* How I Think About Marketing */}
      <section className="py-24 bg-white">
        <Container>
          <ScrollReveal>
            <div className="max-w-3xl">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-cyan)] mb-4">
                My Approach
              </p>
              <h2 className="text-3xl font-[var(--font-display)] font-semibold text-[var(--color-ink)] mb-8 leading-tight">
                Marketing isn't about winning customers.<br />
                <span className="text-[var(--color-ink-light)]">It's about understanding people well enough to actually help them.</span>
              </h2>

              <div className="space-y-8 text-lg text-[var(--color-ink-light)] leading-relaxed">
                <p>
                  My approach is deeply inspired by <span className="text-[var(--color-ink)] font-medium">Hùng Võ</span> (APAC 
                  2021 Top 50 CMO) and his philosophy of <span className="text-[var(--color-ink)] font-medium">"Hiểu để yêu thương"</span>: 
                  understand in order to love. Marketing isn't a battle for attention. It's a battle of moving people 
                  from mind to heart.
                </p>
                
                <p>
                  That means starting every project not with "how do we get people to buy?" but with 
                  <span className="text-[var(--color-ink)]"> "what struggle do they wake up worrying about?"</span>
                </p>

                <p>
                  The campaigns I'm most proud of aren't the ones that hit the biggest numbers. 
                  They're the ones where someone reached out saying "I felt seen."
                </p>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* What Shapes How I Work */}
      <section className="py-24">
        <Container>
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)] mb-4">
                  What Shapes My Work
                </p>
                <h2 className="text-2xl font-[var(--font-display)] font-semibold text-[var(--color-ink)] mb-6">
                  Living Multiple Lives
                </h2>
                <div className="space-y-4 text-[var(--color-ink-light)]">
                  <p>
                    You can't write for people you've never talked to. So I try to live messily: 
                    eating at the phở stall next to the xe ôm drivers at 6am, then presenting to 
                    executives in an air-conditioned boardroom by noon.
                  </p>
                  <p>
                    The best insights don't come from data dashboards. They come from overhearing 
                    a mom complain about her kid's eating habits, or watching how a group of Gen Z 
                    friends roast each other's fashion choices. <span className="text-[var(--color-ink)]">Real life is the research.</span>
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)] mb-4">
                  What I'm Still Learning
                </p>
                <h2 className="text-2xl font-[var(--font-display)] font-semibold text-[var(--color-ink)] mb-6">
                  Slowing Down to See Clearly
                </h2>
                <div className="space-y-4 text-[var(--color-ink-light)]">
                  <p>
                    This industry moves fast and rewards people who move faster. I used to think 
                    speed was the game. Now I think clarity is.
                  </p>
                  <p>
                    The times I've messed up were times I was so busy proving I could deliver quickly 
                    that I didn't stop to ask: <span className="text-[var(--color-ink)]">"Is this actually what they need?"</span> 
                    Humility isn't weakness. It's the only way to stay curious enough to keep learning.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Afterwork Section - Visual Grid Layout */}
      <section className="py-24 bg-white">
        <Container>
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)] mb-4">
                  Life outside work
                </p>
                <h2 className="text-3xl font-[var(--font-display)] font-semibold text-[var(--color-ink)]">
                  After·work
                </h2>
              </div>
              <p className="text-[var(--color-ink-light)] max-w-md mt-4 lg:mt-0">
                The things that make me better at understanding people.
              </p>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* LoL - Large Card */}
              <motion.div 
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="lg:col-span-2 group"
              >
                <div className="p-2 rounded-[2rem] bg-white/60 ring-1 ring-black/[0.04] h-full">
                  <div className="rounded-[calc(2rem-0.5rem)] bg-gradient-to-br from-violet-50 to-indigo-100 p-8 h-full flex flex-col md:flex-row gap-6">
                    {/* Image placeholder */}
                    <div className="w-full md:w-48 h-48 md:h-auto rounded-xl bg-white/60 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      <div className="text-center text-[var(--color-ink-muted)]">
                        <span className="text-4xl block mb-2">🎮</span>
                        <p className="text-xs">/public/afterwork/lol.jpg</p>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-medium text-[var(--color-ink)] mb-3">
                        League of Legends
                      </h3>
                      <p className="text-sm text-[var(--color-ink-muted)] mb-4">10 years · Support main · Platinum</p>
                      <p className="text-[var(--color-ink-light)] leading-relaxed mb-4">
                        The best players make everyone else look good. That's support in a nutshell. 
                        Also: staying calm when the team is flaming at 11pm? That skill transfers directly to client crises.
                      </p>
                      <p className="text-sm text-[var(--color-ink)] font-medium">
                        ↳ Learning to lose gracefully
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Guitar - Small Card */}
              <motion.div 
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group"
              >
                <div className="p-2 rounded-[2rem] bg-white/60 ring-1 ring-black/[0.04] h-full">
                  <div className="rounded-[calc(2rem-0.5rem)] bg-gradient-to-br from-amber-50 to-orange-100 p-6 h-full">
                    {/* Image placeholder */}
                    <div className="w-full h-32 rounded-xl bg-white/60 mb-4 flex items-center justify-center overflow-hidden">
                      <div className="text-center text-[var(--color-ink-muted)]">
                        <span className="text-3xl block mb-1">🎸</span>
                        <p className="text-[10px]">/public/afterwork/guitar.jpg</p>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-[var(--color-ink)] mb-2">
                      Guitar
                    </h3>
                    <p className="text-sm text-[var(--color-ink-light)] leading-relaxed mb-3">
                      Self-taught. Still can't nail barre chords. But choosing to be a beginner keeps you humble.
                    </p>
                    <p className="text-xs text-[var(--color-ink)] font-medium">
                      ↳ The discipline of being bad at something
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Coffee - Small Card */}
              <motion.div 
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group"
              >
                <div className="p-2 rounded-[2rem] bg-white/60 ring-1 ring-black/[0.04] h-full">
                  <div className="rounded-[calc(2rem-0.5rem)] bg-gradient-to-br from-amber-50 to-yellow-100 p-6 h-full">
                    {/* Image placeholder */}
                    <div className="w-full h-32 rounded-xl bg-white/60 mb-4 flex items-center justify-center overflow-hidden">
                      <div className="text-center text-[var(--color-ink-muted)]">
                        <span className="text-3xl block mb-1">☕</span>
                        <p className="text-[10px]">/public/afterwork/coffee.jpg</p>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-[var(--color-ink)] mb-2">
                      Cà phê sữa đá
                    </h3>
                    <p className="text-sm text-[var(--color-ink-light)] leading-relaxed mb-3">
                      Morning. Afternoon. Evening. Sitting at vỉa hè stalls, watching Hanoi go by.
                    </p>
                    <p className="text-xs text-[var(--color-ink)] font-medium">
                      ↳ Insights live in the pauses
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Cat - Large Card */}
              <motion.div 
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="lg:col-span-2 group"
              >
                <div className="p-2 rounded-[2rem] bg-white/60 ring-1 ring-black/[0.04] h-full">
                  <div className="rounded-[calc(2rem-0.5rem)] bg-gradient-to-br from-pink-50 to-rose-100 p-8 h-full flex flex-col md:flex-row gap-6">
                    <div className="flex-1 order-2 md:order-1">
                      <h3 className="text-xl font-medium text-[var(--color-ink)] mb-3">
                        Living with a cat
                      </h3>
                      <p className="text-sm text-[var(--color-ink-muted)] mb-4">She runs the house, not me</p>
                      <p className="text-[var(--color-ink-light)] leading-relaxed mb-4">
                        She ignores me when I want attention. Demands pets at the worst times. 
                        Zero respect for my deadlines. Perfect training for understanding that the world doesn't revolve around your brand.
                      </p>
                      <p className="text-sm text-[var(--color-ink)] font-medium">
                        ↳ Your customer has a whole life going on
                      </p>
                    </div>
                    {/* Image placeholder */}
                    <div className="w-full md:w-48 h-48 md:h-auto rounded-xl bg-white/60 flex-shrink-0 flex items-center justify-center overflow-hidden order-1 md:order-2">
                      <div className="text-center text-[var(--color-ink-muted)]">
                        <span className="text-4xl block mb-2">🐱</span>
                        <p className="text-xs">/public/afterwork/cat.jpg</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Philosophy */}
      <section className="py-24">
        <Container>
          <ScrollReveal>
            <div className="max-w-3xl">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)] mb-6">
                What Guides Me
              </p>
              <blockquote className="text-[clamp(1.5rem,4vw,2.5rem)] font-[var(--font-display)] text-[var(--color-ink)] leading-[1.3]">
                "The best marketing doesn't feel like marketing. It feels like someone finally 
                understood what you were going through."
              </blockquote>
              <div className="mt-10 pt-8 border-t border-[var(--color-cream-dark)] space-y-4">
                <p className="text-[var(--color-ink-light)]">
                  I'm not chasing awards or viral moments. I'm trying to create work that 
                  makes people feel <span className="text-[var(--color-ink)]">less alone</span>. Work that gives them 
                  belonging, confidence, or just a moment of real connection.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Let's Talk */}
      <section className="py-32 bg-[var(--color-ink)] text-white">
        <Container>
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-cyan)] mb-4">
                Let's Connect
              </p>
              <h2 className="font-[var(--font-display)] text-4xl sm:text-5xl mb-6">
                Got a project? A question?<br />
                Or just want to talk LoL builds?
              </h2>
              <p className="text-white/60 mb-10">
                I'm always down for a good conversation. Especially if it involves 
                marketing strategy, creative campaigns, or debating whether AP or AD 
                is better on certain champions.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="mailto:tiendn.fw@gmail.com"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[var(--color-ink)] rounded-full font-medium hover:bg-white/90 transition-colors"
                >
                  tiendn.fw@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/tienduongngoc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 rounded-full font-medium hover:bg-white/10 transition-colors"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <Footer />
    </>
  );
}
