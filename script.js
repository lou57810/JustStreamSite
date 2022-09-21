// ===================== Init datas =====================
let Url = "http://localhost:8000/api/v1/titles/";
let param1 = '?sort_by=-imdb_score';
let param2 = '&page=2';
let paramCat = ['', '&genre=Action', '&genre=Animation', '&genre=Adventure'];
let scrollPerClick;

imgTab0 = [];
imgTab1 = [];
imgTab2 = [];
imgTab3 = [];

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
// ======================= Scrolling ==================================

let scrollAmount = 0;
let ImagePadding = 20;
scrollPerClick = document.querySelector("img").clientWidth + ImagePadding;

function sliderScrollLeft(event) {
    const sliders = document.querySelector('.carouselbox0');
    sliders.scrollTo({
        top: 0,
        left: (scrollAmount -= scrollPerClick),
        behavior: "smooth"        
    });
    if (scrollAmount < 0) {
        scrollAmount = 0
    }    
}

function sliderScrollRight(event) {
    const sliders = document.querySelector('.carouselbox0');
    if (scrollAmount <= sliders.scrollWidth - sliders.clientWidth) {
        sliders.scrollTo({
            top: 0,
            left: (scrollAmount += scrollPerClick),
            behavior: "smooth"            
        });
    }    
}

// ============ Création classe datas films =============

class MovieData {
    constructor(id, url, title, image_url, genres, date_published,
        rated, imdb_score, directors, actors,
        duration, countries, worldwide_gross_income,
        description) {
        this.id = id;
        this.url = url;
        this.title = title;
        this.image_url = image_url;        
        this.genres = genres;
        this.date_published = date_published;
        this.rated = rated;
        this.imdb_score = imdb_score;
        this.directors = directors;
        this.actors = actors;
        this.duration = duration;
        this.countries = countries;
        this.worldwide_gross_income = worldwide_gross_income;
        this.description = description;        
    }
}

async function getDataMovie(url) {
    const promise1 = await fetch(url);
    const response1 = await promise1.json();
    
    const moviedata = new MovieData(response1["id"], response1["url"],
        response1["title"], response1["image_url"],  response1["genres"],
        response1["date_published"], response1["rated"], response1["imdb_score"],
        response1["directors"], response1["actors"], response1["duration"],
        response1["countries"], response1["worldwide_gross_income"],
        response1["description"]);
    
    return moviedata;
}

// ========================= Appel fonction création Dom carousel =========================
createContainers();

// =========================================================================================
let promise = [];
let response = [];
let imgUrl = [];

async function getResponse(url1, url2, i) {
    let sliderStock = [];   // Array for imgTab0 -> imgTab3
    async function displayUrl(url) {
        const promise = await fetch(url);
        const response = await promise.json();
        for (let j = 0; j < 5; j++) {
            try {
                const imgUrl = response["results"][j]["image_url"];   
                const movieUrl = response["results"][j]["url"];
                moviedata = await getDataMovie(movieUrl);
                
                try {
                    if (i == 0) {
                        imgTab0.push(moviedata["image_url"]);
                        sliderStock.push(imgTab0);
                        }
                    else if (i == 1) {
                        imgTab1.push(moviedata["image_url"]);
                        sliderStock.push(imgTab1);
                        }
                    else if (i == 2) {
                        imgTab2.push(moviedata["image_url"]);
                        sliderStock.push(imgTab2);
                        }
                    else if (i == 3) {
                        imgTab3.push(moviedata["image_url"]);
                        sliderStock.push(imgTab3);
                        } 
                } catch (err) {
                    console.log(err);
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
    await displayUrl(url1);
    await displayUrl(url2);
    for (let j = 0; j < 10; j++) {
        displayImgArrays(i, sliderStock[i][j]);
    }
    console.log('sliderStock', sliderStock[i]);
}

let Container = [];

for (let i = 0; i < 4; i++) {
    Container.push('Container' + i);
    Container[i] = document.getElementsByClassName(".carouselimg" + i);
    Container[i].innerHTML = getResponse(Url + param1 + paramCat[i], Url + param1 + paramCat[i] + param2, i);
}

function getTaB() {}
    
async function displayImgArrays(selector, url) {    
    // selector = i ==>.carouselimg i            
    displayUrlArray = document.querySelector('.carouselimg' + selector);    
    const images = `<img src = "${url}" onclick="imgModal(this)">`;    
    displayUrlArray.insertAdjacentHTML("beforeend", images);    
}

// ======================== Modal =================================

let modal = document.getElementById('myModal');

function imgModal(img) {
    modal_container.style.display = 'block';
    let url = img.src;
    const DivModal = document.querySelector(".img-container");
    const imgModal = document.createElement("img");
    imgModal.setAttribute("src", url);
    DivModal.appendChild(imgModal);    
}

const modal_container = document.getElementById('modal_container');
const close = document.getElementById('close');

close.addEventListener('click', () => {
    modal_container.style.display = 'none';
});

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
        chevronL.setAttribute('onclick', sliderScrollLeft(event));
        switchLeft.appendChild(chevronL);

        const newDivImg = document.createElement("div");
        newDivImg.classList.add('carouselimg' + i);
        newDivMain.appendChild(newDivImg);

        let switchRight = document.createElement("div");
        switchRight.classList.add("switchRight");
        newDivMain.appendChild(switchRight);
        
        let chevronR = document.createElement("img");
        chevronR.src = "fonts/right.png";
        chevronR.setAttribute('onclick', sliderScrollRight(event));                
        switchRight.appendChild(chevronR);
    }
}






