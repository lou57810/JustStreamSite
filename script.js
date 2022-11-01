// ===================== Init datas =====================
let Url = "http://localhost:8000/api/v1/titles/";
let param1 = '?sort_by=-imdb_score';
// let param2 = '&page=2';
let paramCat = ['', '&genre=Action', '&genre=Animation', '&genre=Adventure'];

// ===================== Manchette meilleur score ====================
    const promise00 = fetch(Url + param1);          // tri meilleur score
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


class MovieDatas {
    constructor(id, url, genres) {
        this.id = id;
        this.url = url;
        this.genres = genres;
    }
}

async function getMovieData(url) {    
    const promise1 = await fetch(url);
    const response1 = await promise1.json();
    const movieData = new MovieDatas(response1["id"], response1["image_url"], response1["genres"]);
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

async function generateData() {
    for (let i = 0; i < 4; i++) {
        await getResponse(Url + param1 + paramCat[i], i, nbImgUrl); // Url + sort + category
    }
}

Promise.all([generateData()]).then (() => { 
    for (let i = 0; i < 4; i++) {        
        displayPanoramaAnim(i, nbSlides, nbImgUrl, url, movieData);                
    }
})


//====================== Création Page HTML/DOM Caroussel ========================

function createContainers(i) {
    let movieTab = ['Films les mieux not\u00e9s', 'Action', 'Animation', 'Aventure'];
    const DivContainer = document.querySelector(".carousel");

    const newDivMain = document.createElement("div");
    const rowId = document.createElement("div");
    DivContainer.appendChild(rowId);
    DivContainer.appendChild(newDivMain);
    rowId.classList.add('rowId' + i);
    newDivMain.classList.add('carouselbox' + i);
    rowId.innerHTML = movieTab[i];

    let chevronL = document.createElement("div");
    img = document.createElement('img');
    img.setAttribute("id", "imgL" + i);
    img.setAttribute("src", "img/left.png");

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
    img.setAttribute("src", "img/right.png");

    img.addEventListener("click", function (e) {        // exemple (e.target = <img id="imgR1" src="fonts/right.png">)        
        let str = e.target.id;                          // imgR1       R='right' i = 1(str[4])        
        Pos[i] += 1;
        displayPanoramaAnim(i, nbSlides, nbImgUrl, url, movieData);
    });

    chevronR.appendChild(img);
    newDivMain.appendChild(chevronR);
}

// Slider Containers Creation
for (let i = 0; i < 4; i++) {
    createContainers(i);
}

// ===================================== Modal =======================================

let modal = document.getElementById('modal');
let modalData = [];

async function displayDataModal(img, movieData, i, j) {    
    
    modal.style.display = 'block';
    // IMG
         
    const modalUrl = Url + movieData[i][j]["id"]; //(exemple: http://localhost:8000/api/v1/titles/9008642)        
    let promise = await fetch(modalUrl);
    let response = await promise.json();    /* (exemple: {"id": 1508669,
     * "url": "http://localhost:8000/api/v1/titles/1508669", title: "Hopeful Notes"...)
     * */

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
    const display_genres = document.getElementById("genre");
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
}

const modal_container = document.querySelector(".modal-container")
Close.addEventListener('click', () => {
    modal_container.style.display = 'none';
});

