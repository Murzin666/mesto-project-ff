import '../pages/index.css';
import { initialCards } from './cards.js';
import { addCard, deleteCard, changeLike } from '../components/card.js';
import { openModal , closeModal }  from '../components/modal.js';
const nameAuthor = document.querySelector('.profile__title');
const descAuthor = document.querySelector('.profile__description');
const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const formEditElement = document.forms['edit-profile'];
const formAddElement = document.forms['new-place'];
const allPopup = document.querySelectorAll('.popup');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption'); 
const nameInput = formEditElement.elements.name;
const jobInput = formEditElement.elements.description;


initialCards.forEach(function (item) {
  const listCard = addCard(item, deleteCard, changeLike, cardTemplate, openImage);
  cardContainer.append(listCard);
});

editButton.addEventListener('click', () => editProfile (profilePopup));
addButton.addEventListener('click', () => openModal (cardPopup));
formEditElement.addEventListener('submit', handleEditFormSubmit);
formAddElement.addEventListener('submit', handleAddFormSubmit);

function handleEditFormSubmit(evt) {
  evt.preventDefault(); 
  const nameInput = formEditElement.elements.name;
  const jobInput = formEditElement.elements.description;
  nameAuthor.textContent = nameInput.value;
  descAuthor.textContent = jobInput.value;
  closeModal(profilePopup);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault(); 
  const item = {};
  item.name =  formAddElement.elements['place-name'].value;
  item.link = formAddElement.elements.link.value;
  const listCard = addCard(item, deleteCard, changeLike, cardTemplate, openImage);
  cardContainer.prepend(listCard);
  closeModal(cardPopup);
  formAddElement.reset();
}

allPopup.forEach(function (item) {
  item.classList.add('popup_is-animated');
  item.addEventListener('click', () => {
    if (event.target.classList.contains('popup__close')) {
      event.stopPropagation();
      closeModal(item);
      }
    if (event.currentTarget === event.target) {
        closeModal(item);
      }
  });
});

function openImage(cardData) {
  popupCaption.textContent = cardData.name;
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  openModal (imagePopup);
};

function editProfile(profilePopup) {
    nameInput.value = nameAuthor.textContent;
    jobInput.value = descAuthor.textContent;
    openModal(profilePopup)
}