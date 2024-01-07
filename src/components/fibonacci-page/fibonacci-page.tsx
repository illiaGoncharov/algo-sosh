import React, { FormEvent, useState } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { useCustomForm, useIsMounted } from "../../hooks/hooks";
import { getNumbers, sortFibonacci } from "./fibonacci-algorithm";
import styles from "./fibonaci-pade.module.css"

export const FibonacciPage: React.FC = () => {
  // Состояние загрузчика и чисел Фибоначчи
  const [state, setState] = useState<string[]>([]);
  const [loader, setLoader] = useState(false);

  // Хук для отслеживания состояния монтирования компонента
  const isMounted = useIsMounted();
  // Хук для управления формой
  const { values, handleInputChange } = useCustomForm({ value: "" });
  
  // Получаем число из введенного значения
  const indexNum = Number(values.value);
  // Обработчик события при отправке формы
  const handleVisualizationClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Проверка, что компонент все еще смонтирован перед обновлением состояния
    if (isMounted.current) {
      setLoader(true);
      try {
        // Генерируем числа Фибоначчи и сортируем их с задержкой
        const arrayNumbers = getNumbers(indexNum).map(String);
        // Вызов функции sortFibonacci
        sortFibonacci(arrayNumbers, setState, setLoader);
      } catch (error) {
        console.error("Error while processing: ", error);
      }
    }
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form onSubmit={handleVisualizationClick} className={styles.input_container}>
        <Input
          name="value"
          type="number"
          min={1}
          max={19}
          isLimitText={true}
          value={values.value}
          onChange={handleInputChange}
        />
        <Button
          text="Рассчитать"
          type="submit"
          isLoader={loader}
          disabled={
            !values.value || Number(values.value) >= 20 || Number(values.value) === 0
          }
        />
      </form>
      <ul className={styles.circle_container}>
        {state?.map((item, index) => (
          <li key={index}>
            <Circle
              letter={item}
              index={index}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
