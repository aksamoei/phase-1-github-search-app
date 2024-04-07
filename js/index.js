
function gitSearch(){
    let gitHubForm = document.getElementById("github-form");
    gitHubForm.addEventListener("submit", function(event){
        event.preventDefault();
        let userInput = document.getElementById("search").value;
        fetch(`https://api.github.com/search/users?q=${userInput}`)
        .then(re => re.json())
        .then(function(userData){
            let domUserList = document.getElementById("user-list")
            userData["items"].forEach(function(ele){
                let gitUser = document.createElement("li");
                gitUser.textContent = ele.login;
                domUserList.appendChild(gitUser);
                
            });
            let domgUserItems = document.querySelectorAll("#user-list li")
            let domUserArray = Array.from(domgUserItems)
            for (let i = 0; i < domUserArray.length; i++){
                domUserArray[i].addEventListener("click", function(){
                    let repoList = document.getElementById("repos-list");
                    repoList.textContent = "";
                    fetch(userData["items"][i].repos_url)
                    .then(response => response.json())
                    .then(function(repoData){
                        //let repoList = document.getElementById("repos-list");
                        for (let n = 0; n < repoData.length; n++){
                            let repoItem = document.createElement("li")
                            repoItem.textContent = repoData[n].name
                            repoList.appendChild(repoItem)
                        }
                    })
                });
            }

        })
        .catch(error => console.log(error.message))

    })
}







//wait page to load to launch js
document.addEventListener("DOMContentLoaded", gitSearch)