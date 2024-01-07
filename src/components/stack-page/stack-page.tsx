import React, { useState, SyntheticEvent, FormEvent } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { delayPromise } from "../../utils/utils";
import { Stack } from "./stack-algorithm";
import { TString } from "../../types/common-types";
import { ElementStates } from "../../types/element-states";
import { useCustomForm, useIsMounted } from "../../hooks/hooks";
import styles from "./stack-page.module.css"

export const StackPage: React.FC = () => {
  // Состояния компонента
  const [addLoader, setAddLoader] = useState(false);
  const [removeLoader, setRemoveLoader] = useState(false);
  const [clearLoader, setClearLoader] = useState(false);
  const [stack, setStack] = useState(new Stack<TString>());
  const [state, setState] = useState<TString[]>([]);

  // Хук для отслеживания состояния монтирования компонента
  const isMounted = useIsMounted();
  // Хук для управления формой
  const { values, handleInputChange, setValues } = useCustomForm({ value: "" });

  // Обработчик для кнопок "Добавить", "Удалить" и "Очистить"
  const handleVisualizationClick = async (text: string, e: SyntheticEvent) => {
    e.preventDefault();
    if (isMounted.current) {
      // Получение текущего состояния стека
      const array = stack.getContainer();
      // Проверка наличия значения в поле ввода и выбор действия в зависимости от текста кнопки
      if (values.value !== "" && text === "Добавить") {
        // Добавление элемента в стек с анимацией
        setAddLoader(true);
        stack.push({ value: values.value, state: ElementStates.Changing });
        setStack(stack);
        setState([...array]);
        setValues({ value: "" });
        await delayPromise(500); // Задержка для анимации
        // Сброс состояния добавленного элемента
        stack.peek()!.state = ElementStates.Default;
        setStack(stack);
        setState([...array]);
        setAddLoader(false)
      } else if (text === "Очистить") {
        // Очистка стека с анимацией
        setClearLoader(true)
        const length = stack.getLength();
        let i = 0;
        for (i; i < length; i++) {
          stack.pop();
          setStack(stack);
        }
        setState([...array]);
        setClearLoader(false)
      } else if (text === "Удалить") {
        // Удаление элемента из стека с анимацией
        setRemoveLoader(true);
        stack.peek()!.state = ElementStates.Changing;
        setStack(stack);
        setState([...array]);
        await delayPromise(500);
        // Удаление элемента из стека и обновление состояний
        stack.pop();
        await delayPromise(500);
        setStack(stack);
        setState([...array]);
        setRemoveLoader(false)
      }
    }
  };

  // Обработчик отправки формы
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Получение текущего состояния стека
    const array = stack.getContainer();
    // Добавление элемента в стек с анимацией
    stack.push({ value: values.value, state: ElementStates.Changing });
    setStack(stack);
    setState([...array]);
    setValues({ value: "" });
    await delayPromise(500); // Задержка для анимации
    // Сброс состояния добавленного элемента
    stack.peek()!.state = ElementStates.Default;
    setStack(stack);
    setState([...array]);
  }

  return (
    <SolutionLayout title="Стек">
      <form className={styles.input_container} onSubmit={onSubmit} >
        {/* Поле ввода элемента */}
        <Input
          type="string"
          name="value"
          value={values.value}
          maxLength={4}
          max={4}
          isLimitText={true}
          extraClass={styles.input}
          placeholder="Введите значение"
          onChange={handleInputChange}
        />
        <div className={styles.buttons_container}>
          <Button
            text="Добавить"
            type="button"
            isLoader={addLoader}
            linkedList="small"
            disabled={values.value === "" ? true : false}
            onClick={(e) => handleVisualizationClick("Добавить", e)}
          />
          <Button
            text="Удалить"
            type="button"
            isLoader={removeLoader}
            disabled={stack.getLength() > 0 ? false : true}
            onClick={(e) => handleVisualizationClick("Удалить", e)}
          />
          <Button
            text="Очистить"
            type="button"
            isLoader={clearLoader}
            extraClass={styles.clear}
            disabled={stack.getLength() > 0 ? false : true}
            onClick={(e) => handleVisualizationClick("Очистить", e)}
          />
        </div>
      </form>
      <ul className={styles.circle_container}>
        {state?.map((item, index) => (
          <li key={index}>
            <Circle
              index={index}
              letter={item.value}
              state={item.state}
              head={stack.peek() === item ? "top" : ""}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
