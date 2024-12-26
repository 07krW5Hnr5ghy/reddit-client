const mainContainer = document.querySelector("#main-wrapper");
const buttonContainer = document.createElement("div");
buttonContainer.classList.add("add-reddit-button-wrapper");
const addRedditbutton = document.createElement("button");
addRedditbutton.innerHTML = '<i class="fa-solid fa-plus"></i>';
addRedditbutton.classList.add("add-subreddit-button");
buttonContainer.appendChild(addRedditbutton);
mainContainer.appendChild(buttonContainer);

const errors = {
    netWorkError:"sub reddit doesn't exist."
};

async function getSubRedditData(subReddit){
    try{
        const request = await fetch(`https://www.reddit.com/r/${subReddit}.json`);
        const result = await request.json();
        if(result.data.children.length){
            return result.data.children;
        }else{
            return {...result};
        }
    }catch(error){
        return errors.netWorkError;
    }
}

addRedditbutton.addEventListener("click",()=>{
    if(buttonContainer.childElementCount===1){
        // create menu
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

        addSubRedditButton.addEventListener("click",async (e)=>{
            e.preventDefault();
            const subRedditData = await getSubRedditData(subRedditInput.value);
            if(subRedditData===errors.netWorkError){
                console.log("no existe el subreddit");
            }else{
                const newRedditLane = document.createElement("div");
                newRedditLane.classList.add("reddit-lane");
                const newRedditLaneHeader = document.createElement("div");
                newRedditLaneHeader.classList.add("reddit-lane-header");
                const headerTitle = document.createElement("span");
                headerTitle.textContent = `/r/${subRedditInput.value}`;
                const headerButton = document.createElement("button");
                headerButton.type = "button";
                headerButton.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';
                headerButton.addEventListener("click",()=>{
                    const subMenu = document.createElement("div");
                    const refreshButton = document.createElement("button");
                    refreshButton.textContent = "Refresh";
                    refreshButton.addEventListener("click",async ()=>{
                        newRedditLane.innerHTML = "";
                        newRedditLane.appendChild(newRedditLaneHeader);
                        const subRedditData = await getSubRedditData(headerTitle.textContent.split("/")[2]);
                        subRedditData.forEach(post=>{
                            const newPost = document.createElement("div");
                            newPost.classList.add("reddit-post");
                            newPost.classList.add("reddit-post-border");
                            const postScore = document.createElement("span");
                            const postTitle = document.createElement("span");
                            postTitle.textContent = post.data.title;
                            postScore.textContent = post.data.score;
                            newPost.appendChild(postScore);
                            newPost.appendChild(postTitle);
                            newRedditLane.appendChild(newPost);
                        });
                    });
                    const removeButton = document.createElement("button");
                    removeButton.textContent = "Delete";
                    removeButton.addEventListener("click",(e)=>{
                        const lanePointer = e.target.parentElement.parentElement.parentElement;
                        console.log(e.target.parentElement.parentElement.parentElement);
                        console.log(mainContainer.children);
                        mainContainer.removeChild(lanePointer);
                        console.log(mainContainer.querySelectorAll(".reddit-lane"));
                        if(mainContainer.childElementCount===2){
                            mainContainer.appendChild(buttonContainer);
                            buttonContainer.classList.add("add-reddit-button-wrapper-left-border");
                        }else{
                            buttonContainer.classList.remove("add-reddit-button-wrapper-left-border");
                        }
                    });
                    subMenu.appendChild(refreshButton);
                    subMenu.appendChild(removeButton);
                    newRedditLaneHeader.appendChild(subMenu);
                });
                newRedditLaneHeader.appendChild(headerTitle);
                newRedditLaneHeader.appendChild(headerButton);
                newRedditLane.appendChild(newRedditLaneHeader);

                if(mainContainer.childElementCount===3){
                    const previousLanes = Object.values(mainContainer.children).slice(0,mainContainer.children.length-1);
                    mainContainer.innerHTML = "";

                    subRedditData.forEach(post=>{
                        const newPost = document.createElement("div");
                        newPost.classList.add("reddit-post");
                        newPost.classList.add("reddit-post-border");
                        const postScore = document.createElement("span");
                        const postTitle = document.createElement("span");
                        postTitle.textContent = post.data.title;
                        postScore.textContent = post.data.score;
                        newPost.appendChild(postScore);
                        newPost.appendChild(postTitle);
                        newRedditLane.appendChild(newPost);
                    });
                    newRedditLane.id = "reddit-lane-3";
                    mainContainer.appendChild(newRedditLane);
                    previousLanes.forEach(lane=>{
                        lane.classList.remove("reddit-lane-border-right");
                        lane.classList.add("reddit-lane-border-left");
                        mainContainer.appendChild(lane);
                    }); 
                }else if(mainContainer.childElementCount===2){
                    const previousLanes = Object.values(mainContainer.children).slice(0,mainContainer.children.length-1);
                    mainContainer.innerHTML = "";
                    newRedditLane.classList.add("reddit-lane-border-right");

                    subRedditData.forEach(post=>{
                        const newPost = document.createElement("div");
                        newPost.classList.add("reddit-post");
                        newPost.classList.add("reddit-post-border");
                        const postScore = document.createElement("span");
                        const postTitle = document.createElement("span");
                        postTitle.textContent = post.data.title;
                        postScore.textContent = post.data.score;
    
                        newPost.appendChild(postScore);
                        newPost.appendChild(postTitle);
                        newRedditLane.appendChild(newPost);
                    });
                    newRedditLane.id = "reddit-lane-2";
                    mainContainer.appendChild(newRedditLane);
                    previousLanes.forEach(lane=>{
                        mainContainer.appendChild(lane);
                    });
                    mainContainer.appendChild(buttonContainer);
                }else if(mainContainer.childElementCount===1){
                    newRedditLane.classList.add("reddit-lane-border-right");
                    console.log(subRedditData);
                    subRedditData.forEach((post)=>{
                        const newPost = document.createElement("div");
                        newPost.classList.add("reddit-post");
                        newPost.classList.add("reddit-post-border");
                        
                        const postScore = document.createElement("span");
                        const postTitle = document.createElement("span");
                        postTitle.textContent = post.data.title;
                        postScore.textContent = post.data.score;
    
                        newPost.appendChild(postScore);
                        newPost.appendChild(postTitle);
                        newRedditLane.appendChild(newPost);
    
                    });
    
                    mainContainer.innerHTML = "";
                    newRedditLane.id = "reddit-lane-1";
                    mainContainer.appendChild(newRedditLane);
                    mainContainer.appendChild(buttonContainer);
                }

            }
        });
    }
});