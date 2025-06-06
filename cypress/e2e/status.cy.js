describe('смена статуса рабочего пространства', () => {
    it('смена статуса рабочего пространства ', () => {
        cy.viewport(1920, 1080)
        cy.log('Вход на страницу под аккаунтом работодателя')
        cy.visit('https://dev.profteam.su/login');
        cy.get('input[type="text"]').type('testerEmployer');
        cy.get('input[type="password"]').type('Password1');
        cy.get('#app > div.page > div > section > form > div.form__buttons > div:nth-child(3) > button').click()

        cy.log('Переход во вкладку с потребностями')
        cy.get('#app > div.page > div > div.page-navigation > div.page-nav > div:nth-child(5) > p').click({timeout: 1000})

        cy.contains('Рабочее пространство').click({timeout: 2000})
        cy.contains('Потребность выполнена').click()
    });
    it('ошибка в названии кнопки', () => {
        cy.viewport(1920, 1080)
        cy.log('Вход на страницу под аккаунтом работодателя')
        cy.visit('https://dev.profteam.su/login');
        cy.get('input[type="text"]').type('testerEmployer');
        cy.get('input[type="password"]').type('Password1');
        cy.get('#app > div.page > div > section > form > div.form__buttons > div:nth-child(3) > button').click()

        cy.log('Переход во вкладку с потребностями')
        cy.get('#app > div.page > div > div.page-navigation > div.page-nav > div:nth-child(5) > p').click({timeout: 1000})

        cy.contains('Рабочее пространство').click({timeout: 2000})
        cy.contains('Паатребность выполнена').click()
    });
})