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