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

async function getAllDataMovie(url) {
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
let nbImgUrl = 24;
let Pos = [0, 0, 0, 0];       // origin cursors = 0
let temp = [];
let movieData = [[], [], [], []];
let movieDataTest = [[], [], [], []];
let nextUrl = '';
let url = '';

async function getResponse(url, i, nbImgUrl) {            // 4 x  
    await displayUrl(url, i, nbImgUrl);                   // 20 resultats
    //await displayPages(url, i, nbImgUrl);
    let carouselContainer = document.getElementsByClassName('carouselimg' + i)[0];
    carouselContainer.textContent = '';
}

async function generateData() {
    for (let i = 0; i < 4; i++) {
        // displayOneCarousel(i, nbImgUrl);
        await getResponse(Url + param1 + paramCat[i], i, nbImgUrl); // Url + sort + catégory
    }
}

function displayImgArrays(i, movieData, j = 0) {
    //console.log('movieDataDisplay:', i, j, movieData[i][j]['url']);

    displayUrlArray = document.querySelector('.carouselimg' + i);
    const images = `<img src = "${movieData[i][j]['url']}" id = "${i}" onclick="displayDatasModal(this)">`;
    displayUrlArray.insertAdjacentHTML("beforeend", images);
}

function displayPanoramaAnim(i, nbSlides, nbImgUrl, url, movieData) {
    for (let j = Pos[i]; j < nbSlides + Pos[i]; j++) {
        if (Pos[i] >= 0) {
            displayImgArrays(i, movieData, j % nbImgUrl);
        }
        /*
        if (j >= 5) {
            console.log('next:', nextUrl);
            displayUrl(nextUrl, i, nbImgUrl);
        } */
    }
    //else {
    //Pos[i] = Pos[i] + nbImgUrl;
    //j = Pos[i];
    //displayImgArrays(i, dataUrls, Pos[i]);
    //console.log('Pos[i]:', Pos[i]);
    //}
}

Promise.all([generateData()]).then (() => { 
    for (let i = 0; i < 4; i++) {
        displayPanoramaAnim(i, 4, nbImgUrl, url, movieData);
    }
})


// (nbImgUrl % 5 = 2)
// console.log('divEntiere:', Math.floor(nbImgUrl / 5));
/*
async function displayPages(url, i, nbImgUrl) {
    
    let nbPages = Math.floor(nbImgUrl / 5);
    let reste = nbImgUrl % 5;
    
    for (let k = 0; k < nbPages; k++) {
        //let ('nextUrl') + i;
        const promise0 = await fetch(url);
        const response0 = await promise0.json();
        ('nextUrl') + k == response0[('nextUrl') + k];
        console.log('nextUrl' + k, response["next"]);
        const promise1 = await fetch(('nextUrl') + k);
        const response1 = await promise1.json();
        
        for (let j = 0; j < 5; j++) {                   // 5 x movies / pages
            try {
                const movieUrl = response1["results"][j][('nextUrl') + k];
                temp = await getMovieData(movieUrl);

                movieDataTest[i].push(temp);

                /*try {
                    dataUrls[i].push(Object.values(moviedata[i]));
                    
                } catch (err) { console.log(err); }
             */
/*
            } catch (err) { console.log(err); }
        }
    }
}
console.log('movieDataTest', movieDataTest);
//displayPages(url, nbImgUrl);
*/
// ==================================== Promises =============================================

async function displayUrl(url, i, nbImgUrl) {  // called 4x    
    
    const promise = await fetch(url);
    const response = await promise.json();              // url
   // nextUrl = response["next"];                       // url next
    // boucle globale
        for (let j = 0; j < 5; j++) {                   // 5 x movies / pages
            try {
                const movieUrl = response["results"][j]["url"];
                temp = await getMovieData(movieUrl);

                movieData[i].push(temp);

                /*try {
                    dataUrls[i].push(Object.values(moviedata[i]));
                    
                } catch (err) { console.log(err); }
                */
            } catch (err) { console.log(err); }
        }
        // object id:, url:, title:, img_url: ...)

        //console.log('movieData0:', movieData[i]);               // 4x movieData[0];
        // Condition de sortie
}


// =============================== Affichage carrousel ==============================

// Slider Containers Creation
for (let i = 0; i < 4; i++) {
    createContainers(i);
}

// ======================== Modal =================================

let modal = document.getElementById('myModal');

function displayDatasModal(img, movieData) {//, url) {
    //console.log('url:', dataUrls);
    modal_container.style.display = 'block';
    // IMG
    dataUrls = img.src;    
    const DivModalImg = document.querySelector(".img-container");
    const imgModal = document.createElement("img");
    imgModal.setAttribute("src", movieData);
    DivModalImg.appendChild(imgModal);
}

function displayDatasModalTest(url) {
    // Movie Datas
    /*moviedata = getDataMovie(url);
    console.log('moviedata: ', moviedata);
    const DivMovieDatas = document.querySelector(".description");
    let ul = document.createElement('ul');

    DivMovieDatas.appendChild(ul);

    for (let i = 0; i < moviedata.length; i++) {
        let li = document.createElement('li');
        ul.appendChild(li);
        li.innerHTML = li.innerHTML + moviedata[i];
    }
    */
}

const close = document.getElementById('close');
close.addEventListener('click', () => {
    modal_container.style.display = 'none';
    imgModal = "";
    
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
        //displayOneCarousel(str[4]);        
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

    img.addEventListener("click", function (e) {        // exemple (e.target = <img id="imgL1" src="fonts/left.png">)        
        let str = e.target.id;      // imgL1       L='left' i = 1(str[4])        
        Pos[i] += 1;        
        //displayOneCarousel(str[4]);                
    });

    chevronR.appendChild(img);
    newDivMain.appendChild(chevronR);   
}