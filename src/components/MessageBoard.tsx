/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Recado } from "../types";
import { MOCK_RECADOS } from "../data";
import { PlusCircle, MessageSquare, User, Smile, Sparkles } from "lucide-react";

export default function MessageBoard() {
  const [recados, setRecados] = useState<Recado[]>([]);
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [selectedColor, setSelectedColor] = useState("bg-amber-400 text-slate-900 border-amber-300");

  const colorOptions = [
    { label: "Amarelo Pipoca", value: "bg-amber-400 text-slate-900 border-amber-300" },
    { label: "Violeta Neon", value: "bg-purple-400 text-slate-950 border-purple-300" },
    { label: "Azul Radiante", value: "bg-blue-400 text-slate-950 border-blue-300" },
    { label: "Rosa Pink", value: "bg-pink-400 text-slate-950 border-pink-300" },
    { label: "Verde Menta", value: "bg-emerald-400 text-slate-950 border-emerald-300" }
  ];

  // Load from LocalStorage or default to MOCK_RECADOS
  useEffect(() => {
    const saved = localStorage.getItem("natson_birthday_recados");
    if (saved) {
      try {
        setRecados(JSON.parse(saved));
      } catch (e) {
        setRecados(MOCK_RECADOS);
      }
    } else {
      setRecados(MOCK_RECADOS);
    }
  }, []);

  const saveRecadosToLocal = (updatedList: Recado[]) => {
    setRecados(updatedList);
    localStorage.setItem("natson_birthday_recados", JSON.stringify(updatedList));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) {
      alert("Por favor, preencha o seu nome e recado para enviar!");
      return;
    }

    const newRecado: Recado = {
      id: Date.now().toString(),
      author: author.trim(),
      message: message.trim(),
      color: selectedColor,
      createdAt: "Agora mesmo"
    };

    const updated = [newRecado, ...recados];
    saveRecadosToLocal(updated);
    setAuthor("");
    setMessage("");
  };

  // Fun visual rotation classes to give that chaotic authentic corkboard look
  const getRotationClass = (id: string) => {
    const num = parseInt(id.slice(-2), 10) || 0;
    const rotations = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "-rotate-3", "rotate-3"];
    return rotations[num % rotations.length];
  };

  return (
    <div id="message-board-container" className="space-y-12">
      {/* Intro Header */}
      <div className="text-center">
        <span className="px-4 py-1.5 bg-gradient-to-r from-pink-500/10 to-yellow-500/10 text-pink-400 rounded-full text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 border border-pink-500/20 mb-3">
          <MessageSquare className="w-3.5 h-3.5" /> Mural dos Verdadeiros Companheiros
        </span>
        <h2 className="text-3xl font-bold font-display text-white md:text-4xl">
          Mural de <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">Recados dos Amigos</span> 📌
        </h2>
        <p className="text-slate-400 mt-2 max-w-xl mx-auto text-sm md:text-base">
          Deixe sua mensagem sincera, uma cobrança de dinheiro amigável ou lembrete de algum sumiço histórico do Natson!
        </p>
      </div>

      {/* Grid Layout: Left form, Right post-its */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Adicionar Recado Card Form */}
        <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden backdrop-blur-sm self-start">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl pointer-events-none" />
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            Deixar seu Recado <PlusCircle className="w-5 h-5 text-pink-400" />
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase text-slate-400 mb-1.5 font-mono">
                Seu Nome / Apelido
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-slate-500" />
                </span>
                <input
                  type="text"
                  maxLength={30}
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Ex: Carol da Facul"
                  className="block w-full pl-9 pr-3 py-3 bg-slate-950/60 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase text-slate-400 mb-1.5 font-mono">
                Sua Mensagem Sincera
              </label>
              <div className="relative">
                <span className="absolute top-3 left-3 flex items-start pointer-events-none">
                  <Smile className="h-4 w-4 text-slate-500" />
                </span>
                <textarea
                  rows={4}
                  maxLength={180}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Pode saudar ou lembrar daquela dívida marota ou da última vez que ele sumiu no WhatsApp..."
                  className="block w-full pl-9 pr-3 py-3 bg-slate-950/60 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-sm font-medium resize-none"
                />
              </div>
              <div className="text-right text-[10px] text-slate-500 mt-1 font-mono">
                {message.length}/180 caracteres
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase text-slate-400 mb-2 font-mono">
                Escolha a Cor do Post-it
              </label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setSelectedColor(opt.value)}
                    title={opt.label}
                    className={`h-7 w-7 rounded-lg transition-transform relative cursor-pointer border ${
                      opt.value.split(" ")[0]
                    } ${
                      selectedColor === opt.value
                        ? "scale-110 ring-2 ring-white/60 border-white/90"
                        : "opacity-75 hover:opacity-100 hover:scale-105"
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold rounded-xl text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              Pregar no Mural 📌
            </button>
          </form>
        </div>

        {/* Post-it Board */}
        <div id="mural-postits" className="lg:col-span-8 bg-slate-950/40 border border-slate-800/80 rounded-3xl p-6 min-h-[380px] relative">
          {/* Corkboard texture cues */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-slate-800 rounded-full" />
          
          <AnimatePresence>
            {recados.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm">
                Nenhum recado ainda. Seja o primeiro a pregar um!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-none p-2">
                {recados.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layoutId={`postit-${item.id}`}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className={`p-5 rounded-md shadow-[0_10px_20px_rgba(0,0,0,0.4)] border border-t-[14px] flex flex-col justify-between max-w-md ${item.color} ${getRotationClass(item.id)} relative`}
                  >
                    {/* Simulated push pin */}
                    <div className="absolute top-[-3px] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-600 hover:bg-red-500 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.3)] flex items-center justify-center border border-red-700">
                      <div className="w-1.5 h-1.5 bg-red-300 rounded-full" />
                    </div>

                    <div className="mt-1">
                      <p className="font-mono text-xs opacity-60 flex justify-between mb-2">
                        <span>@{item.author.toLowerCase()}</span>
                        <span>{item.createdAt}</span>
                      </p>
                      <p className="text-sm md:text-base font-medium font-sans leading-relaxed tracking-tight whitespace-pre-wrap">
                        {item.message}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-black/10 flex justify-between items-center text-xs opacity-80">
                      <span className="font-display font-bold">De: {item.author}</span>
                      <Smile className="w-3.5 h-3.5" />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>

          {recados.length > 5 && (
            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  if (confirm("Deseja realmente limpar as mensagens personalizadas e restaurar as originais?")) {
                    localStorage.removeItem("natson_birthday_recados");
                    setRecados(MOCK_RECADOS);
                  }
                }}
                className="text-xs text-slate-500 hover:text-slate-400 underline font-mono cursor-pointer"
              >
                Resetar Mural para o Padrão
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
