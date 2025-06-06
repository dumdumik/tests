describe('Создание новой потребности работодателем', () => {


    it('ВХОД В АККАУНТ ВЫПОЛНЕН НЕ ПРАВИЛЬНО', () => {
        cy.viewport(1920, 1080)
        cy.log('Вход на страницу под аккаунтом работодателя')
        cy.visit('https://dev.profteam.su/login');
        cy.get('input[type="text"]').type('test');
        cy.get('input[type="password"]').type('Password2');
        cy.get('#app > div.page > div > section > form > div.form__buttons > div:nth-child(3) > button').click()

        cy.log('введите правильные данные')
    }); //сделан

    it('НАЗВАНИЕ ПОТРЕБНОСТИ НЕ ЗАПОЛНЕНО', () => {
        cy.viewport(1920, 1080)
        cy.log('Вход на страницу под аккаунтом работодателя')
        cy.visit('https://dev.profteam.su/login');
        cy.get('input[type="text"]').type('testerEmployer');
        cy.get('input[type="password"]').type('Password1');
        cy.get('#app > div.page > div > section > form > div.form__buttons > div:nth-child(3) > button').click()

        cy.log('Переход во вкладку с потребностями')
        cy.get('#app > div.page > div > div.page-navigation > div.page-nav > div:nth-child(6) > p').click({timeout: 1000})

        cy.log('Нажатие на кнопку "создать потребность"')
        cy.get('#app > div.page > div > div.page-navigation > div.page-nav__mobile > div:nth-child(7) > section > div > div.needs-block__filters-wrapper > button')
            .click({timeout: 1000})

        // Заполнение данных потребности

        cy.log('Заполнение названия потребности',)
        cy.get('body > div:nth-child(15) > div.desktop-modal > div > div.vacancy-need-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(1) > div > input')
            .click({timeout: 3000})
        cy.log('Проверка успешного ввода')
        cy.contains('Название потребности',).should('be.visible'); // Ожидаемый элемент на странице


        cy.log('Выбор типа заработной платы и ввод суммы зп')
        cy.contains('Фиксированная').click()
        cy.get('body > div:nth-child(15) > div.desktop-modal > div > div.vacancy-need-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(2) > div > div:nth-child(3) > div > div > input')
            .type('49000')
        cy.log('Проверка выбора типа')
        cy.contains('₽',).should('be.visible'); // Ожидаемый элемент на странице


        cy.log('Написание описания')
        cy.get('body > div:nth-child(15) > div.desktop-modal > div > div.vacancy-need-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(3) > div > textarea')
            .click()
            .type('Ты должен варить крутые швы, и не умереть в первый рабочий день чувак', {timeout: 2000})

        cy.log('Написание требований')
        cy.get('body > div:nth-child(15) > div.desktop-modal > div > div.vacancy-need-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(4) > div.form-control.form-control--max > textarea')
            .click()
            .type('60 лет, седые волосы, синий комбинезон')

        cy.log('Выбор типа занятости')
        cy.get('body > div:nth-child(15) > div.desktop-modal > div > div.vacancy-need-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(5) > div > div')
            .click()
        cy.scrollTo(0, 1000)
        cy.get('body > div:nth-child(15) > div.desktop-modal > div > div.vacancy-need-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(5) > div > div > div.form-select__items > div:nth-child(3)')
            .click({timeout: 1000})

        cy.log('кнопка "создать потребность" ')
        cy.scrollTo(0, 1000)
        cy.get('body > div:nth-child(15) > div.desktop-modal > div > div.vacancy-need-wrapper > form > div.form__buttons')
            .click()
        cy.log('Введены не все данные')
    }); //сделан

    it('НЕ ЗАПОЛНЕНЫ ОБЯЗАННОСТИ', () => {
        cy.viewport(1920, 1080)
        cy.log('Вход на страницу под аккаунтом работодателя')
        cy.visit('https://dev.profteam.su/login');
        cy.get('input[type="text"]').type('testerEmployer');
        cy.get('input[type="password"]').type('Password1');
        cy.get('#app > div.page > div > section > form > div.form__buttons > div:nth-child(3) > button').click()

        cy.log('Переход во вкладку с потребностями')
        cy.get('#app > div.page > div > div.page-navigation > div.page-nav > div:nth-child(6) > p').click({timeout: 1000})

        cy.log('Нажатие на кнопку "создать потребность"')
        cy.get('#app > div.page > div > div.page-navigation > div.page-nav__mobile > div:nth-child(7) > section > div > div.needs-block__filters-wrapper > button')
            .click({timeout: 1000})

        // Заполнение данных потребности

        cy.log('Заполнение названия потребности',)
        cy.get('body > div:nth-child(15) > div.desktop-modal > div > div.vacancy-need-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(1) > div > input')
            .click({timeout: 3000})
            .type('Сварщик 3-5 лет опыта');
        cy.log('Проверка успешного ввода')
        cy.contains('Название потребности',).should('be.visible'); // Ожидаемый элемент на странице


        cy.log('Выбор типа заработной платы + ввод суммы з/п')
        cy.contains('Фиксированная').click()
        cy.get('body > div:nth-child(15) > div.desktop-modal > div > div.vacancy-need-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(2) > div > div:nth-child(3) > div > div > input')
            .type('49000')
        cy.log('Проверка выбора типа')
        cy.contains('₽',).should('be.visible'); // Ожидаемый элемент на странице


        cy.log('Написание описания')
        cy.get('body > div:nth-child(15) > div.desktop-modal > div > div.vacancy-need-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(3) > div > textarea')
            .click()

        cy.log('Написание требований')
        cy.get('body > div:nth-child(15) > div.desktop-modal > div > div.vacancy-need-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(4) > div.form-control.form-control--max > textarea')
            .click()
            .type('60 лет, седые волосы, синий комбинезон')

        cy.log('Выбор типа занятости')
        cy.get('body > div:nth-child(15) > div.desktop-modal > div > div.vacancy-need-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(5) > div > div')
            .click()
        cy.scrollTo(0, 1000)
        cy.get('body > div:nth-child(15) > div.desktop-modal > div > div.vacancy-need-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(5) > div > div > div.form-select__items > div:nth-child(3)')
            .click({timeout: 1000})

        cy.log('Нажатие на кнопку "создать потребность" ')
        cy.scrollTo(0, 1000)
        cy.get('body > div:nth-child(15) > div.desktop-modal > div > div.vacancy-need-wrapper > form > div.form__buttons')
            .click()
        cy.log('Введены не все данные')
    });

    it('НЕ ЗАПОЛНЕНЫ ТРЕБОВАНИЯ', () => {
        cy.viewport(1920, 1080)
        cy.log('Вход на страницу под аккаунтом работодателя')
        cy.visit('https://dev.profteam.su/login');
        cy.get('input[type="text"]').type('testerEmployer');
        cy.get('input[type="password"]').type('Password1');
        cy.get('#app > div.page > div > section > form > div.form__buttons > div:nth-child(3) > button').click()

        cy.log('Переход во вкладку с потребностями')
        cy.get('#app > div.page > div > div.page-navigation > div.page-nav > div:nth-child(6) > p').click({timeout: 1000})

        cy.log('Нажатие на кнопку "создать потребность"')
        cy.get('#app > div.page > div > div.page-navigation > div.page-nav__mobile > div:nth-child(7) > section > div > div.needs-block__filters-wrapper > button')
            .click({timeout: 1000})

        // Заполнение данных потребности

        cy.log('Заполнение названия потребности',)
        cy.get('body > div:nth-child(15) > div.desktop-modal > div > div.vacancy-need-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(1) > div > input')
            .click({timeout: 3000})
            .type('Сварщик 3-5 лет опыта');
        cy.log('Проверка успешного ввода')
        cy.contains('Название потребности',).should('be.visible'); // Ожидаемый элемент на странице


        cy.log('Выбор типа заработной платы + ввод суммы з/п')
        cy.contains('Фиксированная').click()
        cy.get('body > div:nth-child(15) > div.desktop-modal > div > div.vacancy-need-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(2) > div > div:nth-child(3) > div > div > input')
            .type('49000')
        cy.log('Проверка выбора типа')
        cy.contains('₽',).should('be.visible'); // Ожидаемый элемент на странице


        cy.log('Написание описания')
        cy.get('body > div:nth-child(15) > div.desktop-modal > div > div.vacancy-need-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(3) > div > textarea')
            .click()
            .type('Ты должен варить крутые швы, и не умереть в первый рабочий день чувак', {timeout: 2000})

        cy.log('Написание требований')
        cy.get('body > div:nth-child(15) > div.desktop-modal > div > div.vacancy-need-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(4) > div.form-control.form-control--max > textarea')
            .click()

        cy.log('Выбор типа занятости')
        cy.get('body > div:nth-child(15) > div.desktop-modal > div > div.vacancy-need-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(5) > div > div')
            .click()
        cy.scrollTo(0, 1000)
        cy.get('body > div:nth-child(15) > div.desktop-modal > div > div.vacancy-need-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(5) > div > div > div.form-select__items > div:nth-child(3)')
            .click({timeout: 1000})

        cy.log('Нажатие на кнопку "создать потребность" ')
        cy.scrollTo(0, 1000)
        cy.get('body > div:nth-child(15) > div.desktop-modal > div > div.vacancy-need-wrapper > form > div.form__buttons')
            .click()
        cy.log('Введены не все данные')
    });



    it('Создание новой потребности работодателем', () => {
        cy.viewport(1920, 1080)
        cy.log('Вход на страницу под аккаунтом работодателя')
        cy.visit('https://dev.profteam.su/login');
        cy.get('input[type="text"]').type('testerEmployer');
        cy.get('input[type="password"]').type('Password1');
        cy.get('#app > div.page > div > section > form > div.form__buttons > div:nth-child(3) > button').click()

        cy.log('Переход во вкладку с потребностями')
        cy.get('#app > div.page > div > div.page-navigation > div.page-nav > div:nth-child(6) > p').click({timeout: 1000})

        cy.log('Нажатие на кнопку "создать потребность"')
        cy.get('#app > div.page > div > div.page-navigation > div.page-nav__mobile > div:nth-child(7) > section > div > div.needs-block__filters-wrapper > button')
            .click({timeout: 1000})

        // Заполнение данных потребности

        cy.log('Заполнение названия потребности',)
        cy.get('body > div:nth-child(15) > div.desktop-modal > div > div.vacancy-need-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(1) > div > input')
            .click({timeout: 3000})
            .type('Сварщик 3-5 лет опыта');
        cy.log('Проверка успешного ввода')
        cy.contains('Название потребности',).should('be.visible'); // Ожидаемый элемент на странице


        cy.log('Выбор типа заработной платы + ввод суммы з/п')
        cy.contains('Фиксированная').click()
        cy.get('body > div:nth-child(15) > div.desktop-modal > div > div.vacancy-need-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(2) > div > div:nth-child(3) > div > div > input')
            .type('49000')
        cy.log('Проверка выбора типа')
        cy.contains('₽',).should('be.visible'); // Ожидаемый элемент на странице


        cy.log('Написание описания')
        cy.get('body > div:nth-child(15) > div.desktop-modal > div > div.vacancy-need-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(3) > div > textarea')
            .click()
            .type('Ты должен варить крутые швы, и не умереть в первый рабочий день чувак', {timeout: 2000})

        cy.log('Написание требований')
        cy.get('body > div:nth-child(15) > div.desktop-modal > div > div.vacancy-need-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(4) > div.form-control.form-control--max > textarea')
            .click()
            .type('60 лет, седые волосы, синий комбинезон')

        cy.log('Выбор типа занятости')
        cy.get('body > div:nth-child(15) > div.desktop-modal > div > div.vacancy-need-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(5) > div > div')
            .click()
        cy.scrollTo(0, 1000)
        cy.get('body > div:nth-child(15) > div.desktop-modal > div > div.vacancy-need-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(5) > div > div > div.form-select__items > div:nth-child(3)')
            .click({timeout: 1000})

        cy.log('Нажатие на кнопку "создать потребность" ')
        cy.scrollTo(0, 1000)
        cy.get('body > div:nth-child(15) > div.desktop-modal > div > div.vacancy-need-wrapper > form > div.form__buttons > button')
            .click()

        cy.log('Нажатие на кнопку "опубликовать" ')
        cy.get('#app > div.page > div > div.page-navigation > div.page-nav__mobile > div:nth-child(7) > section > div > div.infinite-loader.need-list > div:nth-child(1) > div > div.need-item__footer-wrapper > div > div.need-footer__button-wrapper > button.button.button__background-color-green.button__size-small.button__color-white')
            .click()
        cy.log('Проверка созданной потребности')
        cy.contains('Добавить в архив') // Ожидаемый элемент на странице
    }) //сделан
})