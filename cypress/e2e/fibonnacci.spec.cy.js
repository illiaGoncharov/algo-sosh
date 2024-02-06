import { DEFAULT_COLOR, circle } from "./utils";

// Описание тестовых случаев для страницы Fibonacci
describe('fibonacci works as expected', () => {
  beforeEach(() => {
    cy.visit('/fibonacci');
  });
  it('button disabled if input is empty', () => {
    cy.get('input').should('have.value', ''); // Убеждаемся, что поле ввода пусто
    cy.get('button').should('contain.text', 'Рассчитать').should('be.disabled'); // Проверяем, что кнопка отключена
  });
  it('fibonacci generated', () => {
    cy.get('input').type('4');
    cy.get('input').should('have.value', '4');
    cy.get('button').should('contain.text', 'Рассчитать').should('not.be.disabled');
    // Нажатие на кнопку
    cy.contains('Рассчитать').click();
    // Проверяем, что есть 5 элементов с классом 'circle'
    cy.get(circle).should('have.length', 5);
    // Проверяем, что каждый элемент имеет правильный цвет, текст и порядковый номер
    cy.get(circle).each(($el, index) => {
      const fibValue = fibonacci(index + 1); // Вычисляем число Фибоначчи
      cy.wrap($el).should('have.css', 'border', DEFAULT_COLOR).should('have.text', fibValue.toString());
    });
  });

  // Функция для вычисления числа Фибоначчи
  function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
});
