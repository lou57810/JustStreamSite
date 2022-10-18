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
let nbImgUrl = 6;
let nbPages = Math.floor(nbImgUrl / 5) + 1;

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
    displayUrlArray.insertAdjacentHTML("beforeend", images);
}

let urlPages = [[], [], [], []];
// Création du container d'urls correspondant au nombre de jaquettes disponibles (prédéfinies avec nbImgUrl)
async function getUrls(url, i, nbImgUrl) {
    let nbPages = Math.floor(nbImgUrl / 5) + 1;
    async function next(url, i) {
        const promise = await fetch(url);
        const response = await promise.json();            // url0
        
        nextUrl = response["next"];        
        return nextUrl;
    }
    urlPages[i].push(url);
    for (let j = 0; j < nbPages; j++) {
        url = await next(url, i);
        urlPages[i].push(url);
    }    
    // nbPages
    for (let k = 0; k < nbPages; k++) {
        let promise = await fetch(urlPages[i][k]);
        let response = await promise.json();
        if (k < nbPages - 1) {

            for (let j = 0; j < 5; j++) {                   // 5 x movies / pages
                try {
                    const movieUrl = response["results"][j]["url"];
                    temp = await getMovieData(movieUrl);

                    movieData[i].push(temp);                                        
                } catch (err) { console.log(err); }
            }
        }
        else {
            for (let j = 0; j < nbImgUrl % 5; j++) {                   // 5 x movies / pages
                try {
                    const movieUrl = response["results"][j]["url"];
                    temp = await getMovieData(movieUrl);

                    movieData[i].push(temp);                                        
                } catch (err) { console.log(err); }
            }
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
        }
    }
}

Promise.all([generateData()]).then (() => { 
    for (let i = 0; i < 4; i++) {        
        displayPanoramaAnim(i, 4, nbImgUrl, url, movieData);        
    }
})

// =============================== Affichage carrousel ==============================

// Slider Containers Creation
for (let i = 0; i < 4; i++) {
    createContainers(i);
}

// ===================================== Modal =======================================

let modal = document.getElementById('myModal');
let modalData = [];
async function displayDataModal(img, movieData, i, j) {    
    modal_container.style.display = 'block';
    // IMG
    console.log('moviedataUrlId', Url + movieData[i][j]["id"]);
    const modalUrl = Url + movieData[i][j]["id"];
    
    let promise = await fetch(modalUrl);
    let response = await promise.json();
    
    
    // DOM Image
    movieData = img.src;
    const DivModalImg = document.querySelector(".img-container");
    DivModalImg.textContent = '';                                   // Efface l'image précédente
    const imgModal = document.createElement("img");
    imgModal.setAttribute("src", movieData);
    DivModalImg.appendChild(imgModal);

    // DOM Générique    
    const DivMovieDatas = document.querySelector(".generique");
    DivMovieDatas.textContent = '';

    let ul0 = document.createElement('ul');
    ul0.innerHTML = 'Titre';    
    let li0 = document.createElement('li');
    li0.innerHTML = response['title'];
    ul0.appendChild(li0);
    DivMovieDatas.appendChild(ul0);

    let ul1 = document.createElement('ul');
    ul1.innerHTML = 'Genre:';
    let li1 = document.createElement('li');
    li1.innerHTML = response['genres'];
    ul1.appendChild(li1);
    DivMovieDatas.appendChild(ul1);

    let ul2 = document.createElement('ul');
    ul2.innerHTML = 'Date de sortie:';
    let li2 = document.createElement('li');
    li2.innerHTML = response['date_published'];
    ul2.appendChild(li2);
    DivMovieDatas.appendChild(ul2);

    let ul3 = document.createElement('ul');
    ul3.innerHTML = 'Rated:';
    let li3 = document.createElement('li');
    li3.innerHTML = response['rated'];
    ul3.appendChild(li3);
    DivMovieDatas.appendChild(ul3);

    let ul4 = document.createElement('ul');
    ul4.innerHTML = 'Score Imbd:';
    let li4 = document.createElement('li');
    li4.innerHTML = response['imbd_score'];
    ul4.appendChild(li4);
    DivMovieDatas.appendChild(ul4);

    let ul5 = document.createElement('ul');
    ul5.innerHTML = 'Realisateur:';
    let li5 = document.createElement('li');
    li5.innerHTML = response['directors'];
    ul5.appendChild(li5);
    DivMovieDatas.appendChild(ul5);

    let ul6 = document.createElement('ul');
    ul6.innerHTML = 'Distribution:';
    let li6 = document.createElement('li');
    li6.innerHTML = response['actors'];
    ul6.appendChild(li6);
    DivMovieDatas.appendChild(ul6);

    let ul7 = document.createElement('ul');
    ul7.innerHTML = 'Duree:';
    let li7 = document.createElement('li');
    li7.innerHTML = response['duration'];
    ul7.appendChild(li7);
    DivMovieDatas.appendChild(ul7);

    let ul8 = document.createElement('ul');
    ul8.innerHTML = 'Pays d\'origine:';
    let li8 = document.createElement('li');
    li8.innerHTML = response['countries'];
    ul8.appendChild(li8);
    DivMovieDatas.appendChild(ul8);

    let ul9 = document.createElement('ul');
    ul9.innerHTML = 'Resultat Box Office:';
    let li9 = document.createElement('li');
    li9.innerHTML = response['worldwide_gross_income'];
    ul8.appendChild(li9);
    DivMovieDatas.appendChild(ul9);

    let ul10 = document.createElement('ul');
    ul10.innerHTML = 'Resume du film:';
    let li10 = document.createElement('li');
    li10.innerHTML = response['description'];
    ul10.appendChild(li10);
    DivMovieDatas.appendChild(ul10);

    // DOM Close Button
    const Close = document.querySelector('Close');   
}

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
        displayPanoramaAnim(i, 4, nbImgUrl, url, movieData);        // 4->nbSlides displayed
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
        //console.log('J:', j);
        //displayImgArrays(i, movieData)
        displayPanoramaAnim(i, 4, nbImgUrl, url, movieData);
    });

    chevronR.appendChild(img);
    newDivMain.appendChild(chevronR);   
}