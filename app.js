const searchbar = document.querySelector(".searchbar-container");
const profilecontainer = document.querySelector(".profile-container");
const user_Section=  document.getElementsByClassName("user-section")

const url = "https://api.github.com/users/";
const root = document.documentElement.style;
const btnmode = document.getElementById("btn-mode");
const modetext = document.getElementById("mode-text")
const modeicon = document.getElementById("mode-icon");
const input = document.getElementById("input");
const noresult = document.getElementById("no-result");
const btnsubmit = document.getElementById("submit");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const avatar = document.getElementById("avatar");
const username = document.getElementById("name");
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

const modal= document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

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
        username.innerText = data.name === null ? data.login : data.name
        user.innerText = `@${data.login}`;
        datesegments = data.created_at.split("T").shift().split("-");
        date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
        user.herf =`https://github.com/${data.login}`;
       
        bio.innerText= data.bio==null ? "This profile has no bio" : `${data.bio}`
        repos.innerText =`${data.public_repos}`;
        followers.innerText = `${data.followers}`;
        followings .innerText =`${data.following}`;
        user_location.innerText =data.location==null ? "Not available" : `${data.location}`;
        page.innerText = data.blog==null ? "Not available" : `${data.blog}`;
        page.herf = data.blog==null ?"#":`${data.blog}`;

        twitter.innerText=data.twitter_username==null ? "Not available" : `${data.twitter_username}`;
        twitter.herf = data.twitter_username==null ?"#":`${data.twitter_username}`;
        company.innerText = data.company==null ?"Not available" : `${data.company}`;
        searchbar.classList.toggle("active");
        profilecontainer.classList.toggle("active");

    }  else{
        noresult.style.display="block";
    }
}   

// swtich to dark mode

function darkModeProperties() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    modetext.innerText = "LIGHT";
    modeicon.src = "image/sun-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    darkMode = true;
    console.log("darkmode changed to " + darkMode);
    localStorage.setItem("dark-mode", true);  console.log("setting dark mode to false");
    console.log("setting dark mode to true");
 }

  function lightModeProperties() {
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#060606");
    root.setProperty("--lm-text-alt", "#6e747d");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    modetext.innerText = "DARK";
    modeicon.src = "image/moon-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    darkMode = false;
    console.log("darkmode changed to " + darkMode);
    localStorage.setItem("dark-mode", false);
    console.log("setting dark mode to false");
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

//modal open fucntion

const openModal=()=>{
    modal.classList.add("active");
    overlay.classList.add("overlayactive");
};

// modal close function

const closeModal=()=>{
    modal.classList.remove("active");
    overlay.classList.remove("overlayactive");
};