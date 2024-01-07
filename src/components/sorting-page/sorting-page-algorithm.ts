import { ElementStates } from "../../types/element-states";
import { TArray } from "../../types/common-types";

// Генерация случайного числа в заданном диапазоне
export const randomNum = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Генерация случайного массива объектов TArray
export const randomArr = (): TArray[] => {
  let arr: TArray[] = [];
  const min = 3;
  const max = 17;
  let length = randomNum(min, max);
  for (let i = 0; i < length; i++) {
    arr.push({ number: randomNum(0, 100), state: ElementStates.Default });
  }
  return arr;
};

// Сортировка выбором
export const selectionSort = (size: string, array: number[]) => {
  if (array.length === 0) return [];
  if (array.length === 1) return array;
  // Внешний цикл прохода по всем элементам массива, кроме последнего
  for (let i = 0; i < array.length - 1; i++) {
    // Индекс текущего минимального/максимального элемента
    let index = i;
    for (let j = i + 1; j < array.length; j++) {
      // Сравнение элементов в зависимости от направления сортировки
      const shouldSwap =
        size === "descend" ? array[index] < array[j] : array[index] > array[j];
      if (shouldSwap) {
        index = j;
      }
    }
    // Обмен текущего элемента с найденным минимальным/максимальным элементом
    let tempArr = array[index];
    array[index] = array[i];
    array[i] = tempArr;
  }
  return array;
};


// Сортировка пузырьком
export const bubbleSort = (size: string, array: number[]) => {
  // Проверка на пустой массив
  if (array.length === 0) return [];
  // Проверка на массив из одного элемента (уже отсортирован)
  if (array.length === 1) return array;
  // Внешний цикл прохода по всем элементам массива
  for (let i = 0; i < array.length; i++) {
    // Внутренний цикл для сравнения и перемещения элементов
    for (let j = 0; j < array.length - i - 1; j++) {
      // Сравнение элементов в зависимости от направления сортировки
      const shouldSwap =
        size === "descend" ? array[j] < array[j + 1] : array[j] > array[j + 1];
      if (shouldSwap) {
        // Обмен элементов, если необходимо
        let tempArr = array[j];
        array[j] = array[j + 1];
        array[j + 1] = tempArr;
      }
    }
  }
  // Возврат отсортированного массива
  return array;
};