describe('Поиск и фильтрация вакансий', () => {
    beforeEach(() => {
        cy.visit('/vacancies');
    });

    it('Поиск вакансии по названию', () => {
        cy.get('[data-testid="search-input"]').type('Разработчик');
        cy.wait(1000); // Ожидание загрузки результатов
        cy.get('[data-testid="vacancy-card"]').should('have.length.gt', 0);
        cy.get('[data-testid="vacancy-title"]').first().should('contain', 'Разработчик');
    });

    it('Фильтрация по типу занятости', () => {
        cy.get('[data-testid="employment-type-filter"]').select('Дистант');
        cy.wait(1000);
        cy.get('[data-testid="employment-type"]').each($el => {
            expect($el.text()).to.contain('Дистант');
        });
    });
    it('Поиск с учетом регистра символов', () => {
        cy.get('[data-testid="search-input"]').type('разРАБотчик');
        cy.get('[data-testid="vacancy-card"]').should('have.length.gt', 0);
    });

    it('Фильтрация по диапазону зарплаты', () => {
        cy.get('[data-testid="salary-min"]').type('60000');
        cy.get('[data-testid="salary-max"]').type('90000');
        cy.get('[data-testid="apply-filters"]').click();
        cy.get('[data-testid="vacancy-salary"]').each($el => {
            const salaryText = $el.text();
            const salary = parseInt(salaryText.replace(/\D/g, ''));
            expect(salary).to.be.at.least(60000);
            expect(salary).to.be.at.most(90000);
        });
    });

    it('Комбинирование поиска и фильтрации', () => {
        cy.get('[data-testid="search-input"]').type('Разработчик');
        cy.get('[data-testid="employment-type-filter"]').select('Дистант');
        cy.get('[data-testid="apply-filters"]').click();
        cy.get('[data-testid="vacancy-card"]').should('have.length.gt', 0);
        cy.get('[data-testid="vacancy-title"]').first().should('contain', 'Разработчик');
        cy.get('[data-testid="employment-type"]').first().should('contain', 'Дистант');
    });

    it('Успешный отклик на активную вакансию', () => {
        cy.loginAsStudent();
        cy.visit('/vacancies/123'); // ID существующей активной вакансии
        cy.get('[data-testid="apply-btn"]').click();
        cy.contains('Ваш отклик отправлен').should('be.visible');
        cy.get('[data-testid="apply-btn"]').should('be.disabled');
    });

    it('Фильтрация с некорректным диапазоном зарплаты', () => {
        cy.get('[data-testid="salary-min"]').type('90000');
        cy.get('[data-testid="salary-max"]').type('60000');
        cy.get('[data-testid="apply-filters"]').click();
        cy.contains('Минимальное значение не может быть больше максимального').should('be.visible');
    });

    it('Попытка фильтрации архивных вакансий', () => {
        cy.intercept('GET', '/api/vacancies?status=archived', {
            statusCode: 403,
            body: { error: 'Доступ запрещен' }
        });
        cy.visit('/vacancies?status=archived');
        cy.contains('Нет доступа к просмотру архивных вакансий').should('be.visible');
    });
});