
// =====================Le Meilleur score================

const promise00 = fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score");
promise00.then(async (responseData) => {
    const response = await responseData.json();

    try {
        const id = response["results"][0]["id"];
        const promise01 = fetch("http://localhost:8000/api/v1/titles/" + id + "");
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

// ==================== Affichage page web =============================================
// Declaration variables

/*
// ======================= Caroussel ===============================
addNew();

function addNew() {
    const DivContainer = document.getElementById("div-containers");
    for (let i = 0; i < 3; i++) {
        const newDiv = document.createElement("div");        
        newDiv.classList.add('container' + i);
        DivContainer.appendChild(newDiv);
    }
}

//addNew();
/*
async function getResponse(url, q_selector) {    
    const promise0 = await fetch(url);
    const response0 = await promise0.json();       
                   
    for (let i = 0; i < 5; i++) {
        try {
            const id = response0["results"][i]["id"];   // id  movies x 5
            // console.log('id :', id);
            
            const promise1 = fetch("http://localhost:8000/api/v1/titles/" + id + ""); // id par movie
            // console.log('promisel: ', promise1);
            promise1.then(async (responseData) => {
                const response = await responseData.json();
                try {
                    const image_url = response["image_url"];
                    console.log('image_url: ', image_url);
                    
                    const display_image_url = document.querySelector(q_selector);
                    console.log('display_img_url: ', display_image_url);
                    const image = `<img src="${image_url}">`;
                    
                    display_image_url.insertAdjacentHTML("afterbegin", image);                    
                } catch (err) {
                    console.log(err);
                }
            })

        } catch (err) {
            console.log(err);
        }
    }
    
}
/*
const Container0 = document.getElementsByClassName("container0");
Container0.innerHTML = getResponse("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score", ".container0");
const Container1 = document.getElementsByClassName("container1");
Container1.innerHTML = getResponse("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Action", ".container1");
const Container2 = document.getElementsByClassName("container2");
Container2.innerHTML = getResponse("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Thriller", ".container2");
/*
class Movie {
    constructor(image_url, title, genres, date_published,
        rated, imdb_score, directors, actors, duration,
        countries, worldwide, description) {
        this.image_url = image_url,
            this.title = title,
            this.genres = genres,
            this.date_published = date_published,
            this.rated = rated,
            this.imdb_score = imdb_score,
            this.directors = directors,
            this.actors = actors,
            this.duration = duration,
            this.countries = countries,
            this.worldwide = worldwide,
            this.description = description
    }
}

/*
async function getResponseNext(url, q_selector) {
    const promise1 = await fetch(url);
    const response1 = await promise1.json();    

    for (let j = 0; j < 5; j++)
        try {
            const id = response1["results"][j]["id"];   // id  movies x 5
            const promise1 = fetch("ht_tp://localhost:8000/api/v1/titles/" + id + ""); // id par movie
            promise1.then(async (responseData) => {
                const response1 = await responseData.json();
                try {
                    const image_url = response1["image_url"];                    
                    const display_image_url = document.querySelector(q_selector + (j + 5));
                    const image = `<img src="${image_url}">`;
                    display_image_url.insertAdjacentHTML("afterbegin", image);
                } catch (err) {
                    console.log(err);
                }
            })
        } catch (err) {
            console.log(err);
        }
}
*/

// getResponse("ht_tp://localhost:8000/api/v1/titles/?sort_by=-imdb_score", "#img_best");


    // for (let k = 0; k < 3; k++) {
    // const para = document.createElement("carousel" + k);
    ////const para = document.createElement("carousel");
    //if (k == 0) {
    ////para.innerHTML = getResponse("ht_tp://localhost:8000/api/v1/titles/?sort_by=-imdb_score", "#img_best");

    //para.innerHTML = getResponseNext("ht_tp://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page=2", "#img_best");
    //}
    /*
        else if (k == 1) {
            para.innerHTML = getResponse("ht_tp://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Action", "#img_action");
            //para.innerHTML = getResponse("ht_tp://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Action&page=2", "#img_action");
        }
        else if (k == 2) {
            para.innerHTML = getResponse("ht_tp://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Thriller", "#img_thriller");
            //para.innerHTML = getResponse("ht_tp://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Thriller&page=2", "#img_thriller");
        }
        */
    //document.getElementById("container").appendChild(para);
    //}



    // ============================================================================================
/*
class Carousel {
    /*
     * @param {HTMLElement} element 
     * @param {Object} options
     * @param {Object} options.slidesToScroll Nombre d'éléments à faire défiler
     * @param {Object} options.slidesVisible Nombre d'élément visibles dans un slide
    */
  /*
    constructor(element, options = {}) {
        this.element = element;
        this.options = Object.assign({}, {
            slidesToScroll: 7,
            slidesVisible: 7
        }, options);
        let children = [].slice.call(element.children);
        this.currentItem = 0;
        //let ratio = this.children.length / this.options.slidesVisible;
        this.root = this.createDivWithClass('.carousel');
        //let root = this.createDivWithClass('carousel');
        //let root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('.carousel__container');
        this.root.appendChild(this.container);
        this.element.appendChild(this.root);
        this.items = children.map((child) => {        
            let item = this.createDivWithClass('.carousel__item');            
            item.appendChild(child);
            this.container.appendChild(item);
            return item;
        })
        this.setStyle();
    }

    /*
     * Apply dim of elts carousel
     */
    /*
    setStyle() {
        let ratio = this.items.length / this.options.slidesVisible;
        this.container.style.width = (ratio * 100) + "%";
        this.items.forEach(item => item.style.width = ((100 / this.options.slidesVisible) / ratio) + "%");
    }

    createNavigation() {
        let nextButton = this.createDivWithClass('carousel__next');
        let previousButton = this.createDivWithClass('carousel__previous');
        this.root.appendChild(nextButton);
        this.root.appendChild(previousButton);
        nextButton.addEventListener('click', this.next.bind(this));
        previousButton.addEventListener('click', this.previous.bind(this));
    }

    next() {
        this.gotoItem(this.currentItem + this.options.slidesToScroll);
    }

    previous() {
        this.gotoItem(this.currentItem - this.options.slidesToScroll);
    }

    /*
     * Scroll slides
     * @param {numbers} index
     */
/*
    gotoItem(index) {
        let translateX = index * -100 / this.items.length;
        this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)';
        this.currentItem = index;
    }

    /*
     * @param {string} className
     * @returns {HTMLElement}
     */
/*
    createDivWithClass(className) {
        let div = document.createElement('div');
        div.setAttribute('class', className);
        return div;
     }
}

document.addEventListener('DOMContentLoaded', function () {

    new Carousel(document.querySelector('#carousel1'), {            // Base #carousel1
        // slidesToScroll: 0,
        // slidesVisible: 0
    })
})

/*
* @param {container0} Modale
* @param {container1} imdb-score
* @param {container2} Action
* @param {container3} Thriller      
*/

// ===================================== Youtube ===========================================

/*
showMovieData()
async function showMovieData() {
    const promise = fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score");
    promise.then(async (responseData) => {
        const response = await responseData.json();

        response.map(function (cur, index) {
            sliders.insertAdjacentHTML(
                "beforeend", `<img class="img-${index} slider-img"
                src="http://url")`
            )
        })
 */


/*
function addNew() {
    
    const DivContainer = document.querySelector(".carouselbox");
    for (let i = 0; i < 3; i++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add('container' + i);
        DivContainer.appendChild(newDiv);
        for (let j = 0; j < 5; j++) {
            const newdiv = document.createElement("div");
            newdiv.classList.add('imag' + j);
            newDiv.appendChild(newdiv);
        }
    }
}
*/

addNew();
function addNew() {
    //let chevronL = "\<";
    
    const DivContainer = document.querySelector(".carousel");
    for (let i = 0; i < 3; i++) {        
        // carouselbox
        const newDivMain = document.createElement("div");        
        DivContainer.appendChild(newDivMain);        
        newDivMain.classList.add('carouselbox' + i);

        let switchLeft = document.createElement("div");
        switchLeft.classList.add("switchLeft");
        newDivMain.appendChild(switchLeft);

        let chevronL = document.createElement("img");
        chevronL.src = "fonts/left_blue.png";
        switchLeft.appendChild(chevronL);

        const newDivImg = document.createElement("div");
        newDivImg.classList.add('carouselimg' + i);
        
        newDivMain.appendChild(newDivImg);
        
        let switchRight = document.createElement("div");
        switchRight.classList.add("switchRight");
        newDivMain.appendChild(switchRight);

        let chevronR = document.createElement("img");
        chevronR.src = "fonts/right_blue.png";
        switchRight.appendChild(chevronR);
    }     
}

//const sliders = document.querySelector(".carouselbox");
var scrollPerClick;
var ImagePaddin = 20;
let imgStock = [];

async function getResponse(url, q_selector) {
    const promise1 = await fetch(url);
    const response1 = await promise1.json();

    for (let j = 0; j < 5; j++)
        try {
            
            const url = response1["results"][j]["image_url"];   // id  movies x 5
            console.log('url: ', url);                           

            try {                
                imgStock.push(url);
                const display_image_url = document.querySelector(q_selector);
                                     
                const image = `<img src = "${url}">`;                

                display_image_url.insertAdjacentHTML("beforeend", image);
                
            } catch (err) {
                console.log(err);
            }

        } catch (err) {
            console.log(err);
        }
}     

const Container0 = document.getElementsByClassName(".carouselbox0");
Container0.innerHTML = getResponse("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score", ".carouselimg0");
Container0.innerHTML = getResponse("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page=2", ".carouselimg0");

const Container1 = document.getElementsByClassName(".carouselbox1");
Container1.innerHTML = getResponse("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Action", ".carouselimg1");
Container1.innerHTML = getResponse("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Action&page=2", ".carouselimg1");

const Container2 = document.getElementsByClassName(".carouselbox2");
Container2.innerHTML = getResponse("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Animation", ".carouselimg2");
Container2.innerHTML = getResponse("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Animation&page=2", ".carouselimg2");
