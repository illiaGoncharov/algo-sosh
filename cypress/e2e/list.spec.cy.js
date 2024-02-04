import { CHANGING_COLOR, DEFAULT_COLOR, MODIFIED_COLOR, inputNumber, inputText, circle, headTail } from "./utils";

// Описание тестовых случаев для страницы List
describe('list page works as expected', () => {
  beforeEach(() => {
    cy.visit('/list');
  });
  it('button is disabled if input is empty', () => {
    // Проверки состояния элементов на странице при пустом вводе
    cy.get(inputText).should('have.value', '');
    cy.get(inputNumber).should('have.value', '');
    cy.get(headTail).should('have.length', 4);
    cy.get(headTail).eq(0).contains('head');
    cy.get(headTail).eq(3).contains('tail');
    // Проверки состояния кнопок
    cy.get('button').should('contains.text', 'Добавить в head').and('be.disabled');
    cy.get('button').should('contains.text', 'Добавить в tail').and('be.disabled');
    cy.get('button').should('contains.text', 'Добавить по индексу').and('be.disabled');
    cy.get('button').should('contains.text', 'Удалить по индексу').and('be.disabled');
  });
  it('default list rendered', () => {
    // Проверки состояния элементов при стандартном отображении списка
    cy.get(headTail).should('have.length', 4);
    cy.get(headTail).eq(0).contains('head');
    cy.get(headTail).eq(3).contains('tail');
    // Проверки для каждого элемента в списке
    cy.get(circle).each((element) => {
      cy.wrap(element).should('have.css', 'border', DEFAULT_COLOR).and('not.be.empty');
    });
    // Проверки состояния кнопок
    cy.get('button').should('contains.text', 'Добавить в head').and('be.disabled');
    cy.get('button').should('contains.text', 'Добавить в tail').and('be.disabled');
    cy.get('button').should('contains.text', 'Добавить по индексу').and('be.disabled');
    cy.get('button').should('contains.text', 'Удалить по индексу').and('be.disabled');
  });
  it('element added', () => {
    // Ввод значения в текстовое поле
    cy.get(inputText).type('5');
    cy.get(inputText).should('have.value', '5');
    // Нажатие на кнопку
    cy.contains('Добавить в head').click();
    // Проверки для элементов списка, цвета и кнопок
    cy.get(headTail).should('have.length', 5)
    cy.get(circle).eq(0).should('have.css', 'border', MODIFIED_COLOR).and('have.text', '5');
    cy.get(circle).eq(0).should('have.css', 'border', DEFAULT_COLOR).and('have.text', '5');
    cy.get(headTail).eq(0).contains('head');
    cy.get(headTail).eq(4).contains('tail');
    // Проверки для кнопок
    cy.get('button').should('contains.text', 'Удалить из head').and('be.disabled');
    cy.get('button').should('contains.text', 'Удалить из tail').and('be.disabled');
    cy.get('button').should('contains.text', 'Добавить по индексу').and('be.disabled');
    cy.get('button').should('contains.text', 'Удалить по индексу').and('be.disabled');
  });
  it('element added to tail', () => {
    cy.get(inputText).type('4');
    cy.get(inputText).should('have.value', '4');
    // Нажатие на кнопку
    cy.contains('Добавить в tail').click();
    // Проверки для элементов списка, цвета и кнопок
    cy.get(headTail).should('have.length', 5)
    cy.get(circle).eq(4).should('have.css', 'border', MODIFIED_COLOR).and('have.text', '4');
    cy.get(circle).eq(4).should('have.css', 'border', DEFAULT_COLOR).and('have.text', '4');
    cy.get(headTail).eq(0).contains('head');
    cy.get(headTail).eq(4).contains('tail');
    // Проверки для кнопок
    cy.get('button').should('contains.text', 'Удалить из head').and('be.disabled');
    cy.get('button').should('contains.text', 'Удалить из tail').and('be.disabled');
    cy.get('button').should('contains.text', 'Добавить по индексу').and('be.disabled');
    cy.get('button').should('contains.text', 'Удалить по индексу').and('be.disabled');
  });
  it('element deleted from head', () => {
    cy.get(headTail).should('have.length', 4)
    // Нажатие на кнопку
    cy.contains('Удалить из head').click();
    // Проверки для элементов списка и кнопок
    cy.get(circle).eq(0).should('have.css', 'border', DEFAULT_COLOR).and('have.text', '');
    cy.get(headTail).eq(0).contains('head');
    cy.get(headTail).eq(2).contains('tail');
    cy.get(headTail).should('have.length', 3);
    // Проверки для кнопок
    cy.get('button').should('contains.text', 'Добавить в head').and('be.disabled');
    cy.get('button').should('contains.text', 'Добавить в tail').and('be.disabled');
    cy.get('button').should('contains.text', 'Добавить по индексу').and('be.disabled');
    cy.get('button').should('contains.text', 'Удалить по индексу').and('be.disabled');
  });
  it('element deleted from tail', () => {
    cy.get(headTail).should('have.length', 4)
    // Нажатие на кнопку
    cy.contains('Удалить из tail').click();
    // Проверки для элементов списка и кнопок
    cy.get(circle).eq(3).should('have.css', 'border', DEFAULT_COLOR).and('have.text', '');
    cy.get(headTail).eq(0).contains('head');
    cy.get(headTail).eq(2).contains('tail');
    cy.get(headTail).should('have.length', 3);
    // Проверки для кнопок
    cy.get('button').should('contains.text', 'Добавить в head').and('be.disabled');
    cy.get('button').should('contains.text', 'Добавить в tail').and('be.disabled');
    cy.get('button').should('contains.text', 'Добавить по индексу').and('be.disabled');
    cy.get('button').should('contains.text', 'Удалить по индексу').and('be.disabled');
  });
  it('element added by index', () => {
    cy.get(headTail).should('have.length', 4);
    // Вводим значения в текстовое поле и поле номера индекса
    cy.get(inputText).type('3');
    cy.get(inputText).should('have.value', '3');
    cy.get(inputNumber).type(1);
    cy.get(inputNumber).should('have.value', '1');
    // Нажатие на кнопку
    cy.contains('Добавить по индексу').click();
    // Проверки для элементов списка, цвета и кнопок
    cy.get(circle).eq(1).should('have.css', 'border', MODIFIED_COLOR).and('have.text', '3');
    cy.get(headTail).eq(0).contains('head');
    cy.get(headTail).eq(4).contains('tail');
    cy.get(headTail).should('have.length', 5);
  });
  it('element deleted by index', () => {
    cy.get(headTail).should('have.length', 4)
    // Вводим значение в поле номера индекса
    cy.get(inputNumber).type(2);
    cy.get(inputNumber).should('have.value', '2');
    // Нажатие на кнопку
    cy.contains('Удалить по индексу').click();
    // Проверки для элементов списка, цвета и кнопок
    cy.get(circle).eq(0).should('have.css', 'border', CHANGING_COLOR);
    cy.get(circle).eq(1).should('have.css', 'border', CHANGING_COLOR);
    cy.get(circle).eq(2).should('have.css', 'border', DEFAULT_COLOR).and('have.text', '');
    cy.get(headTail).eq(0).contains('head');
    cy.get(headTail).eq(2).contains('tail');
    cy.get(headTail).should('have.length', 3);
    // Проверки для кнопок
    cy.get('button').should('contains.text', 'Добавить в head').and('be.disabled');
    cy.get('button').should('contains.text', 'Добавить в tail').and('be.disabled');
    cy.get('button').should('contains.text', 'Удалить из head').and('be.disabled');
    cy.get('button').should('contains.text', 'Удалить из tail').and('be.disabled');
    cy.get('button').should('contains.text', 'Добавить по индексу').and('be.disabled');
  });
});