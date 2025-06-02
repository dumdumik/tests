describe('Полный цикл работы с вакансией', () => {
    it('От создания вакансии до завершения рабочего пространства', () => {
        // 1. Работодатель создает вакансию
        cy.loginAsEmployer();
        cy.createAndPublishVacancy();

        // 2. Студент откликается на вакансию
        cy.loginAsStudent();
        cy.applyToVacancy();

        // 3. Работодатель одобряет отклик
        cy.loginAsEmployer();
        cy.approveResponseAndCreateWorkspace();

        // 4. Взаимодействие в рабочем пространстве
        cy.addCommentToWorkspace('Тестовый комментарий');
        cy.changeWorkspaceStatus('Принят на вакансию');

        // 5. Проверка завершения
        cy.get('[data-testid="status-badge"]').should('contain', 'Принят на вакансию');
    });
    it('Полный цикл с отклонением кандидата', () => {
        // 1. Создание вакансии
        cy.loginAsEmployer();
        const vacancyId = cy.createAndPublishVacancy();

        // 2. Студент откликается
        cy.loginAsStudent();
        const applicationId = cy.applyToVacancy(vacancyId);

        // 3. Работодатель отклоняет отклик
        cy.loginAsEmployer();
        cy.rejectApplication(applicationId, 'Не соответствует требованиям');

        // 4. Проверка статусов
        cy.loginAsStudent();
        cy.visit(`/applications/${applicationId}`);
        cy.get('[data-testid="application-status"]').should('contain', 'Отклонен');
        cy.contains('Не соответствует требованиям').should('be.visible');
    });

    it('Множественные отклики на вакансию', () => {
        // 1. Создание вакансии
        cy.loginAsEmployer();
        const vacancyId = cy.createAndPublishVacancy();

        // 2. Несколько студентов откликаются
        const students = [{
            email: 'student1@test.com',
            password: 'student123'
        }, {
            email: 'student2@test.com',
            password: 'student123'
        }];

        const applications = [];
        students.forEach(student => {
            cy.login(student.email, student.password);
            applications.push(cy.applyToVacancy(vacancyId));
        });

        // 3. Работодатель проверяет список откликов
        cy.loginAsEmployer();
        cy.visit(`/vacancies/${vacancyId}/responses`);
        cy.get('[data-testid="response-card"]').should('have.length', students.length);

        // 4. Одобрение одного отклика
        cy.approveResponseAndCreateWorkspace(applications[0]);

        // 5. Проверка автоматического отклонения остальных откликов
        cy.visit(`/vacancies/${vacancyId}/responses`);
        cy.get('[data-testid="response-status"]').contains('Отклонен').should('have.length', students.length - 1);
    });
});