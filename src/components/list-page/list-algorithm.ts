// Класс, представляющий узел связанного списка
export class Node<T> {
  value: T;
  next: Node<T> | null;
  // Конструктор, инициализирующий значение узла и указатель на следующий узел
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = this.next = next === undefined ? null : next;
  }
}

// Интерфейс для связанного списка
interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => this;
  // Получение размера списка
  getSize: () => number;
  // Добавление элемента по индексу
  addByIndex: (element: T, index: number) => void;
  // Удаление элемента по индексубю
  deleteByIndex: (index: number) => void;
  // Удаление первого элемента списка
  deleteHead: () => Node<T> | null;
  // Удаление последнего элемента списка
  deleteTail: () => Node<T> | null;
  // Преобразование списка в массив
  toArray: () => T[];
}

// Класс, представляющий связанный список
export class LinkedList<T> implements ILinkedList<T> {
  // Приватные члены класса LinkedList для управления структурой списка
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  private length: number;
  // Конструктор, инициализирующий список значениями из массива
  constructor(arr: T[]) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.length = 0;
    arr.forEach((item) => this.append(item));
  }
  // Добавление элемента в конец списка
  append(el: T) {
    // Создаем новый узел с переданным значением
    const node = new Node(el);
    // Если список пустой, устанавливаем новый узел как начальный и конечный
    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
      return this; // Возвращаем ссылку на текущий объект для поддержки цепочки вызовов
    }
    // Если список не пуст, добавляем новый узел после текущего хвоста
    this.tail.next = node;
    // Обновляем хвост списка на новый узел
    this.tail = node;
    // Увеличиваем счетчик длины списка и общего размера
    this.length++;
    this.size++;
    return this; // Возвращаем ссылку на текущий объект для поддержки цепочки вызовов
  }
  // Добавление элемента в начало списка
  prepend(el: T) {
    // Создаем новый узел с переданным значением и устанавливаем следующим элементом текущий начальный узел
    const node = new Node(el, this.head);
    // Обновляем начальный узел списка на новый узел
    this.head = node;
    // Если список пустой, устанавливаем новый узел также как конечный
    if (!this.tail) {
      this.tail = node;
    }
    // Увеличиваем счетчик
    this.length++;
    this.size++;
    return this; // Возвращаем ссылку на текущий объект
  }
  // Удаление первого элемента списка
  deleteHead() {
    if (!this.head) {
      return null;
    }
    // Запоминаем ссылку на удаляемый начальный узел
    const deletedHead = this.head;
    // Если есть следующий элемент после начального, обновляем начальный узел
    if (this.head.next) {
      this.head = this.head.next;
    } else {
      // Если начальный узел был единственным в списке, обнуляем начальный и конечный узлы
      this.head = null;
      this.tail = null;
    }
    // Уменьшаем счетчик
    this.size--;
    this.length--;
    return deletedHead; // Возвращаем удаленный узел
  }
  // Удаление последнего элемента списка
  deleteTail() {
    if (!this.tail) {
      return null;
    }
    const deletedTail = this.tail;
    // Если начальный и конечный узлы совпадают, значит в списке только один элемент
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return deletedTail;
    }
    // Ищем предпоследний узел, чтобы обновить конечный узел
    let currentNode = this.head;
    while (currentNode?.next) {
      if (!currentNode.next.next) {
        // Обрываем связь с последним узлом, делая предпоследний узел новым конечным
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }
    // Обновляем конечный узел
    this.tail = currentNode;
    this.size--;
    this.length--;
    return deletedTail;
  }
  // Добавление элемента по индексу
  addByIndex(element: T, index: number) {
    if (index < 0 || index > this.size) {
      return;
    } else {
      const node = new Node(element);
      let el;
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let current = this.head;
        let currentIndex = 0;
        while (currentIndex++ < index) {
          el = current;
          if (current) {
            current = current.next;
          }
        }
        if (el) {
          node.next = current;
          el.next = node;
        }
      }
      this.size++;
      this.length++;
    }
  }
  // Удаление элемента по индексу
  deleteByIndex(index: number) {
    // Проверяем, что индекс находится в допустимом диапазоне
    if (index < 0 || index > this.size) {
      return;
    }
    let start = this.head;
    // Если индекс 0, добавляем новый узел в начало списка
    if (index === 0) {
      this.head = this.head ? this.head.next : this.head;
    } else {
      let current = null;
      let currIndex = 0;
      // Ищем узел с указанным индексом
      while (currIndex++ < index) {
        // Запоминаем текущий узел и переходим к следующему, если есть
        current = start;
        if (start) {
          start = start.next;
        }
      }
      // Обрываем связь между предыдущим и удаляемым узлом
      if (current?.next) {
        current.next = start?.next ? start.next : null;
      }
    }
    this.size--;
    this.length--;
  }
  // Преобразование списка в массив
  toArray() {
    // Инициализация указателя на начало списка
    let current = this.head;
    // Создание массива для хранения значений узлов списка
    const array: T[] = [];
    // Проход по списку
    while (current) {
      // Добавление значения текущего узла
      array.push(current?.value);
      // Переход к следующему узлу
      current = current.next;
    }
    return array;
  }
  // Получение размера списка
  getSize() {
    return this.size;
  }
}
