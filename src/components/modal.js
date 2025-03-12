export { openModal , closeModal, closeEscWindow };

function openModal(modalWindow) {
    modalWindow.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeEscWindow);
  }
  
  function closeModal(modalWindow) {
    modalWindow.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeEscWindow);
  }
  
  function closeEscWindow(element) {
    if( element.key === 'Escape' ) { 
      const escModalWindow = document.querySelector('.popup_is-opened');
      closeModal(escModalWindow);
    }
  }