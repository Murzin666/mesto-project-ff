export { addCard, deleteCard, changeLike };

function addCard(cardData, callbackDelete, callbackLike, cardTemplate, callbackModalWindow, idUser) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const likeCount = cardElement.querySelector('.card__like-count');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  if (cardData.likes.find(({ _id }) => _id === idUser)) {
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.classList.toggle('card__like-button_is-active');
  } 
  if (cardData.owner._id != idUser) {
    deleteButton.style.display = 'none';
  }
  likeCount.textContent = cardData.likes.length;
  cardImage.src = cardData.link; 
  cardImage.alt = cardData.name; 
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => callbackDelete(cardElement, cardData._id));
  cardElement.querySelector('.card__like-button').addEventListener('click', () => {
    if (cardData.likes.find(({ _id }) => _id === idUser)) {
      callbackLike(cardElement, cardData, likeCount, 'DELETE')
    } else {
      callbackLike(cardElement, cardData, likeCount, 'PUT')
    }
  });
  cardImage.addEventListener('click', () => callbackModalWindow(cardData));   
  return cardElement;
};
  
function deleteCard(cardElement){
  cardElement.remove();
};

function changeLike(element, likeCount, res) {
  const likeButton = element.querySelector('.card__like-button');
  likeButton.classList.toggle('card__like-button_is-active');
  likeCount.textContent = res.likes.length;
};