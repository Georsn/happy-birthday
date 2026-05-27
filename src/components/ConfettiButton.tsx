/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { motion } from "motion/react";
import { Sparkles, PartyPopper } from "lucide-react";

export default function ConfettiButton() {
  const [clickCount, setClickCount] = useState(0);

  const handleConfetti = () => {
    setClickCount((prev) => prev + 1);

    // Dynamic fire styles based on click counts
    if (clickCount % 3 === 0) {
      // Standard center explosion
      confetti({
        particleCount: 130,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#2563eb", "#7c3aed", "#db2777", "#fbbf24", "#34d399"],
      });
    } else if (clickCount % 3 === 1) {
      // Double side cannons
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ["#7c3aed", "#fbbf24", "#db2777"],
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ["#2563eb", "#fbbf24", "#db2777"],
      });
    } else {
      // Fireworks shower
      const duration = 2 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: randomInRange(0.3, 0.5) },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: randomInRange(0.3, 0.5) },
        });
      }, 250);
    }
  };

  return (
    <motion.button
      id="hero-confetti-button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleConfetti}
      className="relative px-8 py-4 bg-gradient-to-r from-festive-purple via-festive-pink to-festive-blue rounded-full text-white font-bold text-lg md:text-xl shadow-[0_0_25px_rgba(124,58,237,0.5)] cursor-pointer hover:shadow-[0_0_35px_rgba(219,39,119,0.8)] transition-all duration-300 flex items-center gap-3 overflow-hidden group select-none"
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      <PartyPopper className="w-6 h-6 animate-bounce" />
      <span>Estourar Confetes! 🎉</span>
      <Sparkles className="w-5 h-5 text-yellow-300 group-hover:rotate-12 transition-transform" />
    </motion.button>
  );
}
