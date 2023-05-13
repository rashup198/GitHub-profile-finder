const searchbar = document.querySelector(".searchbar-container");
const profilecontainer = document.querySelector(".profile-container");

const url = "https://api.github.com/users/";
const btnmode = document.getElementById("btn-mode");
const modetext = document.getElementById("mode-text")
const modeicon = document.getElementById("mode-icon");
const input = document.getElementById("input");
const noresult = document.getElementById("no-result");
const btnsubmit = document.getElementById("submit");
const avatar = document.getElementById("avatar");
const name = document.getElementById("name");
const date = document.getElementById("date");
const user = document.getElementById("user");
const bio = document.getElementById("bio");
const repos = document.getElementById("repos");
const followers = document.getElementById("followers");
const followings = document.getElementById("followings");
const user_location = document.getElementById("location");
const page = document.getElementById("page");
const twitter = document.getElementById("twitter");
const company = document.getElementById("company");

let darkMode = false;


//event listners

btnsubmit.addEventListener("click", function () {
    if (input.value !== "") {
        getuserdate(url + input.value)
    }
})


input.addEventListener("keydown", function (e) {
    if (e.key == "Enter") {
        if (input.value !== "") {
            getuserdate(url + input.value)
        }
    }
}, false);

input.addEventListener("input", function () {
    noresult.style.display = "none";
});



btnmode.addEventListener("click", function r() {


    if (darkMode == false) {
        darkModeProperties();
    } else {
        lightModeProperties();
    }
});

//api call

async function getuserdate(gitUrl) {

    try {
        const response = await fetch(gitUrl);

        const data = await response.json();

        console.log(data);
        updateProfile(data);

    } catch (error) {
        console.log("error found" + error);

    }
}


// render update proflile
function updateProfile(data) {
    if (data.message !== "Not Found") {
        noresult.style.display = "none";

        function checkNull(param1, param2) {
            if (param1 === "" || param1 === null) {
                param2.style.opacity = 0.5;
                param2.previousElementSibling.style.opacity = 0.5;
                return false;
            }
            else{
                return true;
            }
        }

        avatar.src =`${data.avatar_url}`
        user.innerText = `@${data.login}`;
        user.herf =`${data.html_url}`;
        date.innerText = `Joined ${data.created_at}`
        bio.innerText= data.bio==null ? "This profile has no bio" : `${data.bio}`
        repos.innerText =`${data.public_repos}`;
        followers.innerText = `${data.followers}`;
        followings .innerText =`${data.following}`;
        user_location.innerText =data.location==null ? "Not available" : `${data.location}`;
        page.innerText = data.blog==null ? "Not available" : `${data.blog}`;
        page.herf = data.blog==null ?"#": `${data.blog}`;

        twitter.innerText=data.twitter_username==null ? "Not available" : `${data.twitter_username}`;
        twitter.herf = data.twitter_username==null ?"#": `https://twitter.com/${data.twitter_username}`;
        company.innerText = data.company==null ?"Not available" : `${data.company}`;
        searchbar.classList.toggle("active");
        profilecontainer.classList.toggle("active");

    }  else{
        noresult.style.display="block";
    }
}   

function init(){
    darkMode =false;

    const value = localStorage.getItem("dark-mode");

    if(value ==null){
        console.log("null hai bhai");
        localStorage.setItem("dark-mode", darkMode);
        lightModeProperties();
    }
    else if(value == "true"){
        console.log("true hai bhai");
        darkModeProperties();
    }
    else{
        lightModeProperties();
    }

    getuserdate(url+"rashup198");
}

init();

