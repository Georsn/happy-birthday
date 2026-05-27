/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PIADAS_IDADE } from "../data";
import { ShieldAlert, Cpu, Check, RefreshCw, Calendar, Sparkles } from "lucide-react";

export default function AgeDetector() {
  const [birthYear, setBirthYear] = useState<string>("");
  const [statusText, setStatusText] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [result, setResult] = useState<typeof PIADAS_IDADE[0] | null>(null);

  const steps = [
    "Iniciando escaneamento epigenético de Natson...",
    "Medindo nível de cafeína residual no fluxo sanguíneo (Alerta: 89% de saturação)...",
    "Rastreando histórico de mensagens ignoradas ou marcadas como lidas na mente...",
    "Calculando sono acumulado acumulado desde o Windows 98...",
    "Instalando cookies de bolo de prestígio virtuais no navegador...",
    "Acessando base de dados secreta das tias que perguntam 'e as namoradas?'...",
    "Analizando comportamento físico (stalar de ombro ao levantar da cadeira)...",
    "DIAGNÓSTICO CONCLUÍDO!"
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isProcessing) {
      let currentStepIndex = 0;
      setStatusText(steps[0]);
      
      interval = setInterval(() => {
        currentStepIndex += 1;
        if (currentStepIndex < steps.length) {
          setStatusText(steps[currentStepIndex]);
          setProgress(Math.round((currentStepIndex / (steps.length - 1)) * 100));
        } else {
          clearInterval(interval);
          setIsProcessing(false);
          // Pick a random funny diagnostic result
          const randomIndex = Math.floor(Math.random() * PIADAS_IDADE.length);
          setResult(PIADAS_IDADE[randomIndex]);
        }
      }, 900);
    }
    return () => clearInterval(interval);
  }, [isProcessing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const yearNum = parseInt(birthYear, 10);
    const currentYear = new Date().getFullYear();
    if (!birthYear || isNaN(yearNum) || yearNum < 1900 || yearNum > currentYear) {
      alert("Por favor, digite um ano de nascimento válido! (Ex: 1998)");
      return;
    }
    setIsProcessing(true);
    setProgress(0);
    setResult(null);
  };

  const handleReset = () => {
    setBirthYear("");
    setResult(null);
    setProgress(0);
    setStatusText("");
  };

  return (
    <div id="age-detector-container" className="bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />

      <div className="text-center mb-8">
        <span className="px-4 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 border border-blue-500/20 mb-3">
          <Cpu className="w-3.5 h-3.5" /> Biometria Humoral Quântica
        </span>
        <h2 className="text-3xl font-bold font-display text-white md:text-4xl">
          Detector de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Idade Real</span> 🔬
        </h2>
        <p className="text-slate-400 mt-2 max-w-xl mx-auto text-sm md:text-base">
          Natson, digite seu ano de nascimento para que nosso supercomputador analise seus traços cognitivos e físicos ultra-secretos!
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isProcessing && !result && (
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="max-w-md mx-auto space-y-5"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                placeholder="Ex e.g. 1996"
                className="block w-full pl-12 pr-4 py-4 bg-slate-950/60 border border-slate-700/80 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium text-lg leading-none"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-900/30 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Cpu className="w-5 h-5 animate-spin-slow" />
              Escanear Minha Idade Real! 🚀
            </motion.button>
          </motion.form>
        )}

        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-10 max-w-lg mx-auto text-center"
          >
            <div className="relative w-24 h-24 mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="42"
                  className="stroke-slate-800"
                  strokeWidth="6"
                  fill="transparent"
                />
                <motion.circle
                  cx="48"
                  cy="48"
                  r="42"
                  className="stroke-blue-500"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 42}
                  strokeDashoffset={2 * Math.PI * 42 * (1 - progress / 100)}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xl font-bold font-mono text-blue-400">
                {progress}%
              </div>
            </div>

            <motion.p
              key={statusText}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-white font-medium text-base h-12 flex items-center justify-center px-4"
            >
              {statusText}
            </motion.p>
            <span className="text-xs text-slate-500 font-mono mt-2 animate-pulse">
              ANALYZING DATA-STREAMS // NATSON_PROFILE_LOG
            </span>
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="max-w-2xl mx-auto bg-slate-950/80 rounded-2xl p-6 md:p-8 border-2 border-dashed border-indigo-500/40"
          >
            <div className="flex items-center gap-2 mb-4 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold max-w-max mx-auto">
              <ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0" />
              {result.titulo}
            </div>

            <p className="text-slate-300 mb-6 leading-relaxed text-center italic md:text-lg">
              "{result.texto}"
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
                <span className="text-xs text-slate-500 block mb-1 font-mono uppercase">Idade Mental Estimada</span>
                <span className="text-2xl font-bold text-pink-400 font-display">{result.idadeMental}</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
                <span className="text-xs text-slate-500 block mb-1 font-mono uppercase">Idade do Quadril/Física</span>
                <span className="text-2xl font-bold text-amber-400 font-display">{result.idadeFisica}</span>
              </div>
            </div>

            <div className="bg-blue-500/5 border border-blue-500/15 p-4 rounded-xl mb-6">
              <h4 className="text-blue-400 font-bold flex items-center gap-2 text-sm md:text-base mb-1">
                <Sparkles className="w-4 h-4 text-yellow-400" /> Conselho Clínico do Supercomputador:
              </h4>
              <p className="text-slate-300 text-xs md:text-sm">
                {result.conselho}
              </p>
            </div>

            <button
              onClick={handleReset}
              className="w-full sm:w-auto mx-auto block py-3 px-6 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm transition-all cursor-pointer text-center"
            >
              Escanear Novamente! 🔄
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
