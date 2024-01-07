import { useState, ChangeEvent, useEffect, useRef } from "react";

// Хук для управления формой
export function useCustomForm<T extends { [key: string]: string }>(initialValues: T) {
    // Состояние значений формы
    const [values, setValues] = useState<T>(initialValues);
    // Обработчик изменения значений ввода
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        // Извлекаем значение и имя поля из события
        const { value, name } = event.target
        // Обновляем состояние значений формы
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
    };
    // Возвращаем значения, обработчик изменения и функцию установки значений
    return { values, handleInputChange, setValues };
}

// Хук useIsMounted предназначен для отслеживания состояния монтирования компонента
export function useIsMounted(): React.MutableRefObject<boolean> {
    // useRef создает изменяемый объект, сохраняющий свое состояние между рендерами компонента
    const isMounted = useRef(true);
    // useEffect используется для выполнения действий при монтировании и демонтаже компонента
    useEffect(() => {
        return () => {
            // console.log(isMounted.current);
            isMounted.current = false;
        };
    }, []); // Эффект выполняется только при монтировании и демонтаже
    return isMounted;
};