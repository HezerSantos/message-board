const closeButton = document.querySelector(".close-nav")

const closeNavBar = () => {
    const mainNav = document.querySelector(".main-nav")
    const navLink = document.querySelectorAll(".nav-link")
    const closeNav = document.querySelector(".close-nav")
    const logOut = document.querySelector(".log-out")
    const close = document.querySelector(".close")
    const open = document.querySelector(".open")
    const logOutMessage = document.querySelector(".log-out-message")
    const logOutImage = document.querySelector(".log-out-image")
    mainNav.classList.toggle("toggle-nav")
    navLink.forEach(link => {
        link.classList.toggle("toggle-link")
    })
    closeNav.classList.toggle("toggle-close")
    logOut.classList.toggle("toggle-log-out")
    close.classList.toggle("toggle-button")
    open.classList.toggle("toggle-button")
    logOutMessage.classList.toggle("toggle-button")
    logOutImage.classList.toggle("toggle-button")
}

closeButton.addEventListener("click", closeNavBar)

//