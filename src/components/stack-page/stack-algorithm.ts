import { TStack } from "../../types/common-types";

// Реализация стека с основными операциями.
export class Stack<T> implements TStack<T> {
  private container: T[] = [];

  // Добавляет элемент в вершину стека.
  push = (item: T): void => {
    this.container.push(item);
  };

  // Удаляет элемент из вершины стека.
  pop = (): void => {
    this.container.pop();
  };

  // Возвращает элемент из вершины стека без его удаления.
  peek = (): T | null => {
    return this.container.length
      ? this.container[this.container.length - 1]
      : null;
  };

  // Возвращает текущую длину стека.
  getLength(): number {
    return this.container.length;
  }

  // Возвращает массив элементов стека.
  getContainer(): T[] {
    return this.container;
  }
}
