// Описание тестового случая для проверки доступности сервиса
describe('service is available', function () {
  it('on localhost:3000', function () {
    cy.visit('http://localhost:3000'); // Посещаем указанный адрес
    // Проверяем, что страница успешно загружена и не содержит ошибок
    cy.get('body').should('not.contain.text', 'Cannot GET');
    cy.get('body').should('not.contain.text', 'Cannot connect to the server');
  });
});