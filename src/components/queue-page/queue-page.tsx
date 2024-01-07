import React, { useState, SyntheticEvent, FormEvent } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Queue } from "./queue-page-algorithm";
import { ElementStates } from "../../types/element-states";
import { TString } from "../../types/common-types";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delayPromise } from "../../utils/utils";
import { useCustomForm, useIsMounted } from "../../hooks/hooks";
import styles from "./queue-page.module.css"

export const QueuePage: React.FC = () => { 
  // Состояния загрузки для разных операций
  const [addLoader, setAddLoader] = useState(false);
  const [removeLoader, setRemoveLoader] = useState(false);
  const [clearLoader, setClearLoader] = useState(false);

  // Хук для управления формой
  const { values, handleInputChange, setValues } = useCustomForm({ value: "" })
  // Хук для отслеживания состояния монтирования компонента
  const isMounted = useIsMounted();
  
  // Очередь и массив элементов для отображения
  const [queue, setQueue] = useState(new Queue<TString>(7));
  let array = queue.getElements() as TString[];
  const initialArray = Array.from({ length: 7 }).map(() => ({ value: "", state: ElementStates.Default, })) as TString[];
  const [arr, setArr] = useState<TString[]>(initialArray);
  
  // Обработчик для кнопок
  const handleVisualizationClick = async (text: string, e: SyntheticEvent) => {
    e.preventDefault();
    // Проверка, что компонент все еще смонтирован перед обновлением состояния
    if (isMounted.current) {
      // Если текст кнопки - "..."
      if (values.value !== "" && text === "Добавить") {
        // Добавление в очередь с анимацией 
        setAddLoader(true); // Установка состояния загрузки 
        // Добавление в очередь с состоянием изменения
        queue.enqueue({ value: values.value, state: ElementStates.Changing });
        setQueue(queue); // Обновление состояния очереди
        setArr([...array]); // Обновление состояния массива
        await delayPromise(SHORT_DELAY_IN_MS);  // Задержка для анимации
        // Установка состояния хвоста очереди в состояние по умолчанию
        queue.getTail()!.state = ElementStates.Default;
        // Сброс
        setValues({ value: "" });
        setArr([...array]);
        setAddLoader(false)
      } else if (text === "Удалить") {
        // Удаление из очереди с анимацией
        setRemoveLoader(true);
        // Установка состояния верхнего элемента очереди в состояние изменения
        queue.peek()!.state = ElementStates.Changing;
        setQueue(queue); // Обновление состояния очереди
        setArr([...array]); // Обновление состояния массива
        await delayPromise(SHORT_DELAY_IN_MS);
        queue.dequeue(); // Удаление из очереди
        setQueue(queue);
        await delayPromise(SHORT_DELAY_IN_MS);
        setArr([...array]);
        setRemoveLoader(false)
      } else if (text === "Очистить") {
        // Очистка очереди с анимацией  
        setClearLoader(true) // Установка состояния загрузки для анимации очистки
        queue.clear(); // Очистка очереди
        setQueue(queue); // Обновление состояния очереди 
        array = initialArray; // Восстановление исходного массива
        setArr([...array]);
        setClearLoader(false)
      }
    }
  };
  
  // Обработчик отправки формы
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Добавление в очередь с анимацией
    queue.enqueue({ value: values.value, state: ElementStates.Changing });
    setQueue(queue);
    setArr([...array]);
    await delayPromise(SHORT_DELAY_IN_MS);
    queue.getTail()!.state = ElementStates.Default;
    setValues({ value: "" });
    setArr([...array]);
  }

  return (
    <SolutionLayout title="Очередь">
      <form onSubmit={onSubmit} className={styles.input_container}>
        <Input
          type="string"
          name="value"
          isLimitText={true}
          max={4}
          maxLength={4}
          value={values.value}
          onChange={handleInputChange}
        />
        <div className={styles.buttons_container}>
          {/* Кнопки для операций с очередью */}
          <Button
            type="button"
            text="Добавить"
            isLoader={addLoader}
            disabled={
              values.value === "" ||
                (!queue.isEmpty() && arr.slice(-1)[0] === queue.getTail())
                ? true : false}
            onClick={(e) => handleVisualizationClick("Добавить", e)}
          />
          <Button
            type="button"
            text="Удалить"
            isLoader={removeLoader}
            disabled={!queue.isEmpty() ? false : true}
            onClick={(e) => handleVisualizationClick("Удалить", e)}
          />
          <Button
            type="button"
            text="Очистить"
            isLoader={clearLoader}
            extraClass={styles.clear}
            disabled={!queue.isEmpty() ? false : true}
            onClick={(e) => handleVisualizationClick("Очистить", e)}
          />
        </div>
      </form>
      {/* Отображение элементов очереди */}
      <ul className={styles.circle_container}>
        {arr?.map((item, index) => (
          <li key={index}>
            <Circle
              index={index}
              letter={item?.value}
              state={item?.state}
              head={!queue.isEmpty() && queue.peek() === item ? "head" : ""}
              tail={!queue.isEmpty() && queue.getTail() === item ? "tail" : ""}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};