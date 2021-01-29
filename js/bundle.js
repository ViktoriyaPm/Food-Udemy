/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {

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

    const getResource = async (url) => {
        const result = await fetch(url);

        if (!result.ok) {
            throw new Error(`Could not fetch ${url}, status: ${result.status}`);
        }

        return await result.json();
    };

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        })

}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms () {

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/icons/spinner.svg',
        success: 'Спасибо! Мы скоро с вами свяжемся...',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const result = await fetch(url, {
            method: "POST",
            body: data,
            headers: {
                'Content-type': 'application/json'
            }
        });

        return await result.json();
    };


    function bindPostData (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);


            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));



            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                });
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

}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal () {

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

}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider () {

    const slider = document.querySelector('.offer__slider')
    const slides = document.querySelectorAll('.offer__slide');
    const sliderPrevButton = document.querySelector('.offer__slider-prev');
    const sliderNextButton = document.querySelector('.offer__slider-next');
    const sliderCounter = document.querySelector('#current');
    const slidesWrapper = document.querySelector('.offer__slider-wrapper');
    const slidesField = document.querySelector('.offer__slider-inner');
    const width = window.getComputedStyle(slidesWrapper).width;
    const total = document.querySelector('#total');

    let slideIndex = 1;
    let offset = 0;


    function addZero () {
        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
            sliderCounter.textContent = `0${slideIndex}`;
        } else {
            total.textContent = slides.length;
            sliderCounter.textContent = slideIndex;
        }
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0,5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width =  width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    const dots = [];

    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if (i == 0) {
            dot.style.opacity = 1;
        }

        dots.push(dot);
        indicators.append(dot);
    }


    sliderNextButton.addEventListener('click', () => {
        if (offset === +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;


        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex ++;
        }

        addZero();

        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = '1';
    });

    sliderPrevButton.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1)
        } else {
            offset -= +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;


        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex --;
        }

        addZero();

        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = '1';
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const slideTo = event.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            addZero();

            dots.forEach(dot => dot.style.opacity = '0.5');
            dots[slideIndex - 1].style.opacity = '1';
        });
    });

}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs () {

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
            });
        }
    })

}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer () {

    const timer = document.querySelector('.timer');
    const daysCounter = document.querySelector('#days');
    const hoursCounter = document.querySelector('#hours');
    const minutesCounter = document.querySelector('#minutes');
    const secondsCounter = document.querySelector('#seconds');
    const deadline = '2021-02-11';

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

}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/

document.addEventListener('DOMContentLoaded', () => {
    const cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
    const forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
    const modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
    const slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
    const timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");

    cards();
    forms();
    modal();
    slider();
    tabs();
    timer();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map