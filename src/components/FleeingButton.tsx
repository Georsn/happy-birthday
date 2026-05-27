/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Gift, Smile, Award, CheckCheck, Sparkles, Heart } from "lucide-react";
import confetti from "canvas-confetti";

export default function FleeingButton() {
  const [attempts, setAttempts] = useState(0);
  const [position, setPosition] = useState({ x: 50, y: 50 }); // percentages
  const [hasCaptured, setHasCaptured] = useState(false);
  const [showPrize, setShowPrize] = useState(false);

  const handleFlee = () => {
    if (attempts >= 5) return; // allows capturing after 5 attempts
    
    // Generate new safe randomized percentages
    // Keep it between 10% and 80% so it stays comfortably inside container boundaries
    const newX = Math.floor(Math.random() * 70) + 10;
    const newY = Math.floor(Math.random() * 65) + 15;
    
    setPosition({ x: newX, y: newY });
    setAttempts((prev) => prev + 1);
  };

  const handleCapture = () => {
    setHasCaptured(true);
    setShowPrize(true);
    
    // Mega fire celebration confetti rain!
    const end = Date.now() + 3 * 1000;
    const colors = ["#fbbf24", "#db2777", "#7c3aed"];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleReset = () => {
    setAttempts(0);
    setPosition({ x: 50, y: 50 });
    setHasCaptured(false);
    setShowPrize(false);
  };

  // Fun helper messages depending on how many attempts they have tried
  const getAttemptMessage = () => {
    if (attempts === 0) return "Tente clicar no grande baú de moedas douradas!";
    if (attempts === 1) return "Opa! Quase lá! Mais rápido da próxima vez! ⚡";
    if (attempts === 2) return "Ei! Esse botão tem pernas ou o quê?! 🏃‍♂️";
    if (attempts === 3) return "Natson se teleportando com excelência! 🔮";
    if (attempts === 4) return "Última tentativa dramática... ele está cansando! 🥵";
    return "🔥 CANSAÇO PARALISANTE! O botão desistiu, agora você consegue! CLIQUE! 🔥";
  };

  return (
    <div id="fleeing-button-container" className="bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
      
      {/* Header */}
      <div className="text-center mb-8">
        <span className="px-4 py-1.5 bg-amber-500/10 text-amber-400 rounded-full text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 border border-amber-500/20 mb-3">
          <Gift className="w-3.5 h-3.5" /> O Grande Presente Misterioso
        </span>
        <h2 className="text-3xl font-bold font-display text-white md:text-4xl">
          Sala do <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Tesouro Real</span> 🎁
        </h2>
        <p className="text-slate-400 mt-2 max-w-xl mx-auto text-sm md:text-base">
          Natson, preparamos aquela surpresa de respeito para coroar o seu dia especial! Pegue o presente clicando abaixo.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!showPrize ? (
          <motion.div
            key="game-arena"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative bg-slate-950/60 border border-slate-800/80 rounded-2xl min-h-[340px] flex flex-col justify-between p-4"
          >
            {/* Status / Instructions bar */}
            <div className="w-full flex justify-between items-center bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-xl text-xs font-mono text-slate-400 z-10 transition-all">
              <span className="flex items-center gap-1.5">
                <Smile className="w-3.5 h-3.5 text-yellow-400 animate-pulse" /> {getAttemptMessage()}
              </span>
              <span className="bg-slate-950 px-2 py-0.5 rounded-md text-amber-400">
                Tentativas: {attempts}/5
              </span>
            </div>

            {/* Fleeing Button Arena */}
            <div className="flex-1 w-full relative">
              <motion.button
                id="fleeing-gift-button"
                onMouseEnter={handleFlee}
                onTouchStart={handleFlee}
                onClick={handleCapture}
                animate={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  translateX: "-50%",
                  translateY: "-50%"
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25
                }}
                className={`absolute cursor-pointer px-6 py-3 rounded-2xl font-bold text-sm md:text-base shadow-xl flex items-center gap-2 select-none z-20 ${
                  attempts >= 5
                    ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-emerald-500/20 ring-4 ring-emerald-400/40 animate-pulse"
                    : "bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-yellow-500/20"
                }`}
                style={{
                  left: "50%",
                  top: "50%"
                }}
              >
                {attempts >= 5 ? (
                  <>
                    <CheckCheck className="w-5 h-5" />
                    <span>Pegar Presente Agora! 🎁</span>
                  </>
                ) : (
                  <>
                    <Gift className="w-5 h-5 animate-bounce" />
                    <span>Resgatar Meu Presente!</span>
                  </>
                )}
              </motion.button>
            </div>

            {/* Floor signature */}
            <div className="text-center text-[10px] text-slate-600 font-mono">
              COMPUTING PHYSICAL CO-ORDINATES // VELOCITY VECTOR CAP
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="prize"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-2xl mx-auto bg-slate-950/90 rounded-2xl p-6 md:p-8 border-2 border-yellow-500/40 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl pointer-events-none animate-pulse" />
            
            <div className="inline-flex p-4 bg-yellow-500/15 text-yellow-400 rounded-full mb-4">
              <Gift className="w-12 h-12" />
            </div>

            <h3 className="text-2xl md:text-3xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 mb-2">
              🎁 Parabéns, Natson! Você Conseguiu!
            </h3>

            <div className="bg-yellow-500/5 border border-yellow-500/10 p-5 rounded-2xl my-6 text-left relative">
              <span className="absolute top-2 right-2 text-3xl opacity-20">🍰</span>
              <p className="text-slate-300 italic text-sm md:text-base leading-relaxed mb-4">
                "O verdadeiro presente são os amigos reais que fizemos no caminho..."
              </p>
              <p className="text-slate-200 text-sm md:text-base leading-relaxed">
                Mentira! 😂 O parabéns e a comemoração são 100% sinceros! Como seu amigo não pôde te entregar o troféu em mãos, favor copiar o código especial abaixo e cobrar o Pix sincero dele agora mesmo no WhatsApp!
              </p>

              {/* Secret code card */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 mt-5 text-center">
                <span className="text-[10px] text-slate-500 font-mono block uppercase">Código Secreto do Pix</span>
                <span className="text-xl font-mono text-yellow-400 font-bold tracking-widest block mt-1">
                  NATSON-MELHOR-DO-MUNDO-2026
                </span>
                <span className="text-[11px] text-emerald-400 block mt-1 font-sans">
                  👉 Válido para 1 abraço sincero + cobrança opcional de pastel!
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={handleReset}
                className="py-3 px-6 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm transition-all cursor-pointer"
              >
                Brincar Novamente 🔄
              </button>
              <button
                onClick={() => {
                  const msg = encodeURIComponent("Epa! Já capturei o botão de fuga e peguei o código secreto 'NATSON-MELHOR-DO-MUNDO-2026'! Cadê meu presente de verdade? kkkkk");
                  window.open(`https://wa.me/?text=${msg}`);
                }}
                className="py-3 px-6 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Heart className="w-4 h-4" /> Cobrar no WhatsApp!
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
