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