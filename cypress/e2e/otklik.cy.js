describe('отклик на потребность студентом', () => {

    it('отклик на потребность студентом ', () => {
        cy.viewport(1920, 1080)
        cy.log('Вход на страницу под аккаунтом работодателя')
        cy.visit('https://dev.profteam.su/login');
        cy.get('input[type="text"]').type('wanek');
        cy.get('input[type="password"]').type('Wane8749');
        cy.get('#app > div.page > div > section > form > div.form__buttons > div:nth-child(3) > button')
            .click({timeout: 3000})
        cy.url().should('include', '/account');

        cy.log('Переход в раздел потребности')
        cy.contains('Потребности').click()

        cy.log('Нажатие на кнопку "откликнуться" ')
        cy.contains('Откликнуться').first().click()
    });

    it('Ошибка при повторном отклике', () => {
        cy.viewport(1920, 1080)
        cy.log('Вход на страницу под аккаунтом работодателя')
        cy.visit('https://dev.profteam.su/login');
        cy.get('input[type="text"]').type('sergo');
        cy.get('input[type="password"]').type('Sergo6666');
        cy.get('#app > div.page > div > section > form > div.form__buttons > div:nth-child(3) > button')
            .click({timeout: 3000})
        cy.url().should('include', '/account');

        cy.log('Переход в раздел потребности')
        cy.contains('Потребности').click()

        cy.log('Нажатие на кнопку "откликнуться" ')
        cy.contains('Вы уже откликнулись!')
    });
})