// ===================== Init datas =====================
let Url = "http://localhost:8000/api/v1/titles/";
let param1 = '?sort_by=-imdb_score';
let param2 = '&page=2';
let paramCat = ['', '&genre=Action', '&genre=Animation', '&genre=Adventure'];

imgTab0 = [];
imgTab1 = [];
imgTab2 = [];
imgTab3 = [];

class MovieData {
    constructor(id, url, title, imgUrl) {
        this.id = id;
        this.url = url;
        this.title = title;
        this.imgUrl = imgUrl;
    }
}

// =====================Le Meilleur score================
    const promise00 = fetch(Url + param1);
    promise00.then(async (responseData) => {
        const response = await responseData.json();

        try {
            const id = response["results"][0]["id"];
            const promise01 = fetch(Url + id);
            promise01.then(async (responseData) => {
                const response = await responseData.json();

                try {
                    const image_url = response["image_url"];
                    const title = response["title"];
                    const genres = response["genres"];
                    const date_published = response["date_published"];
                    const rated = response["rated"];
                    const imdb_score = response["imdb_score"];
                    const directors = response["directors"];
                    const actors0 = response["actors"][0];
                    const actors1 = response["actors"][1];
                    const actors2 = response["actors"][2];
                    const duration = response["duration"];
                    const countries = response["countries"];
                    const worldwide_gross_income = response["worldwide_gross_income"];
                    const description = response["description"];

                    const display_image_url = document.querySelector("#img_jacket");
                    const display_title = document.querySelector("#title");
                    const display_genres = document.querySelector("#genres");
                    const display_date = document.querySelector("#date_published");
                    const display_rated = document.querySelector("#rated");
                    const display_imdb_score = document.querySelector("#imdb_score");
                    const display_directors = document.querySelector("#directors");
                    const display_actors0 = document.querySelector("#actors0");
                    const display_actors1 = document.querySelector("#actors1");
                    const display_actors2 = document.querySelector("#actors2");
                    const display_duration = document.querySelector("#duration");
                    const display_countries = document.querySelector("#countries");
                    const display_ww_gross_income = document.querySelector("#worldwide_gross_income");
                    const display_description = document.querySelector("#description");

                    display_title.innerHTML = title;
                    display_genres.innerHTML = genres;
                    display_date.innerHTML = date_published;
                    display_rated.innerHTML = rated;
                    display_imdb_score.innerHTML = imdb_score;
                    display_directors.innerHTML = directors;
                    display_actors0.innerHTML = actors0;
                    display_actors1.innerHTML = actors1;
                    display_actors2.innerHTML = actors2;
                    display_duration.innerHTML = duration;
                    display_countries.innerHTML = countries;
                    display_ww_gross_income.innerHTML = worldwide_gross_income;
                    display_description.innerHTML = description;

                    const image = `<img src="${image_url}">`;
                    display_image_url.insertAdjacentHTML("afterbegin", image);

                } catch (err) {
                    console.log(err);
                }
            })

        } catch (err) {
            console.log(err);
        }
    })

createContainers();



async function getDataMovie(url, j) {
    const promise = await fetch(url);
    const response = await promise.json();
    
    const moviedata0 = new MovieData(response["id"], response["url"], response["title"], response["image_url"]);
    console.log('md: ', moviedata0);
}

const moviedata0 = new MovieData

async function getResponse(url1, url2, i) {     // 4x index containers    
    const promise1 = await fetch(url1);
    const response1 = await promise1.json();
    for (let j = 0; j < 5; j++)       
        try {            
            const imgUrl1 = response1["results"][j]["image_url"];   // id  movies x 2
            const imgUrl = response1["results"][j]["url"];
            getDataMovie(imgUrl, j);
            
            try {
                displayImgArrays(i, imgUrl1);               
            } catch (err) {
                console.log(err);
            }
        } catch (err) {
            console.log(err);
        }

    const promise2 = await fetch(url2);
    const response2 = await promise2.json();
    for (let j = 0; j < 2; j++)
        try {
            const imgUrl2 = response2["results"][j]["image_url"];            
            try {                
                displayImgArrays(i, imgUrl2);
            } catch (err) {
                console.log(err);
            }
        } catch (err) {
            console.log(err);
        }
    //console.log('promise', response1["results"]);
}

let Container = [];

for (let i = 0; i < 4; i++) {
    Container.push('Container' + i);
    Container[i] = document.getElementsByClassName(".carouselimg" + i);
    Container[i].innerHTML = getResponse(Url + param1 + paramCat[i], Url + param1 + paramCat[i] + param2, i);
}
    
function displayImgArrays(selector, url) {    
    // selector = i ==>.carouselimg i
    if (selector == 0) { imgTab0.push(url) }
    else if (selector == 1) { imgTab1.push(url) }
    else if (selector == 2) { imgTab2.push(url) }
    else if (selector == 3) { imgTab3.push(url) };        
        
            
    displayUrlArray = document.querySelector('.carouselimg' + selector);
    
    const images = `<img src = "${url}" onclick="imgModal(this)">`;
    
    displayUrlArray.insertAdjacentHTML("beforeend", images);    
}

// ======================== Modal =================================

let modal = document.getElementById('myModal');

function imgModal(img) {
    let url = img.src;
    const DivModal = document.querySelector(".img-container");
    const imgModal = document.createElement("img");
    imgModal.setAttribute("src", url);
    DivModal.appendChild(imgModal);
    //modal.style.visibility = (modal.style.visibility == "visible") ? "hidden" : "visible";    
    //modal.style.transform = "scale(2.5)";
    //body.onclick = function (event) {
        //if (event.target == modal) {
            //modal.sytle.display = "none";
        //}
    //}
}

//====================== Création de 4 sliders vides ========================

function createContainers() {
    const DivContainer = document.querySelector(".carousel");
    for (let i= 0; i < 4; i++) {

        const newDivMain = document.createElement("div");
        DivContainer.appendChild(newDivMain);
        newDivMain.classList.add('carouselbox' + i);

        let switchLeft = document.createElement("div");
        switchLeft.classList.add("switchLeft");
        newDivMain.appendChild(switchLeft);

        let chevronL = document.createElement("img");
        chevronL.src = "fonts/left.png";                
        switchLeft.appendChild(chevronL);

        const newDivImg = document.createElement("div");
        newDivImg.classList.add('carouselimg' + i);
        newDivMain.appendChild(newDivImg);

        let switchRight = document.createElement("div");
        switchRight.classList.add("switchRight");
        newDivMain.appendChild(switchRight);
        //next_url = document.getElementsByClassName("input").value;  ////?????
        let chevronR = document.createElement("img");
        chevronR.src = "fonts/right.png";
        //chevronR.addEventListener("click", alertMeR(next_url));        
        switchRight.appendChild(chevronR);
    }
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}
        
// Clicking anywher outside of the modal close it.
