const map = L.map('map').setView([50.4434217,30.5186498], 17);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

L.marker([50.4434217,30.5186498]).addTo(map).bindPopup('E-trans').openPopup();


const disableScroll = () => {
  document.body.scrollPosition = window.scrollY;
  document.body.style.cssText = `
    overflow: hidden;
    position: fixed;
    top: -${document.body.scrollPosition}px;
    left: 0;
    height: 100vh;
    width: 100vw;
    padding-right: ${window.innerWidth - document.body.offsetWidth}px;
  `;
};

const enableScroll = () => {
  document.body.style.cssText = '';
  window.scroll({top: document.body.scrollPosition});
};


const createElem = (tag, attr) => {
  const elem = document.createElement(tag);

  return Object.assign(elem, {...attr});
};

const createModal = (title, description) => {
  const overlayElem = createElem('div', { className: 'modal' });
  const modalElem = createElem('div', { className: 'modal__block' });
  const modalContainerElem = createElem('div', { className: 'modal__container' });

  const titleElem = createElem('h2', {
    className: 'modal__title',
    textContent: `Заказать ${title}`,
  });

  const descriptionElem = createElem('p', {
    className: 'modal__description',
    textContent: description,
  });

  const formElem = createElem('form', {
    className: 'modal__form',
    method: 'post',
    action: 'https://jsonplaceholder.typicode.com/posts',
    id: 'order',
  });

  const nameLabelElem = createElem('label', {className: 'modal__label'});
  const nameSpanElem = createElem('span', {
    className: 'modal__text',
    textContent: 'Имя:',
  });
  const nameInputElem = createElem('input', {
    className: 'modal__input',
    placeholder: 'Введите ваше имя...',
    name: 'name',
    required: true,
  });

  const phoneLabelElem = createElem('label', {className: 'modal__label'});
  const phoneSpanElem = createElem('span', {
    className: 'modal__text',
    textContent: 'Телефон:',
  });
  const phoneInputElem = createElem('input', {
    className: 'modal__input',
    placeholder: 'Введите ваш телефон...',
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
    innerHTML: `<svg width="24" height="24" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#00654E"/>
</svg>
`,
  });

  overlayElem.addEventListener('click', e => {
    const target = e.target;
    if (target === overlayElem || target.closest('.modal__close')) {
      overlayElem.remove();
      enableScroll();
    }
  });

  nameLabelElem.append(nameSpanElem, nameInputElem);
  phoneLabelElem.append(phoneSpanElem, phoneInputElem);

  formElem.append(nameLabelElem, phoneLabelElem, hideInput);
  
  modalContainerElem.append(
    titleElem,
    descriptionElem,
    formElem,
    btnSubmit,
    closeModalBtn
  );
  modalElem.append(modalContainerElem);
  overlayElem.append(modalElem);
  disableScroll();
  document.body.append(overlayElem);
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
}
