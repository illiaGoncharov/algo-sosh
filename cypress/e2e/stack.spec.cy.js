import { CHANGING_COLOR, DEFAULT_COLOR, circle } from "./utils";

// Описание тестовых случаев для страницы Stack
describe('stack page works as expected', () => {
  beforeEach(() => {
    cy.visit('/stack');
  });
  it('button is disabled when input is empty', () => {
    // Проверка, что кнопки "Добавить", "Удалить" и "Очистить" отключены, когда поле ввода пустое
    cy.get('input').should('have.value', '');
    cy.get('button').should('contains.text', 'Добавить').should('be.disabled');
    cy.get('button').should('contains.text', 'Удалить').should('be.disabled');
    cy.get('button').should('contains.text', 'Очистить').should('be.disabled');
  });
  it('elements added', () => {
    // Добавление элемента в стек и проверка, что он отображается корректно
    cy.get('input').type('3');
    cy.get('input').should('have.value', '3');
    // Нажатие на кнопку
    cy.contains('Добавить').click();
    cy.get(circle).should('have.length', 1);
    cy.get(circle).eq(0).should('have.css', 'border', CHANGING_COLOR).should('have.text', '3');
    cy.get(circle).eq(0).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '3');
    cy.get('input').should('have.value', '');
  });
  it('elements deleted', () => {
    // Добавление элементов в стек
    cy.get('input').type('1');
    cy.get('input').should('have.value', '1');
    // Нажатие на кнопку
    cy.contains('Добавить').click();
    cy.get(circle).should('have.length', 1);
    cy.get(circle).eq(0).should('have.css', 'border', CHANGING_COLOR).should('have.text', '1');
    cy.get(circle).eq(0).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '1');
    cy.get('input').type('2');
    cy.get('input').should('have.value', '2');
    // Нажатие на кнопку
    cy.contains('Добавить').click();
    cy.get(circle).should('have.length', 2);
    cy.get(circle).eq(0).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '1');
    cy.get(circle).eq(1).should('have.css', 'border', CHANGING_COLOR).should('have.text', '2');
    cy.get(circle).eq(1).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '2');
    // Нажатие на кнопку
    cy.contains('Удалить').click();
    // Проверка, что он удален корректно
    cy.get(circle).eq(1).should('have.css', 'border', CHANGING_COLOR).should('have.text', '2');
    cy.get(circle).eq(0).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '1');
    cy.get(circle).should('have.length', 1);
    // Нажатие на кнопку
    cy.get('input').should('have.value', '');
  });
  it('clear elements', () => {
    cy.get('input').type('5');
    cy.get('input').should('have.value', '5');
    // Нажатие на кнопку
    cy.contains('Добавить').click();
    cy.get(circle).should('have.length', 1)
    cy.get(circle).eq(0).should('have.css', 'border', CHANGING_COLOR).should('have.text', '5');
    cy.get(circle).eq(0).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '5');
    cy.get('input').type('6');
    cy.get('input').should('have.value', '6');
    // Нажатие на кнопку
    cy.contains('Добавить').click();
    cy.get(circle).should('have.length', 2)
    cy.get(circle).eq(0).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '5');
    cy.get(circle).eq(1).should('have.css', 'border', CHANGING_COLOR).should('have.text', '6');
    cy.get(circle).eq(1).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '6');
    // Нажатие на кнопку
    cy.contains('Очистить').click();
    // Проверка, что стек пуст
    cy.get(circle).should('not.exist')
    cy.get('input').should('have.value', '');
  });
});