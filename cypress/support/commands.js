Cypress.Commands.add('loginAsEmployer', () => {
    cy.visit('/login');
    cy.get('[name="email"]').type('employer@test.com');
    cy.get('[name="password"]').type('employer123');
    cy.get('[data-testid="login-btn"]').click();
});

Cypress.Commands.add('loginAsStudent', () => {
    // Аналогично для студента
});

Cypress.Commands.add('createAndPublishVacancy', () => {
    // Создание и публикация вакансии
});

Cypress.Commands.add('applyToVacancy', (vacancyId) => {
    // Отклик на вакансию
});

Cypress.Commands.add('approveResponseAndCreateWorkspace', (responseId) => {
    // Одобрение отклика
});

Cypress.Commands.add('addCommentToWorkspace', (workspaceId, text) => {
    // Добавление комментария
});

Cypress.Commands.add('changeWorkspaceStatus', (workspaceId, status) => {
    // Изменение статуса
});
Cypress.Commands.add('rejectApplication', (applicationId, reason) => {
    cy.visit(`/responses/${applicationId}`);
    cy.get('[data-testid="reject-btn"]').click();
    cy.get('[data-testid="rejection-reason"]').type(reason);
    cy.get('[data-testid="confirm-rejection"]').click();
});

Cypress.Commands.add('login', (email, password) => {
    cy.visit('/login');
    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type(password);
    cy.get('[data-testid="login-btn"]').click();
});

Cypress.Commands.add('loginAsRegularEmployer', () => {
    cy.login('regular@employer.com', 'employer123');
});