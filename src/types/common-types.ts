import { ElementStates } from "./element-states";

// Тип для стека
export type TStack<T> = {
  push: (item: T) => void;
  pop: () => void;
  // Возвращает верхний элемент стека без удаления
  peek: () => T | null;
  // Возвращает текущую длину стека
  getLength: () => number;
  // Возвращает массив, представляющий текущее содержимое стека
  getContainer: () => T[];
}

// Тип для элемента массива чисел
export type TArray = {
  number: number;
  // Состояние элемента из перечисления ElementStates
  state: ElementStates;
};

// Тип для элемента массива строк
export type TString = {
  value: string;
  // Состояние элемента из перечисления ElementStates
  state: ElementStates;
}