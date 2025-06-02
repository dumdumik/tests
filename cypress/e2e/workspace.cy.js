describe('Рабочее пространство', () => {
    beforeEach(() => {
        cy.loginAsEmployer();
        cy.visit('/workspace/123'); // ID существующего рабочего пространства
    });

    it('Добавление комментария', () => {
        const commentText = 'Тестовый комментарий ' + Date.now();
        cy.get('[data-testid="comment-input"]').type(commentText);
        cy.get('[data-testid="submit-comment"]').click();
        cy.contains(commentText).should('be.visible');
    });

    it('Изменение статуса на "Принят на вакансию"', () => {
        cy.get('[data-testid="status-select"]').select('Принят на вакансию');
        cy.contains('Статус изменен').should('be.visible');
        cy.get('[data-testid="status-badge"]').should('contain', 'Принят на вакансию');
    });
    it('Добавление комментария с вложением', () => {
        cy.fixture('testDocument.pdf', 'binary').then(fileContent => {
            const fileName = 'testDocument.pdf';
            cy.get('[data-testid="file-input"]').attachFile({
                fileContent: Cypress.Blob.binaryStringToBlob(fileContent),
                fileName: fileName,
                mimeType: 'application/pdf'
            });
        });
        cy.get('[data-testid="file-name"]').should('contain', 'testDocument.pdf');
        cy.get('[data-testid="submit-comment"]').click();
        cy.get('[data-testid="attachment"]').should('be.visible');
    });

    it('Отображение истории изменений статусов', () => {
        cy.get('[data-testid="status-history"]').click();
        cy.get('[data-testid="status-history-item"]').should('have.length.gt', 0);
    });

    it('Попытка добавить комментарий в завершенное рабочее пространство', () => {
        cy.visit('/workspace/456'); // ID завершенного рабочего пространства
        cy.get('[data-testid="comment-input"]').should('be.disabled');
        cy.contains('Рабочее пространство завершено').should('be.visible');
    });
    it('Попытка загрузки недопустимого типа файла', () => {
        cy.fixture('invalidFile.exe', 'binary').then(fileContent => {
            cy.get('[data-testid="file-input"]').attachFile({
                fileContent: Cypress.Blob.binaryStringToBlob(fileContent),
                fileName: 'invalidFile.exe',
                mimeType: 'application/octet-stream'
            });
        });
        cy.contains('Недопустимый тип файла').should('be.visible');
    });

    it('Попытка загрузки слишком большого файла', () => {
        // Создаем файл размером больше 2 МБ
        const bigFile = new ArrayBuffer(2.1 * 1024 * 1024);
        cy.get('[data-testid="file-input"]').attachFile({
            fileContent: bigFile,
            fileName: 'bigFile.pdf',
            mimeType: 'application/pdf'
        });
        cy.contains('Максимальный размер файла 2 МБ').should('be.visible');
    });

    it('Попытка изменить статус без заполнения комментария', () => {
        cy.get('[data-testid="status-select"]').select('В вакансии отказано');
        cy.get('[data-testid="status-comment"]').should('be.visible');
        cy.get('[data-testid="confirm-status-change"]').click();
        cy.contains('Необходимо указать причину изменения статуса').should('be.visible');
    });
});