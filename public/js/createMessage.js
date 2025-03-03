const createMessageButton = document.querySelector("#create-message")
const createMessageContainer = document.querySelector(".create-message-container")
const closeMessage = document.querySelector(".close-message")
const openPopUp = (e) => {
    e.preventDefault()
    createMessageContainer.classList.toggle("toggle-popup")
}

createMessageButton.addEventListener('click', openPopUp)
closeMessage.addEventListener('click', openPopUp)