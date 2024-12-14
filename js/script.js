const mainContainer = document.querySelector("#main-wrapper");
const buttonContainer = document.createElement("div");
buttonContainer.classList.add("add-reddit-button-wrapper");
const addRedditbutton = document.createElement("button");
addRedditbutton.innerHTML = '<i class="fa-solid fa-plus"></i>';
addRedditbutton.classList.add("add-subreddit-button");
buttonContainer.appendChild(addRedditbutton);
mainContainer.appendChild(buttonContainer)
addRedditbutton.addEventListener("click",()=>{
    console.log(buttonContainer.childNodes);
    if(buttonContainer.childElementCount===1){
        const addRedditMenu = document.createElement("div");
        addRedditMenu.classList.add("add-reddit-menu");
        const inputLabel = document.createElement("label");
        inputLabel.textContent = "Enter the name of the subreddit";
        const subRedditInput = document.createElement("input");
        subRedditInput.classList.add("sub-reddit-input");
        subRedditInput.id = "sub-reddit-input";
        inputLabel.setAttribute("for",subRedditInput.id);
        const addSubRedditButton = document.createElement("button");
        addSubRedditButton.type = "button";
        addSubRedditButton.textContent = "Add Subreddit";
        buttonContainer.appendChild(addRedditMenu);
        addRedditMenu.appendChild(inputLabel);
        addRedditMenu.appendChild(subRedditInput);
        addRedditMenu.appendChild(addSubRedditButton);
    }
});