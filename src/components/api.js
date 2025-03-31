const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-35',
  headers: {
    authorization: '37f21142-5fdc-430a-bee0-e3efb9a0c1bb',
    'Content-Type': 'application/json'
  }
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export const getInfoUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export const handleServerProfile = (nameAuthor, descAuthor) => {  
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
    name: nameAuthor,
    about: descAuthor
  }) 
})
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export const handleServerAddFormSubmit = (item) => {  
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
    name: item.name,
    link: item.link
  }) 
})
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}


export const deleteFormSubmit = (item) => {  
  return fetch(`${config.baseUrl}/cards/${item} `, {
    method: 'DELETE',
    headers: config.headers
  } 
)
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export const likeFormSubmit = (cardDataServer, resultInfoUser) => {
  const checkingId = cardDataServer.likes.find(({ _id }) => _id === resultInfoUser._id);
  if (checkingId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardDataServer._id}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  } else {
    return fetch(`${config.baseUrl}/cards/likes/${cardDataServer._id}`, {
      method: 'PUT',
      headers: config.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  } 
}

export const handleAuthorProfile = (avatar) => {  
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
    avatar: avatar
  }) 
})
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}