describe('Создание вакансии - дополнительные позитивные сценарии', () => {
    beforeEach(() => {
        cy.loginAsEmployer();
        cy.visit('/vacancies/create');
    });

    it('Успешное создание черновика вакансии', () => {
        cy.fixture('vacancyData').then((vacancy) => {
            cy.get('[name="title"]').type(vacancy.valid.title);
            cy.get('[name="employer"]').type(vacancy.valid.employer);
            // Заполнение остальных обязательных полей
            cy.get('[data-testid="save-btn"]').click();
            cy.contains('Черновик успешно создан').should('be.visible');
            cy.get('[data-testid="status-badge"]').should('contain', 'Черновик');
        });
    });

    it('Публикация вакансии (перевод в статус "Активна")', () => {
        // Предусловие: существует черновик вакансии
        cy.publishVacancy();
        cy.get('[data-testid="status-badge"]').should('contain', 'Активна');
        cy.get('[data-testid="publication-date"]').should('not.be.empty');
    });

    it('Создание вакансии с указанием зарплаты как диапазона', () => {
        cy.get('[name="salaryFrom"]').type('50000');
        cy.get('[name="salaryTo"]').type('80000');
        cy.get('[data-testid="salary-display"]').should('contain', '50 000 - 80 000 руб.');
    });

    it('Создание вакансии с зарплатой "по договоренности"', () => {
        cy.get('[data-testid="salary-agreement"]').click();
        cy.get('[data-testid="salary-display"]').should('contain', 'по договорённости');
    });

    it('Создание вакансии с разными типами занятости', () => {
        const employmentTypes = ['Очный', 'Дистант', 'Совмещенный'];
        employmentTypes.forEach(type => {
            cy.get('[name="employmentType"]').select(type);
            cy.get('[data-testid="employment-type"]').should('contain', type);
        });
    });

    it('Попытка создания с пустыми обязательными полями', () => {
        cy.get('[data-testid="save-btn"]').click();
        cy.get('[data-testid="error-title"]').should('be.visible');
        cy.get('[data-testid="error-employer"]').should('be.visible');
        // Проверка остальных обязательных полей
    });

    it('Попытка публикации неполной вакансии', () => {
        cy.get('[data-testid="publish-btn"]').click();
        cy.contains('Не все обязательные поля заполнены').should('be.visible');
    });

    it('Попытка указать некорректный диапазон зарплаты', () => {
        cy.get('[name="salaryFrom"]').type('80000');
        cy.get('[name="salaryTo"]').type('50000');
        cy.get('[data-testid="salary-error"]').should('contain', 'Минимальная зарплата не может быть больше максимальной');
    });

    it('Попытка ввести слишком длинное название вакансии', () => {
        cy.get('[name="title"]').type('a'.repeat(256));
        cy.get('[data-testid="error-title"]').should('contain', 'Максимальная длина 255 символов');
    });

    it('Попытка изменить опубликованную вакансию', () => {
        cy.publishVacancy();
        cy.get('[name="title"]').clear().type('Новое название');
        cy.get('[data-testid="save-btn"]').click();
        cy.contains('Редактирование доступно только для вакансий в статусе "Черновик"').should('be.visible');
    });
});