describe('Подтверждение отклика', () => {
    beforeEach(() => {
        cy.loginAsEmployer();
        cy.visit('/responses');
    });

    it('Одобрение отклика и создание рабочего пространства', () => {
        cy.get('[data-testid="response-card"]').first().within(() => {
            cy.get('[data-testid="approve-btn"]').click();
        });
        cy.contains('Рабочее пространство создано').should('be.visible');
        cy.url().should('include', '/workspace/');
    });

    it('Фильтрация откликов по статусу', () => {
        const statuses = ['На рассмотрении', 'Одобрены', 'Отклонены'];
        statuses.forEach(status => {
            cy.get('[data-testid="status-filter"]').select(status);
            cy.get('[data-testid="response-card"]').each($el => {
                cy.wrap($el).find('[data-testid="response-status"]').should('contain', status);
            });
        });
    });

    it('Отображение информации о студенте в отклике', () => {
        cy.get('[data-testid="response-card"]').first().within(() => {
            cy.get('[data-testid="student-name"]').should('not.be.empty');
            cy.get('[data-testid="student-education"]').should('exist');
            cy.get('[data-testid="student-profile-link"]').should('have.attr', 'href');
        });
    });

    it('Одобрение несуществующего отклика', () => {
        cy.intercept('PUT', '/api/responses/999/approve', {
            statusCode: 404,
            body: { error: 'Отклик не найден' }
        });
        cy.visit('/responses/999/approve');
        cy.contains('Отклик не найден').should('be.visible');
    });
    it('Попытка одобрения отклика не администратором', () => {
        cy.loginAsRegularEmployer(); // Пользователь без прав администратора
        cy.visit('/responses/123/approve');
        cy.contains('Недостаточно прав').should('be.visible');
    });

    it('Попытка изменения статуса уже обработанного отклика', () => {
        cy.visit('/responses/456'); // ID уже обработанного отклика
        cy.get('[data-testid="approve-btn"]').should('be.disabled');
        cy.get('[data-testid="reject-btn"]').should('be.disabled');
    });
});