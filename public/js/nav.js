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
    const createMessageImage = document.querySelector(".create-message-image")
    const createMessage = document.querySelector(".create-message")
    const createMessageMessage = document.querySelector(".create-message-message")
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
    createMessage.classList.toggle("toggle-create-message")
    createMessageImage.classList.toggle("toggle-button")
    createMessageMessage.classList.toggle("toggle-button")
}

closeButton.addEventListener("click", closeNavBar)

// const dashBoardButton = document.querySelector(".dash-board")
// const dashTextButton = document.querySelector(".dash-text")

// const messageBoardButton = document.querySelector(".message-board")
// const messageTextButton = document.querySelector(".message-text")

// const joinClubButton = document.querySelector(".join-club")
// const clubTextButton = document.querySelector(".club-text")

// const dashes = [dashBoardButton, dashTextButton]
// const messages = [messageBoardButton, messageTextButton]
// const clubs = [joinClubButton, clubTextButton]

// const flag = [true, null, null]

// dashes.forEach(b => {
//     b.addEventListener('click', () => {
//         if (!flag){
//             flag[0] = true;
//             dashBoardButton.classList.toggle("select")
//             dashTextButton.classList.toggle("select")
//             if(messageBoardButton.classList.contains("select")){
//                 messageBoardButton.classList.toggle("select")
//             }
//             if(messageTextButton.classList.contains("select")){
//                 messageTextButton.classList.toggle("select")
//             }
//             if(joinClubButton.classList.contains("select")){
//                 joinClubButton.classList.toggle("select")
//             }
//             if(clubTextButton.classList.contains("select")){
//                 clubTextButton.classList.toggle("select")
//             }
//         }
//     })
// })

// messages.forEach(b => {
//     b.addEventListener('click', () => {
//         if (!flag){
//             flag[1] = true;
//             messageBoardButton.classList.toggle("select")
//             messageTextButton.classList.toggle("select")
//             if(dashBoardButton.classList.contains("select")){
//                 dashBoardButton.classList.toggle("select")
//             }
//             if(dashTextButton.classList.contains("select")){
//                 dashTextButton.classList.toggle("select")
//             }
//             if(joinClubButton.classList.contains("select")){
//                 joinClubButton.classList.toggle("select")
//             }
//             if(clubTextButton.classList.contains("select")){
//                 clubTextButton.classList.toggle("select")
//             }
//         }
//     })
// })

// clubs.forEach(b => {
//     b.addEventListener('click', () => {
//         if (!flag){
//             flag[2] = true;
//             joinClubButton.classList.toggle("select")
//             clubTextButton.classList.toggle("select")
//             if(dashBoardButton.classList.contains("select")){
//                 dashBoardButton.classList.toggle("select")
//             }
//             if(dashTextButton.classList.contains("select")){
//                 dashTextButton.classList.toggle("select")
//             }
//             if(messageBoardButton.classList.contains("select")){
//                 messageBoardButton.classList.toggle("select")
//             }
//             if(messageTextButton.classList.contains("select")){
//                 messageTextButton.classList.toggle("select")
//             }
//         }
//     })
// })