import { CHANGING_COLOR, MODIFIED_COLOR, DEFAULT_COLOR, circle } from "./utils";

describe('string page works as expected', () => {
  beforeEach(() => {
    cy.visit('/recursion');
  });
  it('button disabled if input is empty', () => {
    // Проверка, что кнопка "Развернуть" отключена, когда поле ввода пустое
    cy.get('input').should('have.value', '');
    cy.get('button').should('contains.text', 'Развернуть').and('be.disabled');
  });
  it('string rended', () => {
    // Ввод строки и проверка, что кнопка "Развернуть" активна
    cy.get('input').type('work');
    // Проверка, что строка развернута корректно с изменением цветов и порядка символов
    cy.get('input').should('have.value', 'work');
    cy.get('button').should('contains.text', 'Развернуть').should('not.be.disabled');
    // Нажатие на кнопку
    cy.contains('Развернуть').click();
    cy.get('input').should('have.value', 'work');
    cy.get(circle).should('have.length', 4);
    cy.get(circle).eq(0).should('have.css', 'border', CHANGING_COLOR).and('have.text', 'w');
    cy.get(circle).eq(1).should('have.css', 'border', DEFAULT_COLOR).and('have.text', 'o');
    cy.get(circle).eq(2).should('have.css', 'border', DEFAULT_COLOR).and('have.text', 'r');
    cy.get(circle).eq(3).should('have.css', 'border', CHANGING_COLOR).and('have.text', 'k');
    cy.get(circle).eq(0).should('have.css', 'border', MODIFIED_COLOR).and('have.text', 'k');
    cy.get(circle).eq(1).should('have.css', 'border', CHANGING_COLOR).and('have.text', 'o');
    cy.get(circle).eq(2).should('have.css', 'border', CHANGING_COLOR).and('have.text', 'r');
    cy.get(circle).eq(3).should('have.css', 'border', MODIFIED_COLOR).and('have.text', 'w'); 
    cy.get(circle).eq(0).should('have.css', 'border', MODIFIED_COLOR).and('have.text', 'k');
    cy.get(circle).eq(1).should('have.css', 'border', MODIFIED_COLOR).and('have.text', 'r');
    cy.get(circle).eq(2).should('have.css', 'border', MODIFIED_COLOR).and('have.text', 'o');
    cy.get(circle).eq(3).should('have.css', 'border', MODIFIED_COLOR).and('have.text', 'w');
  });
});