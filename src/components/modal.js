export { openModalWindow, closeModalWindow, closeEscWindow };
import {formEditElement, closeOnBackDropClick, formAddElement } from '../scripts/index.js';

function openModalWindow(modalWindow, cardData) {
    modalWindow.classList.add('popup_is-animated', 'popup_is-opened');
    if (modalWindow.querySelector('.popup__image')) {
      const popupImage = modalWindow.querySelector('.popup__image');
      const popupCaption = modalWindow.querySelector('.popup__caption'); 
      popupCaption.textContent = cardData.name;
      popupImage.src = cardData.link;
      popupImage.alt = cardData.name;
    }
    
    modalWindow.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('popup__close')) {
        evt.stopPropagation();
        closeModalWindow(modalWindow);
      }
    })
  
    document.addEventListener('keydown', closeEscWindow);
    const nameInput = formEditElement.elements.name;
    const jobInput = formEditElement.elements.description;
    const nameAuthor = document.querySelector('.profile__title');
    const descAuthor = document.querySelector('.profile__description');
    nameInput.value = nameAuthor.textContent;
    jobInput.value = descAuthor.textContent;
  
    modalWindow.addEventListener('click', closeOnBackDropClick)
  }
  
  function closeModalWindow(modalWindow) {
    modalWindow.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeEscWindow);
    formEditElement.reset();
    formAddElement.reset();
  }
  
  function closeEscWindow(element) {
    if( element.key === 'Escape' ) { 
      const escModalWindow = document.querySelector('.popup_is-opened');
      closeModalWindow(escModalWindow);
    }
  }