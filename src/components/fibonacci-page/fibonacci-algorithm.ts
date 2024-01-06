import { delayPromise } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

// Генерирует числа Фибоначчи до указанного номера
export const getNumbers = (num: number) => {
  let arr: number[] = [1, 1];
  for (let i = 2; i < num + 1; i++) {
    arr.push(arr[i - 2] + arr[i - 1]);
  }
  return arr;
};

// Асинхронно сортирует массив чисел Фибоначчи с задержкой и обновляет состояние
export const sortFibonacci = async (
  arr: string[],
  setState: React.Dispatch<React.SetStateAction<string[]>>,
  setLoader: (value: React.SetStateAction<boolean>) => void
) => {
  const { length } = arr;
  let numArray = [];
  // Постепенно добавляет числа Фибоначчи к массиву с задержкой
  for (let i = 0; i < length; i++) {
    numArray.push(arr[i]);
    await delayPromise(SHORT_DELAY_IN_MS);
    setState(numArray.map(String));
  }
  // Завершает сортировку и отключает индикатор загрузки
  setLoader(false);
  // Возвращает отсортированный массив
  return numArray;
};
