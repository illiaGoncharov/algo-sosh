import { useState, ChangeEvent } from "react";

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