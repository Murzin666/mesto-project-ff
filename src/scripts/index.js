import '../pages/index.css';
import { addCard, deleteCard, changeLike } from '../components/card.js';
import { openModal , closeModal }  from '../components/modal.js';
import { enableValidation, clearValidation } from '../components/validation.js';
import { getInitialCards, getInfoUser, handleServerProfile, handleServerAddFormSubmit, deleteFormSubmit, likeFormSubmit, handleAuthorProfile } from '../components/api.js'

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
const formAuthorElement = document.forms['update-avatar'];
const allPopup = document.querySelectorAll('.popup');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption'); 
const nameInput = formEditElement.elements.name;
const jobInput = formEditElement.elements.description;
const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
const photoAuthor = document.querySelector('.profile__image');
const authorPopup = document.querySelector('.popup_type_profile_edit');

editButton.addEventListener('click', () => editProfile(profilePopup));
addButton.addEventListener('click', () => openModal(cardPopup));
photoAuthor.addEventListener('click', () => openModal(authorPopup));
formEditElement.addEventListener('submit', handleEditFormSubmit);
formAddElement.addEventListener('submit', handleAddFormSubmit);
formAuthorElement.addEventListener('submit', editAvatar);

function handleEditFormSubmit(evt) {
  evt.preventDefault(); 
  const saveButton = formEditElement.querySelector('.popup__button');
  renderLoading(true, saveButton);
  const nameInput = formEditElement.elements.name;
  const jobInput = formEditElement.elements.description;
  nameAuthor.textContent = nameInput.value;
  descAuthor.textContent = jobInput.value;
  handleServerProfile(nameAuthor.textContent, descAuthor.textContent)
    .then(() => {
      renderLoading(false, saveButton);
    })
    .catch((error) => {
      console.log(error);
    }); 
  closeModal(profilePopup);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault(); 
  const saveButton = formAddElement.querySelector('.popup__button');
  renderLoading(true, saveButton);
  const item = {};
  item.name =  formAddElement.elements['place-name'].value;
  item.link = formAddElement.elements.link.value;
  item.likes = [];
  item.owner = {};
  Promise.all([handleServerAddFormSubmit(item), getInfoUser()])
    .then(([resultServerAddFormSubmit, resultInfoUser]) => {
      item.owner._id = resultInfoUser._id
      item._id = resultServerAddFormSubmit._id;
      const listCard = addCard(item, deleteCardServer, changeLikeServer, cardTemplate, openImage, resultInfoUser);
      cardContainer.prepend(listCard); 
      renderLoading(false, saveButton);
    })
    .catch((error) => {
      console.log(error);
    }); 
  closeModal(cardPopup);
  formAddElement.reset();
  clearValidation(formAddElement, configValidation);
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
  openModal(profilePopup);
  clearValidation(profilePopup, configValidation);
}

enableValidation(configValidation);

Promise.all([getInitialCards(), getInfoUser()])
  .then(([resultInitialCards, resultInfoUser]) => {
    resultInitialCards.forEach(function (item) {
      const listCard = addCard(item, deleteCardServer, changeLikeServer, cardTemplate, openImage, resultInfoUser);
      cardContainer.append(listCard);
    });
    nameAuthor.textContent = resultInfoUser.name;
    descAuthor.textContent = resultInfoUser.about;
    photoAuthor.style.backgroundImage = `url("${resultInfoUser.avatar}")`;
  })
  .catch((error) => {
    console.log(error);
  }); 

function deleteCardServer(cardElement, idCard) {
  deleteFormSubmit(idCard)
    .then(() => {
      deleteCard(cardElement); 
    })
    .catch((error) => {
      console.log(error);
    }); 
};

function changeLikeServer(cardElement, cardDataServer, likeCount, resultInfoUser) {
  likeFormSubmit(cardDataServer, resultInfoUser)
    .then((res) => {
    likeCount.textContent = res.likes.length;
    cardDataServer.likes = res.likes;
    changeLike(cardElement) 
    })
    .catch((error) => {
      console.log(error);
    }); 
};

function editAvatar(evt) {
  evt.preventDefault(); 
  const saveButton = formAuthorElement.querySelector('.popup__button');
  const urlInput = formAuthorElement.elements['avatar-link'].value;
  renderLoading(true, saveButton);
  handleAuthorProfile(urlInput)
    .then((res) => {
      photoAuthor.style.backgroundImage = `url("${res.avatar}")`;
      renderLoading(false, saveButton);
    })
    .catch((error) => {
      console.log(error);
    }); 
  closeModal(authorPopup);
  formAuthorElement.reset();
  clearValidation(formAuthorElement, configValidation);
};

function renderLoading(isLoading, saveButton) {
  if (isLoading) {
    saveButton.textContent = 'Сохранение...'
  } else {
    saveButton.textContent = 'Сохранить'
  }
}