const sNavButton = document.querySelector(".snav-button")

const sNavContent = document.querySelector(".snav-content")

const showNav = () => {
    sNavContent.classList.toggle("grow")
}

sNavButton.addEventListener("click", showNav)