import React, { useState, FormEvent } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { TString } from "../../types/common-types";
import { ElementStates } from "../../types/element-states";
import { delayPromise } from "../../utils/utils";
import { sortArray } from "./string-page-algorithm";
import { DELAY_IN_MS } from "../../constants/delays"
import { useCustomForm, useIsMounted } from "../../hooks/hooks";
import styles from "./string-page.module.css"

// Компонент для визуализации сортировки символов в строке.
export const StringComponent: React.FC = () => {
  // Инициализация состояний компонента
  const [loader, setLoader] = useState(false);
  const [state, setState] = useState<TString[]>([]);

  // Хук для управления формой
  const { values, handleInputChange } = useCustomForm({ value: "" });
  // Хук для отслеживания состояния монтирования компонента
  const isMounted = useIsMounted();

  // Обработчик клика по кнопке "Развернуть".
  const handleVisualizationClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      if (isMounted.current) {
      setLoader(true);
      // Преобразование введенной строки в массив объектов
      const charArray = Array.from(values.value);
      const charArrayObjects = charArray.map((value) => ({
        value,
        state: ElementStates.Default,
      })) as TString[];
      // Установка начального состояния
      setState([...charArrayObjects]);
      await delayPromise(DELAY_IN_MS);
      // Вызов функции сортировки и передача управления состоянием
      sortArray(charArrayObjects, setState, setLoader);
    }
  };

  return (
    <SolutionLayout title="Строка">
      <form onSubmit={handleVisualizationClick}  className={styles.input_container}>
        <Input
          name="value"
          maxLength={11}
          isLimitText={true}
          value={values.value}
          onChange={handleInputChange}
        />
        <Button
          text="Развернуть"
          type="submit"
          disabled={!values.value}
          isLoader={loader}
        />
      </form>
      <ul className={styles.circle_container}>
        {state?.map((item, index) => (
          <li key={index}>
            <Circle
              letter={item.value}
              state={item.state}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
