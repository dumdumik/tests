describe('взаимодействие внутри рабочего пространства', () => {
    it('взаимодействие внутри рабочего пространства ', () => {
        cy.viewport(1920, 1080)
        cy.log('Вход на страницу под аккаунтом работодателя')
        cy.visit('https://dev.profteam.su/login');
        cy.get('input[type="text"]').type('sergo');
        cy.get('input[type="password"]').type('Sergo6666');
        cy.get('#app > div.page > div > section > form > div.form__buttons > div:nth-child(3) > button')
            .click({timeout: 3000})

        cy.log('рабочее пространство')
        cy.get('#app > div.page > div > div.page-navigation > div.page-nav > div:nth-child(4) > p').click({timeout: 1000})
        cy.log('рабочее пространство далее')
        cy.contains('Одобрены').click({timeout: 1000})
        cy.visit('https://dev.profteam.su/workspaces/253')
    });

    it('ошибка при отправке', () => {
        cy.viewport(1920, 1080)
        cy.log('Вход на страницу под аккаунтом работодателя')
        cy.visit('https://dev.profteam.su/login');
        cy.get('input[type="text"]').type('wanek');
        cy.get('input[type="password"]').type('Wane8749');
        cy.get('#app > div.page > div > section > form > div.form__buttons > div:nth-child(3) > button')
            .click({timeout: 3000})

        cy.log('рабочее пространство')
        cy.get('#app > div.page > div > div.page-navigation > div.page-nav > div:nth-child(4) > p').click({timeout: 1000})
        cy.log('рабочее пространство далее')
        cy.contains('Одобрены').click({timeout: 1000})
        cy.visit('https://dev.profteam.su/workspaces/253')
        cy.get('div[class="comment-textarea__buttons"]').children().last().click()
    });
})