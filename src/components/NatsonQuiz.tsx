/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { QUIZ_QUESTIONS } from "../data";
import { Award, CheckCircle2, XCircle, ChevronRight, HelpCircle, Trophy, RotateCcw, AlertCircle } from "lucide-react";
import confetti from "canvas-confetti";

export default function NatsonQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleAnswerSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswerIndex(index);
    setIsAnswered(true);

    const isCorrect = index === currentQuestion.correctAnswerIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      // Trigger a small sweet confetti splash for correct answers
      confetti({
        particleCount: 40,
        spread: 40,
        origin: { y: 0.7 },
        colors: ["#34d399", "#fbbf24"]
      });
    }
  };

  const handleNext = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswerIndex(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      // Big confetti burst for completing!
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 }
      });
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  const getResultBadge = (finalScore: number) => {
    const total = QUIZ_QUESTIONS.length;
    if (finalScore === total) {
      return {
        badge: "✨ GÊMEO CÓSMICO DE ALMA ✨",
        text: "Inacreditável! Você conhece o Natson melhor que ele mesmo! Você sabe perfeitamente seu nível de café, horários de sonecas e desculpas preferidas. Merece comer a maior fatia do bolo do Natson!",
        bgColor: "from-amber-500 to-yellow-500"
      };
    } else if (finalScore >= total * 0.7) {
      return {
        badge: "☕ PARCEIRO DE COPOS E SONECA ☕",
        text: "Excelente! Você conhece quase todas as manhas e segredos dele. Sabe quando ele sumiu do grupo ou se atrasou pra te encontrar e provavelmente já aceitou isso de braços abertos!",
        bgColor: "from-purple-500 to-pink-500"
      };
    } else if (finalScore >= total * 0.4) {
      return {
        badge: "🚪 CONHECIDO DE ELEVADOR 🚪",
        text: "Legal, você conhece o básico! Mas ainda cai nos truques dele de 'já estou saindo de casa'. Próxima vez, traga uma garrafa de café e tente extrair mais segredos do aniversariante!",
        bgColor: "from-blue-500 to-teal-500"
      };
    } else {
      return {
        badge: "🕵️ IMPOSTOR DISFARÇADO DETECTADO 🕵️",
        text: "Epa! Você tem certeza de que é amigo do Natson? Ou você só entrou aqui pra tentar comer salgadinho de graça? Brincadeiras à parte, é uma ótima desculpa pra marcar aquele café e bater um papo sincero!",
        bgColor: "from-red-500 to-rose-500"
      };
    }
  };

  const result = getResultBadge(score);

  return (
    <div id="quiz-container" className="bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Title Header */}
      <div className="text-center mb-8">
        <span className="px-4 py-1.5 bg-purple-500/10 text-purple-400 rounded-full text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 border border-purple-500/20 mb-3">
          <HelpCircle className="w-3.5 h-3.5" /> Trivia Exclusiva
        </span>
        <h2 className="text-3xl font-bold font-display text-white md:text-4xl">
          Quiz: Você conhece o <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Natson?</span> 🧠
        </h2>
        <p className="text-slate-400 mt-2 max-w-xl mx-auto text-sm md:text-base">
          Vamos colocar à prova o seu conhecimento sobre os peculiares hábitos de sobrevivência do lendário Natson!
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!quizFinished ? (
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 max-w-2xl mx-auto"
          >
            {/* Progress & Current Score */}
            <div className="flex justify-between items-center text-xs font-mono text-slate-500">
              <span>PERGUNTA {currentQuestionIndex + 1} DE {QUIZ_QUESTIONS.length}</span>
              <span>SCORE ATUAL: {score}/{currentQuestionIndex}</span>
            </div>

            {/* Slider bar */}
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <h3 className="text-xl md:text-2xl font-bold font-display text-white mt-4">
              {currentQuestion.question}
            </h3>

            {/* Alternatives */}
            <div className="space-y-3.5">
              {currentQuestion.options.map((option, index) => {
                let btnStyles = "bg-slate-950/40 border-slate-700/80 hover:bg-slate-950/80 text-slate-300 hover:border-slate-600";
                let icon = null;

                if (isAnswered) {
                  if (index === currentQuestion.correctAnswerIndex) {
                    btnStyles = "bg-emerald-500/10 border-emerald-500 text-emerald-300";
                    icon = <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
                  } else if (index === selectedAnswerIndex) {
                    btnStyles = "bg-red-500/10 border-red-500 text-red-300";
                    icon = <XCircle className="w-5 h-5 text-red-400" />;
                  } else {
                    btnStyles = "bg-slate-950/20 border-slate-800/80 text-slate-500 opacity-60";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={isAnswered}
                    className={`w-full py-4 px-5 rounded-2xl border text-left font-medium transition-all flex items-center justify-between gap-4 cursor-pointer text-sm md:text-base ${btnStyles}`}
                  >
                    <span>{option}</span>
                    {icon}
                  </button>
                );
              })}
            </div>

            {/* Feedback Explanation Card */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 flex gap-3.5 items-start"
                >
                  {selectedAnswerIndex === currentQuestion.correctAnswerIndex ? (
                    <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  ) : (
                    <div className="p-2 bg-red-500/10 text-red-400 rounded-xl">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                  )}
                  <div>
                    <h5 className="font-bold text-white text-sm md:text-base mb-1">
                      {selectedAnswerIndex === currentQuestion.correctAnswerIndex ? "Você Acertou! 🎯" : "Errou Feio! 😅"}
                    </h5>
                    <p className="text-xs md:text-sm text-slate-400">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next Button */}
            {isAnswered && (
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleNext}
                className="w-full sm:w-auto ml-auto block py-3.5 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-purple-950/20 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>{currentQuestionIndex + 1 === QUIZ_QUESTIONS.length ? "Finalizar Trivia" : "Próxima Pergunta"}</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-xl mx-auto space-y-6 text-center py-6"
          >
            <div className="inline-flex p-4 bg-purple-500/10 rounded-full text-purple-400 mb-2 relative">
              <Trophy className="w-16 h-16 text-yellow-400 animate-pulse" />
              <Award className="w-6 h-6 text-pink-400 absolute bottom-2 right-2" />
            </div>

            <h3 className="text-2xl md:text-3xl font-black font-display text-white">Quiz Finalizado!</h3>
            
            <div className="p-2 bg-slate-950/80 border border-slate-800 rounded-2xl max-w-sm mx-auto">
              <span className="text-xs text-slate-500 font-mono uppercase block mt-1">Pontuação Final</span>
              <span className="text-4xl md:text-5xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-400">
                {score} / {QUIZ_QUESTIONS.length} acertos
              </span>
            </div>

            {/* Hilarious Badge Card */}
            <div className={`p-6 rounded-2xl border text-left bg-gradient-to-br ${result.bgColor}`}>
              <span className="text-white bg-black/30 text-[10px] md:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest font-mono">
                {result.badge}
              </span>
              <h4 className="text-white font-black text-lg md:text-xl mt-3 leading-tight">Veredito Oficial:</h4>
              <p className="text-white/90 text-sm md:text-base mt-2 leading-relaxed">
                {result.text}
              </p>
            </div>

            <button
              onClick={handleRestart}
              className="mt-6 py-3 px-8 bg-slate-850 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-all cursor-pointer flex items-center justify-center gap-2 mx-auto"
            >
              <RotateCcw className="w-4 h-4" /> Refazer Trivia!
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
