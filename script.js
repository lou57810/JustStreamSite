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

                console.log(image_url);
                console.log(title);
                console.log(genres);
                console.log(date_published);
                console.log(rated);
                console.log(Number(imdb_score));
                console.log(directors);
                console.log(actors0);
                console.log(actors1);
                console.log(actors2);
                console.log(duration);
                console.log(countries);
                console.log(worldwide_gross_income);
                console.log(description);

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

function display_datas(response) {
    // select DOM elt
    const eltPos = document.querySelector(".modalContainer");
    console.log('eltPos', eltPos);
}
display_datas()


// ==================== 7 meilleurs scores page1 page2 =================================



async function getResponse(url, q_selector) {    
    const promise0 = await fetch(url);
    const response0 = await promise0.json();        
    
    for (let i = 0; i < 5; i++)
        try {
            const id = response0["results"][i]["id"];   // id  movies x 5
            const promise0 = fetch("http://localhost:8000/api/v1/titles/" + id + ""); // id par movie
            promise0.then(async (responseData) => {
                const response0 = await responseData.json();
                try {
                    const image_url = response0["image_url"];
                    const display_image_url = document.querySelector(q_selector + i);
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

async function getResponseNext(url, q_selector) {
    const promise1 = await fetch(url);
    const response1 = await promise1.json();    

    for (let j = 0; j < 5; j++)
        try {
            const id = response1["results"][j]["id"];   // id  movies x 5
            const promise1 = fetch("http://localhost:8000/api/v1/titles/" + id + ""); // id par movie
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



for (let k = 0; k < 3; k++) {
    const para = document.createElement("carousel" + k);
    if (k == 0) {
        para.innerHTML = getResponse("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score", "#img_best");
        para.innerHTML = getResponseNext("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page=2", "#img_best");
    }
    else if (k == 1) {
        para.innerHTML = getResponse("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Action", "#img_action");
        para.innerHTML = getResponse("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Action&page=2", "#img_action");
    }
    else if (k == 2) {
        para.innerHTML = getResponse("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Thriller", "#img_thriller");
        para.innerHTML = getResponse("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Thriller&page=2", "#img_thriller");
    }
    // document.getElementById("container").appendChild(para);
}



// ============================================================================================

/*
class Carousel {
    /*
     * @param (HTMLElement) element 
     * @param (Object) options
     * @param (Object) options.slidesToScroll Nombre d'éléments à faire défiler
     * @param (Object) options.slidesVisible Nombre d'élément visibles dans un slide
    */
/*
    constructor(element, options = {}) {
        this.element = element;
        this.options = Object.assign({}, {
            slidesToScroll: 10,
            slidesVisible: 6
        }, options);
        this.children = [].slice.call(element.children);
        let root = this.createDivWithClass('carousel');
        let container = this.createDivWithClass('carousel__tanker');
        root.appendChild(container);
        this.element.appendChild(root);
        this.children.forEach((child) => {
            let item = this.createDivWithClass('carousel__item')
            item.appendChild(child)
            container.appendChild(item)
        })

        /*
         * @param (string) className
         * @returns (HTMLElement)
         */

/*
        function createDivWithClass(className) {
            let div = documenet.createElement('div');
            div.setAttribute('class', className);
            return div;
        }
}


document.addEventListener('DOMContentLoaded', function () {



    new Carousel(document.querySelector('#carousel1'), {
        slidesToScroll: 7,
        slidesVisible: 7
    })
})

*/