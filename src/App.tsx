/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Calendar, Heart, Shield, Cake, Music, Coffee, Clock } from "lucide-react";
import ConfettiButton from "./components/ConfettiButton";
import AgeDetector from "./components/AgeDetector";
import MessageBoard from "./components/MessageBoard";
import NatsonQuiz from "./components/NatsonQuiz";
import FleeingButton from "./components/FleeingButton";

export default function App() {
  const [activeTab, setActiveTab] = useState<"home" | "age" | "messages" | "quiz" | "present">("home");
  const [currentUtcTime, setCurrentUtcTime] = useState("");

  useEffect(() => {
    // Elegant local time indicator running in the corner to give a high-fidelity feel without telemetry spam
    const updateTime = () => {
      const now = new Date();
      setCurrentUtcTime(now.toLocaleString("pt-BR", { timeZone: "UTC" }) + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-[#f3f4f6] flex flex-col font-sans antialiased relative">
      {/* Decorative ambient glowing backdrops */}
      <div className="absolute top-[-10%] left-[5%] w-[40rem] h-[40rem] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none select-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[35rem] h-[35rem] rounded-full bg-purple-600/10 blur-[130px] pointer-events-none select-none" />
      <div className="absolute top-[40%] right-[10%] w-[30rem] h-[30rem] rounded-full bg-pink-600/5 blur-[120px] pointer-events-none select-none" />

      {/* Floating Header */}
      <header className="sticky top-0 z-40 bg-[#0b0f19]/70 backdrop-blur-md border-b border-slate-800/60 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-festive-purple to-festive-pink flex items-center justify-center text-white shadow-lg shadow-purple-900/30">
              <Cake className="w-5 h-5" />
            </div>
            <div>
              <span className="font-display font-extrabold text-lg text-white leading-none block">Natson Day</span>
              <span className="text-[10px] text-pink-400 font-mono tracking-widest uppercase block mt-0.5">Special Edition 2026</span>
            </div>
          </div>

          {/* Minimal design header statistics */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-800">
              <Coffee className="w-3.5 h-3.5 text-yellow-500 animate-pulse" />
              <span>Café consumido: 100%</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-800">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              <span>{currentUtcTime || "Carregando..."}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-20">
        {/* HERO SECTION */}
        <section id="hero-section" className="text-center relative py-8 space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-amber-400" /> Parabéns, lenda vivente!
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight leading-none">
              Feliz Aniversário, <br />
              <span className="festive-gradient-text drop-shadow-[0_2px_15px_rgba(124,58,237,0.3)] select-none">
                Natson!
              </span> 🥳
            </h1>
            <p className="text-slate-300 text-base sm:text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
              O site exclusivo projetado para celebrar o seu dia especial com piadas ecológicas, desafios lendários e muitas risadas!
            </p>
          </div>

          {/* Confetti Interactive Trigger */}
          <div className="flex justify-center pt-2">
            <ConfettiButton />
          </div>

          {/* Small bounce down helper */}
          <div className="pt-6 animate-pulse hidden sm:block">
            <span className="text-xs text-slate-500 font-mono uppercase tracking-widest block mb-2">Role para explorar as brincadeiras</span>
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-transparent mx-auto rounded-full" />
          </div>
        </section>

        {/* BRINCADEIRAS GRID DE SEÇÕES */}
        <div className="space-y-24">
          
          {/* SECTION 1: DETECTOR DE IDADE REAL */}
          <section id="idade-detector" className="scroll-mt-24">
            <AgeDetector />
          </section>

          {/* SECTION 2: TRIVIA / QUIZ */}
          <section id="natson-quiz" className="scroll-mt-24">
            <NatsonQuiz />
          </section>

          {/* SECTION 3: MURAL DE RECADOS */}
          <section id="mural-recados" className="scroll-mt-24">
            <MessageBoard />
          </section>

          {/* SECTION 4: BOTÃO FUGA - O GRANDE PRESENTE */}
          <section id="botao-fuga" className="scroll-mt-24">
            <FleeingButton />
          </section>

        </div>
      </main>

      {/* Footer Content */}
      <footer className="bg-slate-950 border-t border-slate-900 py-10 text-center text-xs text-slate-500 leading-relaxed font-mono relative mt-16">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <p className="flex justify-center items-center gap-1">
            Feito de coração com <Heart className="w-3.5 h-3.5 text-rose-500 animate-pulse fill-rose-500" /> para o 
            <span className="text-slate-300 font-bold ml-1">Natson</span> • 2026
          </p>
          <p className="text-[10px] text-slate-600">
            © Todos os direitos de sumiço no grupo e sono restaurados reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
