/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Recado {
  id: string;
  author: string;
  message: string;
  color: string; // e.g. blue, purple, pink, gold, green
  createdAt: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}
