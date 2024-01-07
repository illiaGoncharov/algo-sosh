import React, { useState, ChangeEvent } from "react";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { randomArr } from "./sorting-page-algorithm";
import { TArray } from "../../types/common-types";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { delayPromise, swap } from "../../utils/utils";
import { useIsMounted } from "../../hooks/hooks";
import styles from "./sorting-page.module.css"

export const SortingPage: React.FC = () => {
  // Состояния компонента
  const [radioBtn, setRadioBtn] = useState("choice");
  const [loader, setLoader] = useState(false);
  const [arr, setArr] = useState<TArray[]>(randomArr());
  const [sorting, setSorting] = useState<Direction>();

  // Хук для отслеживания состояния монтирования компонента
  const isMounted = useIsMounted();
  
  // Функция сортировки выбором
  const sortChoice = async (arr: TArray[], sorting: Direction) => {
    if (isMounted.current) {
      // Проход по всем элементам массива
      for (let i = 0; i < arr.length; i++) {
        let index = i;
        // Проход по оставшимся элементам для выбора минимального/максимального
        for (let n = i + 1; n < arr.length; n++) {
          // Установка состояний элементов в "Changing" для анимации
          arr[i].state = ElementStates.Changing;
          arr[n].state = ElementStates.Changing;
          setArr([...arr]);
          await delayPromise(DELAY_IN_MS);
          // Сравнение элементов в зависимости от направления сортировки
          if (sorting === Direction.Ascending) {
            if (arr[n].number < arr[index].number) {
              // Обновление индекса минимального элемента
              index = n;
              // Анимация замены элементов в массиве
              swap(arr, n, index);
              setArr([...arr]);
            }
          }
          if (sorting === Direction.Descending) {
            if (arr[n].number > arr[index].number) {
              index = n;
              swap(arr, n, index);
              setArr([...arr]);
            }
          }
          // Возврат состояний элементов к значению "Default" после сравнения
          arr[n].state = ElementStates.Default;
          arr[i].state = ElementStates.Default;
          setArr([...arr]);
        }
        // Установка состояния "Modified" для отметки выбранного элемента
        arr[index].state = ElementStates.Modified;
        swap(arr, i, index);
        setArr([...arr]);
      }
      // Завершение анимации и снятие состояния "Loading"
      setLoader(false);
    }
  };
  
  // Функция сортировки пузырьком
  const sortBubble = async (arr: TArray[], sorting: Direction) => {
    if (isMounted.current) {
      // Проход по всем элементам массива
      for (let i = 0; i < arr.length; i++) {
        // Проход по неотсортированным элементам, сравнение и анимация
        for (let n = 0; n < arr.length - i - 1; n++) {
          arr[n].state = ElementStates.Changing;
          arr[n + 1].state = ElementStates.Changing;
          setArr([...arr]);
          await delayPromise(DELAY_IN_MS);
          // Сравнение элементов в зависимости от направления сортировки
          if (sorting === Direction.Ascending) {
            if (arr[n].number > arr[n + 1].number) {
              // Анимация замены элементов в массиве
              swap(arr, n, n + 1);
            }
          }
          if (sorting === Direction.Descending) {
            if (arr[n].number < arr[n + 1].number) {
              swap(arr, n, n + 1);
            }
          }
          // Возврат состояний элементов к значению "Default" после сравнения
          arr[n].state = ElementStates.Default;
          arr[n + 1].state = ElementStates.Default;
          setArr([...arr]);
        }
        // Установка состояния "Modified" для отметки последнего элемента в отсортированной части
        const length = arr.length;
        arr[length - i - 1].state = ElementStates.Modified;
        setArr([...arr]);
      }
      // Сброс анимации и состояния "Loading" 
      setArr([...arr]);
      setLoader(false);
    }
  };

  // Обработчик изменения выбранного метода сортировки
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioBtn(e.target.value);
  };
  
  // Обработчик клика по кнопке "Новый массив"
  const onClick = () => {
    setArr(randomArr());
  };
  
  // Обработчик клика по кнопкам сортировки
  const sortOnClick = (sorting: Direction) => {
    setSorting(sorting);
    setLoader(true);
    // Выбор функции сортировки в зависимости от выбранного метода
    if (radioBtn === "choice") {
      sortChoice(arr, sorting);
    } else {
      sortBubble(arr, sorting);
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.input_container}>
        <fieldset className={styles.radio}>
          {/* Компонент для выбора метода сортировки */}
          <RadioInput
            label="Выбор"
            name="radioButton"
            value="choice"
            checked={radioBtn === "choice"}
            onChange={onChange}
          />
          <RadioInput
            label="Пузырёк"
            name="radioButton"
            value="bubble"
            checked={radioBtn === "bubble"}
            onChange={onChange}
          />
        </fieldset>
        <fieldset className={`${styles.sort_buttons}`}>
          {/* Кнопки для запуска  */}
          <Button
            sorting={Direction.Ascending}
            type="button"
            text="По возрастанию"
            disabled={loader}
            isLoader={loader && sorting === Direction.Ascending}
            onClick={() => {
              sortOnClick(Direction.Ascending);
            }}
          />
          <Button
            sorting={Direction.Descending}
            type="button"
            text="По убыванию"
            disabled={loader}
            isLoader={loader && sorting === Direction.Descending}
            onClick={() => {
              sortOnClick(Direction.Descending);
            }}
          />
        </fieldset>
        <Button text="Новый массив" onClick={onClick} disabled={loader} />
      </form>
      {/* Визуализация столбцов, представляющих элементы массива */}
      <ul className={styles.cols}>
        {arr &&
          arr?.map((item, index) => {
            return (
              <li key={index}>
                <Column index={item.number} state={item.state} />
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
