// ===================== Init datas =====================
let Url = "http://localhost:8000/api/v1/titles/";
let param1 = '?sort_by=-imdb_score';
let param2 = '&page=2';
let paramCat = ['', '&genre=Action', '&genre=Animation', '&genre=Adventure'];
let scrollPerClick;

// imgTab = [];
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

displayAllCarousels();

// =========================================================================================
let promise = [];
let response = [];
let imgUrl = [];
let nbSlides = 4;
let nbUrls = 10;
let step = 1;       // Pas:  decalage de 1
let speed = 10;     // Vitesse decalage
let distance = 1200;
let direction = "";
let sliderStock = [imgTab0, imgTab1, imgTab2, imgTab3]; // Array of Array for row imgTab 0,1,2,3
let Pos = [0, 0, 0, 0];

// Slider Containers Creation
for (let i = 0; i < 4; i++) {
    createContainers(i);
}

async function getResponse(url1, url2, i, z) {                        // i = selector,  z = next / previous    
                                                                      
    async function displayUrl(url) {
        const promise = await fetch(url);
        const response = await promise.json();
        for (let j = 0; j < 5; j++) {                                  // 5 x movies / pages
            try {
                //const imgUrl = response["results"][j]["image_url"];    // url image x 5 x 2    (url1, url2)                
                const movieUrl = response["results"][j]["url"];        // url film  x 5 x 2     (url1, url2)
                
                moviedata = await getDataMovie(movieUrl);                
                
                //if (z == 0) {
                    
                    try {
                        sliderStock[i].push(moviedata["image_url"]);
                    } catch (err) { console.log(err); }
                //}                
            } catch (err) {
                console.log(err);
            }
        }
    }
    await displayUrl(url1);    
    await displayUrl(url2);
    
    if (z == 0) {
        for (let j = 0; j < nbSlides; j++) {            // [i] tab[10 movie] [j] movie[j] (0 ou 1...);
            displayImgArrays(i, sliderStock[i][j]);     //  (i, sliderStock[i][j], step_switches +-) i=row j=nbSlides, step+- = step)
            console.log("Pos[i]", Pos[i], 'j', j);
        }
    }
    // ==================== Arrows ========================
    else {
        let carouselContainer = document.getElementsByClassName('carouselimg' + i)[0];        
        carouselContainer.textContent = '';
        
        for (let j = Pos[i]; j < nbSlides + Pos[i]; j++) {
            console.log('Pos[i]:', Pos[i]);
            console.log('j:', j);
            if (direction === 'right') {
                if (j <= 0) {   // (j <= 0)
                    j = j - nbSlides;
                }
            }
            else if (Pos[i] < 0) {            
                Pos[i] += nbUrls;                    
                j = Pos[i];
                console.log('j:', j);
                console.log('Pos[i]:', Pos[i]);
            }            
            displayImgArrays(i, sliderStock[i][j % 10]);
        }               
    }
    // ======================================================
}



// Affichage DOM et appel Modale
async function displayImgArrays(selector, url) {
    // selector = i ==>.carouselimg i            
    displayUrlArray = document.querySelector('.carouselimg' + selector);
    const images = `<img src = "${url}" id = "${selector}" onclick="imgModal(this)">`;    
    displayUrlArray.insertAdjacentHTML("beforeend", images);
}

function displayAllCarousels() {                
    let Container = [];
    let z = 0;
    for (let i = 0; i < 4; i++) {               // i = row
        Container.push('Container' + i);
        Container[i] = document.getElementsByClassName(".carouselimg" + i);
        Container[i].innerHTML = getResponse(Url + param1 + paramCat[i], Url + param1 + paramCat[i] + param2, i, z);
    }
}

function displayOneCarousel(i, z) {             // z: direction "left" ou "right" ('L' / 'R')   
    let Container = [];
    Container.push('Container' + i);
    Container[i] = document.getElementsByClassName(".carouselimg" + i);
    Container[i].innerHTML = getResponse(Url + param1 + paramCat[i], Url + param1 + paramCat[i] + param2, i, z);
}

// ======================== Modal =================================

let modal = document.getElementById('myModal');

function imgModal(img, url) {
    modal_container.style.display = 'block';
    // IMG
    url = img.src;
    const DivModalImg = document.querySelector(".img-container");
    const imgModal = document.createElement("img");
    imgModal.setAttribute("src", url);
    DivModalImg.appendChild(imgModal);

   // Movie Datas
    const DivMovieDatas = document.querySelector(".description");
    let ul = document.createElement('ul');

    DivMovieDatas.appendChild(ul);    

    for (let i = 0; i < moviedata.length; i++) {
        let li = document.createElement('li');
        ul.appendChild(li);
        li.innerHTML = li.innerHTML + moviedata[i];
    }
}

const close = document.getElementById('close');
close.addEventListener('click', () => {
    modal_container.style.display = 'none';
});

//====================== Création de 4 sliders vides ========================

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
        direction = 'left';
        displayOneCarousel(str[4], str[3]);        
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
        let str = e.target.id;
        Pos[i] += 1;                                // imgL1
        direction = 'right';
        displayOneCarousel(str[4], str[3]);        
    });
    chevronR.appendChild(img);
    newDivMain.appendChild(chevronR);   
}


    









