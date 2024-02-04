import { sortArray } from "./string-page-algorithm";
import { TString } from "../../types/common-types";
import { ElementStates } from "../../types/element-states";

// Функция для создания тестового элемента массива с заданным состоянием
function createTestArray(input: string, state: ElementStates): TString[] {
  return Array.from(input).map((value) => ({
    value,
    state,
  })) as TString[];
}

// Функция для получения пары массивов тестовых данных
function getTestArrays(input: string): [TString[], TString[]] {
  const stringArr = createTestArray(input, ElementStates.Default);
  const testStringArr = createTestArray(input.split('').reverse().join(''), ElementStates.Modified);
  return [stringArr, testStringArr];
}

describe("string reversal", () => {
  const setState = jest.fn();
  const setLoader = jest.fn();
  it("even number of characters", async () => {
    // Получение массивов тестовых данных
    const [stringArr, testStringArr] = getTestArrays("abcd");
    // Вызов тестируемой функции
    const sortingArr = await sortArray(stringArr, setState, setLoader);
    // Проверка результата
    expect(sortingArr).toEqual(testStringArr);
  });
  it("odd number of characters", async () => {
    // Получение массивов тестовых данных
    const [stringArr, testStringArr] = getTestArrays("abcde");
    // Вызов тестируемой функции
    const sortingArr = await sortArray(stringArr, setState, setLoader);
    // Проверка результата
    expect(sortingArr).toEqual(testStringArr);
  });
  it("one character", async () => {
    // Получение массивов тестовых данных
    const [stringArr, testStringArr] = getTestArrays("a");
    // Вызов тестируемой функции
    const sortingArr = await sortArray(stringArr, setState, setLoader);
    // Проверка результата
    expect(sortingArr).toEqual(testStringArr);
  });
  it("empty string", async () => {
    // Создание пустого массива тестовых данных
    const stringArr: TString[] = [];
    // Вызов тестируемой функции
    const sortingArr = await sortArray(stringArr, setState, setLoader);
    // Проверка результата
    expect(sortingArr).toEqual(stringArr);
  });
});
