describe('просмотр страницы с потребностями (с поиском и фильтром)', () => {


    it('НЕРАЗБОРЧИВЫЙ ТЕКСТ, НИЧЕГО НЕ НАЙДЕНО ', () => {
        cy.viewport(1920, 1080)
        cy.log('Вход на страницу под аккаунтом работодателя')
        cy.visit('https://dev.profteam.su/login');
        cy.get('input[type="text"]').type('testerEmployer');
        cy.get('input[type="password"]').type('Password1');
        cy.get('#app > div.page > div > section > form > div.form__buttons > div:nth-child(3) > button').click({timeout:2000})

        cy.log('Переход во вкладку с потребностями для просмотра')
        cy.visit('https://dev.profteam.su/needs')

        cy.log('ввод в поиск название нужной потребности')
        cy.get('#app > div.page > div > section > div > div.needs-block__needs-filters-wrapper > div.needs-block__filters-wrapper > div > div.filters-block__filter-list > div.search-input > div > input')
            .click()
            .type('SDFOPFDFDFSSS')

        cy.log('нажатие на кнопку лупы для нахождения')
        cy.get('#app > div.page > div > section > div > div.needs-block__needs-filters-wrapper > div.needs-block__filters-wrapper > div > div.filters-block__filter-list > div.search-input > div > button')
            .click({timeout:2000})

        cy.log('потребности не найдены')
    });

    it('просмотр страницы с потребностями (с поиском и фильтром)', () => {
        cy.viewport(1920, 1080)
        cy.log('Вход на страницу под аккаунтом работодателя')
        cy.visit('https://dev.profteam.su/login');
        cy.get('input[type="text"]').type('testerEmployer');
        cy.get('input[type="password"]').type('Password1');
        cy.get('#app > div.page > div > section > form > div.form__buttons > div:nth-child(3) > button').click({timeout:2000})

        cy.log('Переход во вкладку с потребностями для просмотра')
        cy.visit('https://dev.profteam.su/needs')

        cy.log('ввод в поиск название нужной потребности')
        cy.get('#app > div.page > div > section > div > div.needs-block__needs-filters-wrapper > div.needs-block__filters-wrapper > div > div.filters-block__filter-list > div.search-input > div > input')
            .click()
            .type('Сварщик')

        cy.log('нажатие на кнопку лупы для нахождения')
        cy.get('#app > div.page > div > section > div > div.needs-block__needs-filters-wrapper > div.needs-block__filters-wrapper > div > div.filters-block__filter-list > div.search-input > div > button')
            .click({timeout:2000})

        cy.log('Нажатие на кнопку "подробнее" ')
        cy.get('#app > div.page > div > section > div > div.needs-block__needs-filters-wrapper > div.infinite-loader.need-list > div:nth-child(1) > div.need-item__info-wrapper > div.need-item__footer-wrapper > div > div.need-footer__button-wrapper > button')
            .click({timeout: 1000})

        cy.log('проверка нахождения нужной потребности')
        cy.contains('150 лет опыта работа')

        cy.log('возвращаемся обратно к поиску')
        cy.visit('https://dev.profteam.su/needs')

        cy.log('тыкаем разные типы зп')
        cy.contains('По диапазону').click({timeout:3000})
        cy.contains('По договорённости').click({timeout:3000})

        cy.log('выбираем потребность по диапазоноу')
        cy.contains('По диапазону').click({timeout:3000})
        cy.get('#app > div.page > div > section > div > div.needs-block__needs-filters-wrapper > div.needs-block__filters-wrapper > div > div.filters-block__filter-list > div.salary-field > div:nth-child(3) > div:nth-child(2) > div > input')
            .click().type('50000')
        cy.get('#app > div.page > div > section > div > div.needs-block__needs-filters-wrapper > div.needs-block__filters-wrapper > div > div.filters-block__filter-list > div.search-input > div > input')
            .click()
            .type('Сварщик 3-5 лет опыта')
        cy.log('Нажатие на кнопку "подробнее" ')
        cy.get('#app > div.page > div > section > div > div.needs-block__needs-filters-wrapper > div.infinite-loader.need-list > div:nth-child(1) > div.need-item__info-wrapper > div.need-item__footer-wrapper > div > div.need-footer__button-wrapper > button')
            .click({timeout: 3000})
    }) //сделан
})