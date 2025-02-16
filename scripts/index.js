// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(cardData, callback) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardData.link; 
  cardImage.alt = cardData.name; 
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => callback(cardElement));
  return cardElement;
};

// @todo: Функция удаления карточки
function deleteCard(cardElement){
  cardElement.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  const listCard = addCard(item, deleteCard);
  cardContainer.append(listCard);
});