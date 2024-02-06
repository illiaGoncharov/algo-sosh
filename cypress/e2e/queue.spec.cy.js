import { CHANGING_COLOR, DEFAULT_COLOR, circle, headTail } from "./utils";

// Описание тестовых случаев для страницы Queue
describe('queue page works as expected', () => {
  beforeEach(() => {
    cy.visit('/queue');
  });
  it('button disabled if input is empty', () => {
    // Проверка, что кнопки "Добавить", "Удалить" и "Очистить" отключены, когда поле ввода пустое
    cy.get('input').should('have.value', '');
    cy.get(circle).should('have.length', 7);
    cy.get('button').should('contains.text', 'Добавить').should('be.disabled');
    cy.get('button').should('contains.text', 'Удалить').should('be.disabled');
    cy.get('button').should('contains.text', 'Очистить').should('be.disabled');
  });
  it('elements added', () => {
    // Добавление элемента в очередь и проверка, что он отображается корректно
    cy.get('input').type('1');
    cy.get('input').should('have.value', '1');
    // Нажатие на кнопку
    cy.contains('Добавить').click();
    cy.get(circle).eq(0).should('have.css', 'border', CHANGING_COLOR).should('have.text', '1')
    cy.get(circle).eq(0).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '1')
    cy.get(headTail).eq(0).contains('head')
    cy.get(headTail).eq(0).contains('tail')
    cy.get('input').should('have.value', '');
    cy.get('input').type('2');
    cy.get('input').should('have.value', '2');
    // Нажатие на кнопку
    cy.contains('Добавить').click();
    cy.get(circle).eq(1).should('have.css', 'border', CHANGING_COLOR).should('have.text', '2')
    cy.get(circle).eq(1).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '2')
    cy.get(headTail).eq(0).contains('head')
    cy.get(headTail).eq(1).contains('tail')
  });
  it('elements deleted', () => {
    // Добавление элементов в очередь
    cy.get('input').type('1')
    cy.get('input').should('have.value', '1');
    // Нажатие на кнопку
    cy.contains('Добавить').click();
    cy.get(circle).eq(0).should('have.css', 'border', CHANGING_COLOR).should('have.text', '1');
    cy.get(circle).eq(0).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '1');
    cy.get(headTail).eq(0).contains('head');
    cy.get(headTail).eq(0).contains('tail');
    cy.get('input').should('have.value', '');
    cy.get('input').type('2');
    cy.get('input').should('have.value', '2');
    // Нажатие на кнопку
    cy.contains('Добавить').click();
    cy.get(circle).eq(1).should('have.css', 'border', CHANGING_COLOR).should('have.text', '2');
    cy.get(circle).eq(1).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '2');
    cy.get(headTail).eq(0).contains('head');
    cy.get(headTail).eq(1).contains('tail');
    // Нажатие на кнопку
    cy.contains('Удалить').click();
    cy.get(circle).eq(0).should('have.css', 'border', CHANGING_COLOR).should('have.text', '1');
    cy.get(circle).eq(0).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '');
    cy.get(headTail).eq(1).contains('head');
    cy.get(headTail).eq(1).contains('tail');
  });
  it('clear elements', () => {
    cy.get('input').type('1');
    cy.get('input').should('have.value', '1');
    // Нажатие на кнопку
    cy.contains('Добавить').click();
    cy.get(circle).eq(0).should('have.css', 'border', CHANGING_COLOR).should('have.text', '1');
    cy.get(circle).eq(0).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '1');
    cy.get(headTail).eq(0).contains('head');
    cy.get(headTail).eq(0).contains('tail');
    cy.get('input').should('have.value', '');
    cy.get('input').type('2');
    cy.get('input').should('have.value', '2');
    // Нажатие на кнопку
    cy.contains('Добавить').click();
    cy.get(circle).eq(1).should('have.css', 'border', CHANGING_COLOR).should('have.text', '2');
    cy.get(circle).eq(1).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '2');
    cy.get(headTail).eq(0).contains('head');
    cy.get(headTail).eq(1).contains('tail');
    // Нажатие на кнопку
    cy.contains('Очистить').click();
    cy.get(circle).eq(0).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '');
    cy.get(circle).eq(1).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '');
    cy.get(circle).eq(2).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '');
    cy.get('input').should('have.value', '');
  });
});