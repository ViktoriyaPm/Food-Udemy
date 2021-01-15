
document.addEventListener('DOMContentLoaded', () => {

        //tabs

    const choiceOfFoodStyle = document.querySelectorAll('.tabheader__item');
    const foodStyleDescription = document.querySelectorAll('.tabcontent');
    const tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent () {
        foodStyleDescription.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade')
        });
        choiceOfFoodStyle.forEach(item => {
            item.classList.remove('tabheader__item_active')
        })
    }
    hideTabContent();

    function showTabContent (i = 0) {
        foodStyleDescription[i].classList.add('show', 'fade')
        foodStyleDescription[i].classList.remove('hide')
        choiceOfFoodStyle[i].classList.add('tabheader__item_active')
    }
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const eventTarget = event.target;

        if (eventTarget.classList.contains('tabheader__item')) {
            choiceOfFoodStyle.forEach((item, i) => {
                if (item === eventTarget) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })

        //timer

    const timer = document.querySelector('.timer');
    const daysCounter = document.querySelector('#days');
    const hoursCounter = document.querySelector('#hours');
    const minutesCounter = document.querySelector('#minutes');
    const secondsCounter = document.querySelector('#seconds');
    const deadline = '2021-02-01';

    function getTimeRemaining (endTime) {
        const parseRestOfTime = Date.parse(endTime) - Date.parse(new Date());
        const daysCounter = Math.floor(parseRestOfTime / (1000 * 60 * 60 * 24 ));
        const hoursCounter = Math.floor((parseRestOfTime / (1000 * 60 * 60)) % 24);
        const minutesCounter = Math.floor((parseRestOfTime / (1000 * 60)) % 60);
        const secondsCounter = Math.floor((parseRestOfTime / 1000) % 60);

        return {
            total: parseRestOfTime,
            daysCounter: daysCounter,
            hoursCounter: hoursCounter,
            minutesCounter: minutesCounter,
            secondsCounter: secondsCounter
        }
    }

    function setClock (endTime) {

        const timer = setInterval(updateClock, 1000);

        updateClock();

        function getZero (num) {
            if (num >= 0 && num < 10) {
                return `0${num}`
            }
            else {
                return num
            }
        }

        function updateClock () {
            const restOfTime = getTimeRemaining(endTime);

            daysCounter.innerHTML = getZero(restOfTime.daysCounter);
            hoursCounter.innerHTML = getZero(restOfTime.hoursCounter);
            minutesCounter.innerHTML = getZero(restOfTime.minutesCounter);
            secondsCounter.innerHTML = getZero(restOfTime.secondsCounter);

            if (restOfTime.total <= 0) {
                clearInterval(timer);
            }
        }
    }

    setClock(deadline);

        //modal

    const modalTrigger = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    })

    function openModal () {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearTimeout(modalTimeout);
    }

    function closeModal () {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modal.addEventListener('click', (event) => {
        const eventTarget = event.target;
        if (eventTarget === modal || eventTarget.getAttribute('data-close') === "") {
            closeModal()
        }
    })

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            event.preventDefault();
            closeModal();
        }
    });

    const modalTimeout = setTimeout(openModal, 50000);

    function showModalByScroll () {
        if ((window.pageYOffset + document.documentElement.clientHeight) >= document.documentElement.scrollHeight) {
            openModal();
            removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);


    //Введению в работу с классами на примере создания на странице карточек меню

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add("menu__item")
            } else {
                this.classes.forEach(className => element.classList.add(className))
            }

            element.innerHTML = `
                    <img src= ${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>
            `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        550,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        700,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        500,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/balance.jpg",
        "balance",
        'Меню "Сбалансированное"',
        'Меню "Сбалансированное" - это соответствие вашего рациона всем научным рекомендациям. Мы тщательно просчитываем вашу потребность в к/б/ж/у и создаем лучшие блюда для вас.',
        650,
        '.menu .container'
    ).render();

    //Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/icons/spinner.svg',
        success: 'Спасибо! Мы скоро с вами свяжемся...',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    })

    function postData (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const request = new XMLHttpRequest();

            request.open('POST', 'server.php');

            request.setRequestHeader('Content-type', 'application/json');

            const formData = new FormData(form);

            const object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });

            const json = JSON.stringify(object);

            request.send(json);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
                } else {
                    showThanksModal(message.failure);
                }
            })
        })
    }
    
    function showThanksModal(message) {
        const modalDialog = document.querySelector('.modal__dialog');

        modalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            modalDialog.classList.add('show');
            modalDialog.classList.remove('hide');
            closeModal();
        }, 4000)
    }


});