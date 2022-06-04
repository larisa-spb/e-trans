const init = () => {
    const myMap = new ymaps.Map(
      'map',
      {
        center: [55.7718, 37.6316],
        zoom: 16,
        controls: ['smallMapDefaultSet'],
      },
      {},
    );
    const myPlacemark = new ymaps.Placemark(
      [55.7724, 37.6252],
      {},
      {
        iconLayout: 'default#image',
        iconImageHref: 'img/mark.svg',
        iconImageSize: [70, 70],
        iconImageOffset: [-35, -70],
      },
    );
    myMap.geoObjects.add(myPlacemark);
};
ymaps.ready(init);
 
const scrollSmooth = document.querySelectorAll('.navigation__link')
    for (let anchor of scrollSmooth) {
        anchor.addEventListener('click', function (event) {
            event.preventDefault()

            const blockID = anchor.getAttribute('href')
      
            document.querySelector(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
            });
        });
    };

const disabledScroll = () => {
    document.body.scrollPosition = window.scrollY;
    document.body.style.cssText = `
    overflow: hidden;
    position: fixed;
    top: -${document.body.scrollPosition}px;
    left: 0;
    height: 100wh;
    width: 100%;
    padding-right: ${window.innerWidth - document.body.offsetWidth}px;
    `
};

const enabledScrol = () => {
    document.body.style.cssText = '';
    window.scroll({top: document.body.scrollPosition});

};

const createElem = (tag, attr) => {
    const elem = document.createElement(tag);
    return Object.assign(elem, { ...attr });
};

const createModal = (title, description) => {
    const overlayElem = createElem('div', {className: 'modal'});
    const modalElem = createElem('div', {className: 'modal__block'});
    const modalContainerElem = createElem('div', {className: 'modal__container'});

    const titleElem = createElem('div', {
        className: 'modal__title',
        textContent: `Заказать ${title}`,
    });

    const descriptionElem = createElem('div', {
        className: 'modal__description',
        textContent: description
    });

    const formElem = createElem('form', {
        className: 'modal__form',
        method: 'post',
        action: 'https://jsonplaceholder.typicode.com/posts',
        id: 'order'
    });

    const nameLabelElem = createElem('label', {
        className: 'modal__label',
    });

    const nameSpanElem = createElem('span', {
        className: 'modal__text',
        textContent: 'Имя',
    });

    const nameInputElem = createElem('input', {
        className: 'modal__input',
        placeholder: 'Введите ваше имя',
        name: 'name',
        required: true,
    });

    const phoneLabelElem = createElem('label', {
        className: 'modal__label',
    });

    const phoneSpanElem = createElem('span', {
        className: 'modal__text',
        textContent: 'Телефон',
    });

    const phoneInputElem = createElem('input', {
        className: 'modal__input',
        placeholder: 'Введите ваш телефон',
        name: 'phone',
        required: true,
    });

    const hideInput = createElem('input', {
        type: 'hidden',
        name: 'product',
        value: title,
    });

    const btnSubmit = createElem('button', {
        className: 'modal__btn',
        textContent: 'Заказать',
        type: 'submit',
    });

    btnSubmit.setAttribute('form', 'order');

    const closeModalBtn = createElem('button', {
        className: 'modal__close',
        innerHTML: `
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.75 8.0125L21.9875 6.25L15 13.2375L8.0125 6.25L6.25 8.0125L13.2375 15L6.25 21.9875L8.0125 23.75L15 16.7625L21.9875 23.75L23.75 21.9875L16.7625 15L23.75 8.0125Z" fill="#00654E"/>
        </svg>
        `,
        ariaLabel: 'Закрыть модальное окно',
    });

    overlayElem.addEventListener('click', (event) => {
        const target = event.target;
        if (target === overlayElem || target.closest('.modal__close')) {
        overlayElem.remove();
        enabledScrol();
        }
    });

    nameLabelElem.append(nameSpanElem, nameInputElem);
    phoneLabelElem.append(phoneSpanElem, phoneInputElem);
    formElem.append(nameLabelElem, phoneLabelElem, hideInput);
    
    modalContainerElem.append(
        titleElem, descriptionElem, 
        formElem, 
        btnSubmit, 
        closeModalBtn
    );

    modalElem.append(modalContainerElem);
    overlayElem.append(modalElem);
    
    document.body.append(overlayElem);
    disabledScroll();
    return overlayElem;
};

const productTitle = document.querySelectorAll('.product__title');
const productDescription = document.querySelectorAll('.product__description');
const productBtn = document.querySelectorAll('.product__btn');

for (let i = 0; i < productBtn.length; i++) {
    productBtn[i].addEventListener('click', () => {
    
        const title = productTitle[i].textContent;
        const description = productDescription[i].textContent;
        createModal(title, description);
    
    });
};