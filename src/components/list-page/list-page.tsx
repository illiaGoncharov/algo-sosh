import React, { useState, SyntheticEvent, FormEvent } from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { TString } from "../../types/common-types";
import { ElementStates } from "../../types/element-states";
import { useCustomForm } from "../../hooks/hooks";
import { delayPromise } from "../../utils/utils";
import { LinkedList } from "./list-algorithm";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import styles from "./list-page.module.css"

export const ListPage: React.FC = () => {
  // Состояние для текущего индекса
  const [currentIndex, setIndex] = useState<{ value: string; }>({ value: "" });

  // Начальный массив для инициализации связанного списка
  const initialArr: TString[] = [
    { value: "0", state: ElementStates.Default },
    { value: "34", state: ElementStates.Default },
    { value: "8", state: ElementStates.Default },
    { value: "1", state: ElementStates.Default },
  ];
  // Состояние для хранения связанного списка
  const [list, setList] = useState(new LinkedList<TString>(initialArr));
  
  // Состояния для отображения текста, текущего элемента и заголовка
  const [text, setText] = useState<string>("");
  const [loader, setLoader] = useState(false);
  const [arr, setArr] = useState<TString[]>(list.toArray());
  const [current, setCurrent] = useState<string>();
  const [head, setHead] = useState<string | React.ReactElement<any, string | React.JSXElementConstructor<any>>>("");
  const [tail, setTail] = useState<string | React.ReactElement<any, string | React.JSXElementConstructor<any>>>("");
  
  // Хук формы для управления вводом данных
  const { values, handleInputChange, setValues } = useCustomForm({ value: "" });
  
  // Получаем числовое значение текущего индекса
  let indexNum = Number(currentIndex.value);
  // Обработчик изменения ввода индекс
  
  const changeInputIndex = (event: SyntheticEvent<HTMLInputElement>) => {
    const { value, name } = event.target as HTMLInputElement;
    setIndex({ ...currentIndex, [name]: value });
  };
  
  // Асинхронная функция для добавления элемента в head списка
  const addHeadOnClick = async () => {
    // Проверка на максимальное количество элементов в списке
    if (list.toArray().length < 6) {
      // Установка флага загрузки
      setLoader(true);
      // Установка текущего действия
      setCurrent("Добавить в head");
      // Задержка для анимации
      await delayPromise(SHORT_DELAY_IN_MS);
      // Добавление элемента в в начало списка - head
      list.prepend({ value: values.value, state: ElementStates.Modified });
      // Задержка для анимации
      await delayPromise(SHORT_DELAY_IN_MS);
      // Установка текста для отображения текущего действия
      setText("Добавить в head");
      // Отображение изменений в head
      setHead(
        <Circle
          letter={values.value}
          state={ElementStates.Changing}
          isSmall={true}
        />
      );
      // Обновление состояния списка
      setList(list);
      // Задержка для анимации  
      await delayPromise(SHORT_DELAY_IN_MS);
      // Обновление массива, содержащего значения списка
      setArr([...list.toArray()]);
      // Установка текста для отображения head
      setHead("head");
      // Задержка для анимации
      await delayPromise(SHORT_DELAY_IN_MS);
      // Возврат состояния элемента в Default
      list.toArray()[0].state = ElementStates.Default;
      // Обновление состояния списка и массива
      setList(list);
      setArr([...list.toArray()]);
      // Сброс текущего действия и флага загрузки  
      setCurrent("");
      setLoader(false);
      // Сброс значения ввода
      setValues({ value: "" });
    }
  };
  
  // Асинхронная функция для удаления элемента из head списка
  const deleteHeadOnClick = async () => {
    setLoader(true);
    setCurrent("Удалить из head");
    setText("Удалить из head");
    // Отображение изменений в tail перед удалением
    setTail(
      <Circle
        letter={list.toArray()[0].value}
        state={ElementStates.Changing}
        isSmall={true}
      />
    );
    list.toArray()[0].value = "";
    await delayPromise(SHORT_DELAY_IN_MS);
    // Удаление элемента из head
    list.deleteHead();
    setList(list);
    await delayPromise(SHORT_DELAY_IN_MS);
    setArr([...list.toArray()]);
    setTail("");
    setText("");
    setCurrent("");
    setLoader(false);
  };
 
  // Асинхронная функция для добавления элемента в tail списка
  const addTailOnClick = async () => {
    // Проверка на максимальное количество элементов в списке
    if (list.toArray().length < 6) {
      setLoader(true);
      setCurrent("Добавить в tail");
      await delayPromise(SHORT_DELAY_IN_MS);
      // Добавление элемента в tail
      list.append({ value: values.value, state: ElementStates.Modified });
      await delayPromise(SHORT_DELAY_IN_MS);
      setText("Добавить в tail");
      // Отображение изменений в head
      setHead(
        <Circle
          letter={values.value}
          state={ElementStates.Changing}
          isSmall={true}
        />
      );
      setList(list);
      await delayPromise(SHORT_DELAY_IN_MS);
      setArr([...list.toArray()]);
      setHead("");
      await delayPromise(SHORT_DELAY_IN_MS);
      // Возврат состояния элемента в Default
      list.toArray()[arr.length].state = ElementStates.Default;
      setList(list);
      setArr([...list.toArray()]);
      setCurrent("");
      setValues({ value: "" });
      setLoader(false);
    }
  };
  
  // Асинхронная функция для удаления элемента из tail списка
  const deleteTailOnClick = async () => {
    setLoader(true);
    setCurrent("Удалить из tail");
    setText("Удалить из tail");
    // Отображение изменений в tail перед удалением
    setTail(
      <Circle
        letter={list.toArray()[arr.length - 1].value}
        state={ElementStates.Changing}
        isSmall={true}
      />
    );
    // Удаление элемента из tail
    list.toArray()[arr.length - 1].value = "";
    await delayPromise(SHORT_DELAY_IN_MS);
    list.deleteTail();
    setList(list);
    setArr([...list.toArray()]);
    setTail("tail");
    setText("");
    setCurrent("");
    setLoader(false);
  };
  
  // Асинхронная функция для добавления элемента по индексу
  const addIndexOnClick = async () => {
    // Проверка на максимальное количество элементов в списке
    if (list.toArray().length < 6) {
      setLoader(true);
      setCurrent("Добавить по индексу");
      setText("Добавить по индексу");
      for (let i = 0; i <= indexNum; i++) {
        setIndex({ value: String(i) });
        await delayPromise(SHORT_DELAY_IN_MS);
        // Отображение изменений в head
        setHead(
          <Circle
            letter={values.value}
            state={ElementStates.Changing}
            isSmall={true}
          />
        );
        if (i < indexNum) {
          await delayPromise(SHORT_DELAY_IN_MS);
          list.toArray()[i].state = ElementStates.Changing;
          setList(list);
          setArr([...list.toArray()]);
          await delayPromise(SHORT_DELAY_IN_MS);
        }
      }
      // Добавление элемента по индексу
      list.addByIndex({ value: values.value, state: ElementStates.Modified }, indexNum);
      setList(list);
      setArr([...list.toArray()]);
      await delayPromise(SHORT_DELAY_IN_MS);
      // Возврат состояния элемента в Default
      const arr = list.toArray().map((value) => ({
        ...value,
        color: ElementStates.Default,
      })) as TString[];
      setList(list);
      setArr([...arr]);
      setHead("");
      setCurrent("");
      setText("");
      setLoader(false);
      setValues({ value: "" });
      setIndex({ value: "" });
    }
  };
 
  // Асинхронная функция для удаления элемента по индексу
  const deleteIndexOnClick = async () => {
    setLoader(true);
    setCurrent("Удалить по индексу");
    setText("Удалить по индексу");
    for (let i = 0; i <= indexNum; i++) {
      setIndex({ value: String(i) });
      await delayPromise(SHORT_DELAY_IN_MS);
      if (i < indexNum) {
        await delayPromise(SHORT_DELAY_IN_MS);
        list.toArray()[i].state = ElementStates.Changing;
        setList(list);
        setArr([...list.toArray()]);
        await delayPromise(SHORT_DELAY_IN_MS);
      }
      if (i === indexNum) {
        // Отображение изменений в tail перед удалением
        setTail(
          <Circle
            letter={list.toArray()[indexNum].value}
            state={ElementStates.Changing}
            isSmall={true}
          />
        );
        setList(list);
        setArr([...list.toArray()]);
        list.toArray()[indexNum].value = "";
        setList(list);
        setArr([...list.toArray()]);
        await delayPromise(SHORT_DELAY_IN_MS);
      }
    }
    // Удаление элемента по индексу
    list.deleteByIndex(indexNum);
    setList(list);
    await delayPromise(SHORT_DELAY_IN_MS);
    setArr([...list.toArray()]);
    // Возврат состояния элемента в Default
    const defaultArray = list.toArray().map((value) => ({
      ...value,
      color: ElementStates.Default,
    })) as TString[];
    setList(list);
    setArr([...defaultArray]);
    setTail("");
    setCurrent("");
    setText("");
    setLoader(false);
  };
  
  // Отображение текста для head
  const renderHead = (
    arr: TString[],
    current: string | undefined,
    index: number,
    text: string,
    head?: string | React.ReactElement | null,
    indexNum?: number
  ) => {
    if (current && text === "Добавить в head" && index === 0) {
      return head;
    } else if (current &&
      text === "Добавить по индексу" &&
      index === indexNum) {
      return head;
    } else if (current &&
      text === "Добавить в tail" &&
      index === arr.length - 1) {
      return head;
    } else if (index === 0) {
      return 'head'
    }
  };
  
  // Функция для отображения текста "tail" при соответствующих условиях
  const renderTail = (
    arr: TString[],
    index: number,
    text: string,
    tail?: string | React.ReactElement | null,
    indexNum?: number
  ) => {
    if (index === arr.length - 1 &&
      text === "Добавить в tail") {
      return 'tail';
    } else if (index === arr.length - 1 && text === "Добавить в head") {
      return "tail";
    } else if (index === 0 && text === "Удалить из head") {
      return tail;
    } else if (index === arr.length - 1 && text === "Добавить по индексу") {
      return 'tail';
    }
    else if (index === arr.length - 1 &&
      text === "Удалить из head") {
      return "tail";
    }
    else if (index === arr.length - 1 &&
      text === "Удалить из tail") {
      return tail;
    } else if (index === indexNum && text === "Удалить по индексу") {
      return tail;
    } else if (index === arr.length - 1) {
      return "tail";
    }
  };
  
  // Обработчик формы
  const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  }

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.input_container} onSubmit={onSubmit}>
        <Input
          type="text"
          name="value"
          placeholder="Введите значение"
          extraClass={styles.input}
          maxLength={4}
          isLimitText={true}
          value={values.value}
          disabled={(loader ? true : false) || (list.toArray().length === 6 ? true : false)}
          onChange={handleInputChange}
        />
        <Button
          type="button"
          text="Добавить в head"
          isLoader={current === "Добавить в head" && loader}
          disabled={values.value === "" ? true : false}
          onClick={() => addHeadOnClick()}
        />
        <Button
          type="button"
          text="Добавить в tail"
          isLoader={current === "Добавить в tail" && loader}
          disabled={values.value === "" ? true : false}
          onClick={() => addTailOnClick()}
        />
        <Button
          type="button"
          text="Удалить из head"
          isLoader={current === "Удалить из head" && loader}
          disabled={arr.length === 0}
          onClick={() => deleteHeadOnClick()}
        />
        <Button
          type="button"
          text="Удалить из tail"
          isLoader={current === "Удалить из tail" && loader}
          disabled={arr.length === 0}
          onClick={() => deleteTailOnClick()}
        />
      </form>
      <form className={styles.input_container} onSubmit={onSubmit}>
        <Input
          type="number"
          name="value"
          placeholder="Введите индекс"
          value={currentIndex.value}
          min={0}
          max={10}
          extraClass={styles.input}
          disabled={(loader ? true : false)}
          onChange={changeInputIndex}
        />
        <Button
          type="button"
          text="Добавить по индексу"
          extraClass={styles.button}
          isLoader={current === "Добавить по индексу" && loader}
          disabled={
            ((values.value === "" || currentIndex.value === "" || (list.toArray().length - 1) < Number(currentIndex.value)) ? true : false)
          }
          onClick={() => addIndexOnClick()}
        />
        <Button
          type="button"
          text="Удалить по индексу"
          extraClass={styles.button}
          disabled={currentIndex.value === "" || (list.toArray().length - 1) < Number(currentIndex.value) ? true : false}
          isLoader={current === "Удалить по индексу" && loader}
          onClick={() => deleteIndexOnClick()}
        />
      </form>

      <ul className={styles.circle_container}>
        {arr &&
          arr?.map((item, index) => {
            return (
              <li key={index} className={styles.item}>
                <Circle
                  state={item.state}
                  index={index}
                  letter={item.value}
                  head={renderHead(
                    arr,
                    current,
                    index,
                    text,
                    head,
                    indexNum
                  )}
                  tail={renderTail(
                    arr,
                    index,
                    text,
                    tail,
                    indexNum
                  )}
                />
                {index < arr.length - 1 ? <ArrowIcon /> : null}
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
