const mainContainer = document.querySelector("#main-wrapper");
const buttonContainer = document.createElement("div");
buttonContainer.classList.add("button-wrapper");
const button = document.createElement("button");
button.innerHTML = '<i class="fa-solid fa-plus"></i>';
button.classList.add("add-subreddit-button");
buttonContainer.appendChild(button);
mainContainer.appendChild(buttonContainer);