// Тип очереди с основными операциями
type TQueue<T> = {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peek: () => T | null;
  getTail: () => T | null;
  getElements: () => (T | null)[];
  isEmpty: () => boolean;
  clear: () => void;
};

export class Queue<T> implements TQueue<T> {
  // Приватные члены класса Queue для управления структурой списка
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private length: number = 0;
  private size: number = 0;

  // Конструктор с указанием максимального размера очереди
  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }
  
  // Добавление элемента в конец очереди
  enqueue = (i: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length error");
    }
    this.container[this.tail % this.size] = i;
    this.tail++;
    this.length++;
  };

  // Удаление элемента из начала очереди
  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("The queue is empty");
    }
    const item = this.container[this.head];
    delete this.container[this.head % this.size];
    this.length--;
    this.head++;
    return item;
  };

  // Получение элемента из начала очереди без удаления
  peek = () => {
    if (this.isEmpty()) {
      throw new Error("The queue is empty");
    }
    return this.container[this.head];
  };

  // Получение последнего элемента очереди без удаления
  getTail = () => {
    if (this.isEmpty()) {
      throw new Error("The queue is empty");
    }
    return this.container[this.tail - 1];
  };

  // Получение всех элементов очереди
  getElements = () => {
    return this.container;
  };

  // Проверка, является ли очередь пустой
  isEmpty = () => this.length === 0;
  
  // Очистка очереди
  clear = () => {
    this.head = 0;
    this.tail = 0;
    this.container = Array(this.size);
    this.length = 0;
  };
}
