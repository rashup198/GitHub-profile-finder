const searchbar = document.querySelector(".searchbar-container");
const profilecontainer= document.querySelector(".profile-container");

const url = "https://api.github.com/users/";
const btnmode = document.getElementById("btn-mode");
const modetext = document.getElementById("mode-text")
const modeicon = document.getElementById("mode-icon");
const input = document.getElementById("input");
const noresult= document.getElementById("no-result");
const btnsubmit = document.getElementById("submit");
const avatar = document.getElementById("avatar");
const name = document.getElementById("name");
const date = document.getElementById("date");
const user=  document.getElementById("user");
const bio = document.getElementById("bio");
const repos = document.getElementById("repos");
const followers = document.getElementById("followers");
const followings= document.getElementById("followings");
const user_location = document.getElementById("location");
const page = document.getElementById("page");
const twitter =document.getElementById("twitter");
const company = document.getElementById("company");

let darkMode= false;


//event listners

btnsubmit.addEventListener("click", function(){
    if(input.value!==""){
        getuserdate(url+input.value)
    }
})


input.addEventListener("keydown", function(e){
    if(e.key=="Enter"){
        if(input.value!==""){
            getuserdate(url+input.value)
        }
    }
},false
);

input.addEventListener("input", function(){
    noresult.style.display="none";
});


 
btnmode.addEventListener("click", function r(){

    
    if(darkMode==false){
        darkModeProperties();
    }
    else{
        lightModeProperties();
    }
});

//api call

async function getuserdate(gitUrl){
    
    try {
        const response=await fetch(gitUrl);
     
         const data = await response.json();
     
         console.log(data);
         updateProfile(data);
        
} catch (error) {
    console.log("error found" +  error);

}
}
