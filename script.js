// ===================== Init datas =====================
let Url = "http://localhost:8000/api/v1/titles/";
let param1 = '?sort_by=-imdb_score';
let param2 = '&page=2';
let paramCat = ['', '&genre=Action', '&genre=Animation', '&genre=Adventure'];

let promise = [];
let response = [];

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
                    const description = response["description"];

                    const display_image_url = document.querySelector("#img_jacket");
                    const display_title = document.querySelector("#title");                    
                    const display_description = document.querySelector("#description");

                    display_title.innerHTML = title;                    
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

// ============ Création classe datas films =============

class MovieAllDatas {
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

async function getAllMovieData(url) {
    const promise1 = await fetch(url);
    const response1 = await promise1.json();
    
    const movieAllDatas = new MovieAllDatas(response1["id"], response1["url"],
        response1["title"], response1["image_url"], response1["genres"],
        response1["date_published"], response1["rated"], response1["imdb_score"],
        response1["directors"], response1["actors"], response1["duration"],
        response1["countries"], response1["worldwide_gross_income"],
        response1["description"]);

    return movieAllDatas;
}

class MovieDatas {
    constructor(id, url) {
        this.id = id;
        this.url = url;
    }
}

async function getMovieData(url) {    
    const promise1 = await fetch(url);
    const response1 = await promise1.json();
    const movieData = new MovieDatas(response1["id"], response1["image_url"]);
    return movieData;
}

// ======================== Promise & display Carousel ============================

// Variables
let nbImgUrl = 7;
let nbPages = Math.floor(nbImgUrl / 5) + 1;
let nbSlides = 4;

let Pos = [0, 0, 0, 0];       // origin cursors = 0
let temp = [];
let movieData = [[], [], [], []];
let movieDataTest = [[], [], [], []];
let nextUrl = '';
let url = '';

async function getResponse(url, i, nbImgUrl) {           // 4 x 
    await getUrls(url, i, nbImgUrl);
    let carouselContainer = document.getElementsByClassName('carouselimg' + i)[0];
    carouselContainer.textContent = '';
}

async function generateData() {
    for (let i = 0; i < 4; i++) {        
        await getResponse(Url + param1 + paramCat[i], i, nbImgUrl); // Url + sort + category
    }
}


