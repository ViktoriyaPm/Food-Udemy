
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
    const deadline = '2021-01-01';

    function getTimeRemaining (endTime) {
        const parseRestOfTime = Date.parse(endTime) - Date.parse(new Date());
        const daysCounter = Math.floor(parseRestOfTime / (1000 * 60 * 60 * 24 ));
        const hoursCounter = Math.floor((parseRestOfTime / (1000 * 60 * 60)) % 24);
        const minutesCounter = Math.floor((parseRestOfTime / (1000 * 60)) % 60);
        const secondsCounter = Math.floor((parseRestOfTime / 1000) % 60)

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

        function updateClock () {
            const restOfTime = getTimeRemaining(endTime);

            daysCounter.innerHTML = '' + restOfTime.daysCounter;
            hoursCounter.innerHTML = '' + restOfTime.hoursCounter;
            minutesCounter.innerHTML = '' + restOfTime.minutesCounter;
            secondsCounter.innerHTML = '' + restOfTime.secondsCounter;

            if (restOfTime.total <= 0) {
                clearInterval(timer);
            }

            // if () {
            //
            // }
        }
    }

    setClock(deadline);

})