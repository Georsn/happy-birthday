/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Recado, QuizQuestion } from "./types";

export const MOCK_RECADOS: Recado[] = [
  {
    id: "1",
    author: "Marquinhos",
    message: "Natson, parabéns! Aproveita muito seu dia! E ah, se der, me paga aqueles 10 reais do pastel de 2023. Abraços!",
    color: "bg-amber-400 text-slate-900 border-amber-300",
    createdAt: "Hoje, 10:15"
  },
  {
    id: "2",
    author: "Carol (Grupo do Whats)",
    message: "Feliz aniversário para a única pessoa que consegue visualizar o grupo de WhatsApp, responder na mente e sumir no rolê por 3 semanas seguidas!",
    color: "bg-purple-400 text-slate-950 border-purple-300",
    createdAt: "Hoje, 11:32"
  },
  {
    id: "3",
    author: "Felipe (Irmão de alma)",
    message: "Mano, parabéns! O aniversário é seu, mas quem merece os parabéns sou eu por aguentar seus áudios de 6 minutos na velocidade 2.5x kkkkk Tamo junto!",
    color: "bg-blue-400 text-slate-950 border-blue-300",
    createdAt: "Hoje, 13:05"
  },
  {
    id: "4",
    author: "Gabi",
    message: "Feliz dia, lindão! Que seu ano seja incrível e cheio de realizações. Promete que hoje você não vai dormir antes das 21:30 pra conversar com a gente?",
    color: "bg-pink-400 text-slate-950 border-pink-300",
    createdAt: "Hoje, 14:40"
  },
  {
    id: "5",
    author: "Lucas Tech",
    message: "Parabéns, Natson! Que seu sistema nunca sofra com bugs e sua energia seja recarregada em 100%. Que venha muito café e muito código limpo!",
    color: "bg-emerald-400 text-slate-950 border-emerald-300",
    createdAt: "Hoje, 15:10"
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Qual é o maior superpoder do Natson?",
    options: [
      "Dormir 12 horas seguidas e ainda acordar cansado",
      "Sumir do grupo do WhatsApp como um ninja profissional",
      "Beber café quente fervendo como se fosse água gelada",
      "Todas as alternativas anteriores juntinhas"
    ],
    correctAnswerIndex: 3,
    explanation: "Sem sombra de dúvidas! O Natson é um herói com múltiplos dons de sobrevivência e evasão."
  },
  {
    id: 2,
    question: "Qual é a desculpa favorita do Natson para se atrasar?",
    options: [
      "Já tô no farol aqui perto (mal saiu do banho)",
      "O trânsito tava um caos (ele trabalha em regime home office)",
      "Meu roteador reiniciou sozinho e perdi a noção das horas",
      "O cachorro do vizinho me encarou de um jeito estranho"
    ],
    correctAnswerIndex: 0,
    explanation: "O clássico 'tô chegando' que na verdade significa 'estou procurando a minha meia'!"
  },
  {
    id: 3,
    question: "Em caso de um Apocalipse Zumbi repentino, o que o Natson faria primeiro?",
    options: [
      "Lideraria as defesas da humanidade criando armas tecnológicas",
      "Morreria nos primeiros 5 minutos porque acabou a bateria do celular",
      "Dormiria com o barulho dos zumbis do lado de fora, achando que era chuva",
      "Faria amizade com os zumbis só pra não ter de interagir com humanos vivos"
    ],
    correctAnswerIndex: 2,
    explanation: "O sono do Natson desafia as leis do som e das ameaças globais!"
  },
  {
    id: 4,
    question: "Se o Natson ganhasse 100 milhões na Mega-Sena, qual seria a primeira compra?",
    options: [
      "Uma ilha deserta no Caribe (para sumir de vez com estilo)",
      "Uma cafeteria gourmet com barista pessoal 24 horas por dia",
      "Uma cadeira gamer de última geração que massageia e faz massas",
      "Um robô inteligente para responder todos os chats acumulados desde 2018"
    ],
    correctAnswerIndex: 3,
    explanation: "Finalmente o Telegram e o WhatsApp dele ficariam zerados de pendências."
  },
  {
    id: 5,
    question: "Se o Natson fosse um animal, qual melhor o representaria?",
    options: [
      "Um guepardo veloz nas entregas do trabalho",
      "Um urso-preguiça mestre nas sonecas profundas",
      "Um panda fofinho que come o dia todo e some nos bambus",
      "Uma capivara diplomática amiga de todo mundo"
    ],
    correctAnswerIndex: 1,
    explanation: "É o totem espiritual supremo! Soneca e paz no coração."
  }
];

export const PIADAS_IDADE = [
  {
    titulo: "🚨 ALERTA GERAL: SISTEMA SOBRECARREGADO 🚨",
    texto: "Detectamos que o seu ano de nascimento aponta para uma pessoa madura, mas seus registros de mensagens do WhatsApp mostram figurinhas de gatinhos e piadas de quinta série a cada 5 minutos. Conclusão: Você tem o quadril de 92 anos e a maturidade de um broto de mamona de 7 anos!",
    idadeMental: "7 anos",
    idadeFisica: "92 anos",
    conselho: "Substitua a cerveja diária por chá de camomila e pare de tentar dar pirueta no sofá."
  },
  {
    titulo: "🕵️ ANÁLISE FORENSE BIOLÓGICA CONCLUÍDA 🕵️",
    texto: "Após cruzar seus hábitos de sono (dormir às 20h de uma sexta-feira) com seus hábitos alimentares (sobreviver de delivery e café expresso), confirmamos que você é um idoso aposentado preso em um corpo jovem. Você já reclama da umidade do ar e do som do vizinho!",
    idadeMental: "81 anos",
    idadeFisica: "21 anos (apenas no RG)",
    conselho: "Compre logo aquele chinelo ortopédico e comece a colecionar potes de sorvete vazios."
  },
  {
    titulo: "🎓 DIAGNÓSTICO PSICOPEDAGÓGICO DE PONTA 🎓",
    texto: "Natson, os algoritmos quânticos revelam que sempre que você é confrontado com boletos ou responsabilidades de adulto, seu cérebro entra em modo infantil e grita 'QUERO IR PRA CASA'. Você tem alma de criança que quer comer terra, mas corpo que estala o pescoço ao espirrar.",
    idadeMental: "5 anos",
    idadeFisica: "78 anos",
    conselho: "Evite espirrar com força para não travar a coluna e compre um pirulito para comemorar."
  },
  {
    titulo: "☕ DIAGNÓSTICO DO TEOR DE CAFEXPRESSO ☕",
    texto: "Seu consumo de cafeína atingiu níveis interplanetários. Seus órgãos internos estão funcionando na velocidade 3x, enquanto seu entusiasmo matinal é idêntico ao de uma pedra de rio. Você tem a vibração hiperativa de um hamster e o pique físico de um bicho-preguiça cansado.",
    idadeMental: "12 anos (puro açúcar e café)",
    idadeFisica: "88 anos (as articulações gritam no frio)",
    conselho: "Tente respirar ar puro ao invés de vapor de cafeteira pelo menos uma vez ao dia."
  }
];
