import '../pages/index.css';
import { initialCards } from './cards.js';
import { addCard, deleteCard, changeLike } from '../components/card.js';
import { openModalWindow, closeModalWindow }  from '../components/modal.js';
export {cardTemplate, imageModalWindow, formEditElement, closeOnBackDropClick, formAddElement };


const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');

initialCards.forEach(function (item) {
  const listCard = addCard(item, deleteCard, changeLike, openModalWindow);
  cardContainer.append(listCard);
});

const editButton = document.querySelector('.profile__edit-button');
const editModalWindow = document.querySelector('.popup_type_edit');
const addButton = document.querySelector('.profile__add-button');
const addNewCard = document.querySelector('.popup_type_new-card');
const imageModalWindow = document.querySelector('.popup_type_image');




editButton.addEventListener('click', () => openModalWindow(editModalWindow));
addButton.addEventListener('click', () => openModalWindow(addNewCard));

const formEditElement = document.forms['edit-profile'];

function handleFormSubmit(evt) {
  evt.preventDefault(); 
  const nameInput = formEditElement.elements.name;
  const jobInput = formEditElement.elements.description;
  const nameAuthor = document.querySelector('.profile__title');
  const descAuthor = document.querySelector('.profile__description');
  nameAuthor.textContent = nameInput.value;
  descAuthor.textContent = jobInput.value;
  const modalWindow = document.querySelector('.popup_is-opened');
  closeModalWindow(modalWindow);
}

formEditElement.addEventListener('submit', handleFormSubmit);

const formAddElement = document.forms['new-place'];

function handleAddFormSubmit(evt) {
  evt.preventDefault(); 
  const item = {};
  item.name =  formAddElement.elements['place-name'].value;
  item.link = formAddElement.elements.link.value;
  const listCard = addCard(item, deleteCard, changeLike, openModalWindow);
  cardContainer.prepend(listCard);
  const modalWindow = document.querySelector('.popup_is-opened');
  closeModalWindow(modalWindow);
}

formAddElement.addEventListener('submit', handleAddFormSubmit);

function closeOnBackDropClick({ currentTarget, target }) {
  const dialog = currentTarget
  const isClickedOnBackDrop = target === dialog
  if (isClickedOnBackDrop) {
    const modalWindow = document.querySelector('.popup_is-opened');
    closeModalWindow(modalWindow);
  }
};