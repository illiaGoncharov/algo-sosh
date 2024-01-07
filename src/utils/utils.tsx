import { TString, TArray } from "../types/common-types";

// Меняет местами два элемента в массиве
export const swap = (
    arr: TString[] | TArray[],
    start: number,
    end: number
  ): void => {
    // Сохраняем значение элемента по начальному индексу
    const tempValue = arr[start];

    // Заменяем значение элемента по начальному индексу значением элемента по конечному индексу
    arr[start] = arr[end];

    // Заменяем значение элемента по конечному индексу сохраненным значением
    arr[end] = tempValue;
  };

  // Возвращает обещание, которое разрешается после указанной задержки
  export const delayPromise = (delayTime: number) => {
    return new Promise((resolve) => setTimeout(resolve, delayTime));
  };