import { ElementStates } from "../../types/element-states";
import { TString } from "../../types/common-types";
import { delayPromise, swap } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";

// Функция для сортировки массива "по середине"
export const sortArray = async (
  arr: TString[],
  setState: React.Dispatch<React.SetStateAction<TString[]>>,
  setLoader: (value: React.SetStateAction<boolean>) => void
) => {
  const { length } = arr;
  
  // Проверка на пустой массив
  if (arr.length === 0) {
    return arr;
  }

  let start = 0;
  let end;
  let mid = Math.floor(length / 2);
  
  // Проход по первой половине массива
  for (start; start < mid; start++) {
    end = length - 1 - start;
    // Если индекс начала меньше индекса конца
    if (start < end) {
      // Установка состояний элементов в "Changing" для анимации
      arr[start].state = ElementStates.Changing;
      arr[end].state = ElementStates.Changing;
      setState([...arr]);
    }
    swap(arr, start, end);
    arr[start].state = ElementStates.Modified;
    arr[end].state = ElementStates.Modified;
    await delayPromise(DELAY_IN_MS); // Задержка для анимации
  }

  // Установка состояния "Modified" для последнего элемента
  arr[start].state = ElementStates.Modified;
  setState([...arr]);
  
  // Завершение анимации и снятие состояния "Loading"
  setLoader(false);
  return arr; // Возврат отсортированного массива
};