 // Affichage Images dans index.html
function displayImgArrays(i, movieData, j = 0) {
    displayUrlArray = document.querySelector('.carouselimg' + i);
    const images = `<img src = "${movieData[i][j]['url']}" id = "${i}" onclick="displayDataModal(this, movieData, ${i}, ${j})">`;
    //const images = `<img src = "${movieData[i][j]['url']}" id = "${i}" onclick="displayDataModal(this, "${movieData[i][j]['id']}")">`;
    displayUrlArray.insertAdjacentHTML("beforeend", images);
}


// Création du container d'urls correspondant au nombre de jaquettes disponibles (prédéfinies avec nbImgUrl)
async function getUrls(url, i, nbImgUrl) {        
    
    for (let k = 0; k < nbPages; k++) {
        let promise = await fetch(url);        
        let response = await promise.json();
        url = response["next"];

        for (let j = 0; j < 5; j++) {                   // 5 x movies / pages
            try {
                const movieUrl = response["results"][j]["url"];
                temp = await getMovieData(movieUrl);

                movieData[i].push(temp);
                if (movieData[i].length >= nbImgUrl)
                    break;
            } catch (err) { console.log(err); }
        }
    }
}

// Défilement arrows
function displayPanoramaAnim(i, nbSlides, nbImgUrl, url, movieData) {
    let carouselContainer = document.getElementsByClassName('carouselimg' + i)[0];
    carouselContainer.textContent = '';
    for (let j = Pos[i]; j < nbSlides + Pos[i]; j++) {
        if (Pos[i] >= 0) {
            displayImgArrays(i, movieData, j % nbImgUrl);
            // console.log('Pos[i]:', Pos[i], 'i:', i, 'j:', j);
        }
        else {
            Pos[i] = Pos[i] + nbImgUrl;
            j = Pos[i] -1;
        }    
    }
}

Promise.all([generateData()]).then (() => { 
    for (let i = 0; i < 4; i++) {        
        displayPanoramaAnim(i, nbSlides, nbImgUrl, url, movieData);                
    }
})

// =============================== Affichage carrousel ==============================

// Slider Containers Creation
for (let i = 0; i < 4; i++) {
    createContainers(i);
}

// ===================================== Modal =======================================

let modal = document.getElementById('modal');
let modalData = [];
async function displayDataModal(img, movieData, i, j) {    
//async function displayDataModal(img, movieDataId) {    
    modal.style.display = 'block';
    // IMG
    //console.log('moviedataUrlId', Url + movieData[i][j]["id"]);
    const modalUrl = Url + movieData[i][j]["id"];
    //const modalUrl = Url + movieDataId;    
    let promise = await fetch(modalUrl);
    let response = await promise.json();
    
    
    // DOM Image
    movieData = img.src;
    const DivModalImg = document.querySelector(".modal-container__imgContainer");
    DivModalImg.textContent = '';                                   // Efface l'image précédente
    const imgModal = document.createElement("img");
    imgModal.setAttribute("src", movieData);
    DivModalImg.appendChild(imgModal);

    // DOM Générique

    const title = response['title'];    
    const display_title = document.getElementById("modal_title");
    console.log('display_title:', display_title);
    display_title.innerHTML = title;
    
    const genre = response['genres'];
    const display_genres = document.getElementById("genres");
    display_genres.innerHTML = 'Genre: ' + genre;

    const date = response['date_published'];
    const display_date = document.getElementById("date");
    display_date.innerHTML = 'Date de publication: ' + date;

    const rate = response['rated'];
    const display_rate = document.getElementById("rated");
    display_rate.innerHTML = 'Rated: ' + rate;

    const score = response['imbd_score'];
    const display_score = document.getElementById("score");
    display_score.innerHTML = 'Imbd Score: ' + score;

    const realisateur = response['directors'];
    const display_realisateur = document.getElementById("realisateur");
    display_realisateur.innerHTML = 'R\u00e9alisateur: ' + realisateur;

    const actors = response['actors'];
    const display_actors = document.getElementById("acteurs");
    display_actors.innerHTML = 'Distribution: ' + actors;

    const duration = response['duration'];
    const display_duration = document.getElementById("duration");
    display_duration.innerHTML = 'Dur\u00e9e: ' + duration;

    const countries = response['countries'];
    const display_countries = document.getElementById("countries");
    display_countries.innerHTML = 'Pays d\'origine: ' + countries;

    const boxOffice = response['worldwide_gross_income'];
    const display_boxOffice = document.getElementById("boxOffice");
    display_boxOffice.innerHTML = 'R\u00e9sultat du box office: ' + boxOffice;

    const resume = response['description'];
    const display_resume = document.getElementById("resume");
    display_resume.innerHTML = 'R\u00e9sum\u00e9 du film: ' + resume;

    const Close = document.querySelector('Close');   
}
const modal_container = document.querySelector(".modal-container")
Close.addEventListener('click', () => {
    modal_container.style.display = 'none';
});

//====================== Création Page HTML/DOM ========================

function createContainers(i) {
    const DivContainer = document.querySelector(".carousel");
    
    const newDivMain = document.createElement("div");
    DivContainer.appendChild(newDivMain);
    newDivMain.classList.add('carouselbox' + i);
    
    let chevronL = document.createElement("div");    
    img = document.createElement('img');
    img.setAttribute("id", "imgL" + i);
    img.setAttribute("src", "fonts/left.png");

    img.addEventListener("click", function (e) {        // exemple (e.target = <img id="imgL1" src="fonts/left.png">)
        let str = e.target.id;
        Pos[i] -= 1;                                // imgL1         
        displayPanoramaAnim(i, nbSlides, nbImgUrl, url, movieData);        
    });
    
    chevronL.appendChild(img);        
    newDivMain.appendChild(chevronL);

    const newDivImg = document.createElement("div");
    newDivImg.classList.add('carouselimg' + i);
    newDivMain.appendChild(newDivImg);
    
    let chevronR = document.createElement("div");    
    img = document.createElement('img');
    img.setAttribute("id", "imgR" + i);
    img.setAttribute("src", "fonts/right.png");

    img.addEventListener("click", function (e) {        // exemple (e.target = <img id="imgR1" src="fonts/right.png">)        
        let str = e.target.id;      // imgR1       R='right' i = 1(str[4])        
        Pos[i] += 1;        
        displayPanoramaAnim(i, nbSlides, nbImgUrl, url, movieData);
    });

    chevronR.appendChild(img);
    newDivMain.appendChild(chevronR);   
}