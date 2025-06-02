describe('Отклик на вакансию - дополнительные позитивные сценарии', () => {
    it('Успешный отклик на активную вакансию', () => {
        cy.loginAsStudent();
        cy.visit('/vacancies/123'); // ID существующей активной вакансии
        cy.get('[data-testid="apply-btn"]').click();
        cy.contains('Ваш отклик отправлен').should('be.visible');
        cy.get('[data-testid="apply-btn"]').should('be.disabled');
    });

    it('Отображение статуса "На рассмотрении" после отклика', () => {
        cy.get('[data-testid="apply-btn"]').click();
        cy.get('[data-testid="application-status"]').should('contain', 'На рассмотрении');
    });

    it('Доступ к рабочему пространству после одобрения отклика', () => {
        // Эмулируем одобрение отклика через API
        cy.intercept('PUT', '/api/applications/123/approve', {
            statusCode: 200,
            body: { workspaceId: 'ws-123' }
        });
        cy.visit('/applications/123');
        cy.get('[data-testid="workspace-link"]').should('be.visible');
    });

    it('Отклик на вакансию, на которую уже откликались', () => {
        cy.loginAsStudent();
        cy.visit('/vacancies/123'); // ID вакансии с существующим откликом
        cy.get('[data-testid="apply-btn"]').should('be.disabled');
    });

    describe('Отклик на вакансию - дополнительные негативные сценарии', () => {
        it('Попытка отклика на архивную вакансию', () => {
            cy.visit('/vacancies/456'); // ID архивной вакансии
            cy.get('[data-testid="apply-btn"]').should('not.exist');
            cy.contains('Вакансия архивирована').should('be.visible');
        });

        it('Попытка отклика неавторизованным пользователем', () => {
            cy.clearCookies();
            cy.visit('/vacancies/123');
            cy.get('[data-testid="apply-btn"]').click();
            cy.url().should('include', '/login');
        });
    });
});