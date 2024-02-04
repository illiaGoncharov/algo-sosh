const getLinkByHref = (href) => cy.get(`a[href*="${href}"]`);

// Описание тестовых случаев для Роутинга
describe('routing works as expected', () => {
  beforeEach(() => {
    cy.visit('/');
  })
  it('rout to string page', () => {
    getLinkByHref('/recursion').click();
    cy.contains('Строка');
  });
  it('rout to fibonacci page', () => {
    getLinkByHref('/fibonacci').click();
    cy.contains('Последовательность Фибоначчи');
  });
  it('rout to sorting page', () => {
    getLinkByHref('/sorting').click();
    cy.contains('Сортировка массива');
  });
  it('rout to stack page', () => {
    getLinkByHref('/stack').click();
    cy.contains('Стек');
  });
  it('rout to queue page', () => {
    getLinkByHref('/queue').click();
    cy.contains('Очередь');
  });
  it('rout to list page', () => {
    getLinkByHref('/list').click();
    cy.contains('Связный список');
  });
})