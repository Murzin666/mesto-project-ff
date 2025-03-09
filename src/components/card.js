export { addCard, deleteCard, changeLike };
import {cardTemplate, imageModalWindow} from '../scripts/index.js';


function addCard(cardData, callback, callbackLike, callbackModalWindow) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = cardData.link; 
    cardImage.alt = cardData.name; 
    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => callback(cardElement));
    cardElement.querySelector('.card__like-button').addEventListener('click', () => callbackLike(cardElement));
    cardImage.addEventListener('click', () => callbackModalWindow(imageModalWindow, cardData));
    return cardElement;
  };
  
 
  function deleteCard(cardElement){
    cardElement.remove();
  };

  function changeLike(element) {
    const likeButton = element.querySelector('.card__like-button');
    likeButton.classList.toggle('card__like-button_is-active');
  };