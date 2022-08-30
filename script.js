/*
class Movie {
    constructor(image_url, title, gender, date_published, rated,
        imbd_score, directors, actors, duration,
        countries, worldwide_gross_income, description) {        
        this.title = title;
        this.gender = gender;
        this.date_published = date_published;
        this.rated = rated;
        this.imbd_score = imbd_score;
        this.directors = directors;
        this.actors = actors;
        this.duration = duration;
        this.countries = countries;
        this.worldwide_gross_income = worldwide_gross_income;
        this.description = description;
    }
}

let movie1 = new Movie('image_url', 'bla', 'bla', 40, 20, 30, 'bla', 'bla', 60, 'bla', 200, 'bla');
// document.querySelector("movie_info").display_image_url =
//    `insertAdjacentHTML("afterbegin", "${image_url}"}`;
// display_image_url.insertAdjacentHTML("afterbegin", image);
document.querySelector("#movie1_info").innerText =
`${ image_url }
Title: ${movie1.title }
Genre: ${movie1.gender} minutes
Date: ${ movie1.date_published }
Taux: ${ movie1.rated }
IMBD: ${ movie1.imbd_score }
Realisateur: ${ movie1.directors }
Acteurs: ${ movie1.actors }
Duree: ${ movie1.duration }
Pays: ${ movie1.countries }
BoxOffice: ${ movie1.worldwide_gross_income }
Description: ${ movie1.description }`;








// =============================================================================

// const log = console.log;
function byScore(a, b) {
    if (a.imdb_score > b.imdb_score) {
        return 1;
    } else if (b.imdb_score > a.imdb_score) {
        return -1;
    } else {
        return 0;
    }     
}
let page = '1'
let index = 0

const orderImdbPromise = fetch("ttp://localhost:8000/api/v1/titles/?page="+page+"")
orderImdbPromise.then(async (responseData) => {    
    const response = await responseData.json();    
    data = [response["results"][index]["id"], response["results"][index]["imdb_score"]]
    console.log('data: ', data);        
    }
)
*/
// Le Meilleur score===============================================================





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

// ================================ 7 meilleurs scores =================================


async function getResponse(url, q_selector) {
    const promise = await fetch(url);

    const response = await promise.json();
    console.log('reponse inter', response);
    //var pathname = new URL(url).pathname;
    //console.log(pathname);
    //if (url == pathname + -imbd_score )

    //else
    for (let i = 0; i < 5; i++)
        try {
            const id = response["results"][i]["id"];
            const promise01 = fetch("http://localhost:8000/api/v1/titles/" + id + "");
            promise01.then(async (responseData) => {
                const response = await responseData.json();
                console.log('7Movies', response);

                try {
                    const image_url = response["image_url"];
                    console.log(image_url);

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

getResponse("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score", "#img_best")
getResponse("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Action", "#img_action")
getResponse("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Thriller", "#img_thriller")



/*const promise02 = fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score");

promise02.then(async (responseData) => {
    const response = await responseData.json();
    console.log('reponse inter', response);
    for (let i = 0; i < 5; i++)
        try {
            const id = response["results"][i]["id"];
            const promise03 = fetch("http://localhost:8000/api/v1/titles/" + id + "");
            promise03.then(async (responseData) => {
                const response = await responseData.json();
                console.log('7Movies', response);

                try {
                    const image_url = response["image_url"];
                    console.log(image_url);

                    const display_image_url = document.querySelector("#img_best"+[i]+"");

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
 */
// ======================= 7 meilleurs Actions ==================================================

//const promise04 = fetch("ttp://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Action");

    /*


promise04.then(async (responseData) => {
    const response = await responseData.json();
    console.log('reponse inter', response);
    for (let i = 0; i < 5; i++)        
    try {
        const id = response["results"][i]["id"];
        const promise05 = fetch("ttp://localhost:8000/api/v1/titles/" + id + "");
        promise05.then(async (responseData) => {
            const response = await responseData.json();
            console.log('7Movies', response);

            try {
                const image_url = response["image_url"];
                console.log(image_url);

                const display_image_url = document.querySelector("#img_action"+[i]+"");

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

const promise06 = fetch("ttp://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Thriller");

// ========================= 7 meilleurs thriller ==============================================

promise06.then(async (responseData) => {
    const response = await responseData.json();
    console.log('reponse inter', response);
    for (let i = 0; i < 5; i++)
        try {
            const id = response["results"][i]["id"];
            const promise07 = fetch("ttp://localhost:8000/api/v1/titles/" + id + "");
            promise07.then(async (responseData) => {
                const response = await responseData.json();
                console.log('7Movies', response);

                try {
                    const image_url = response["image_url"];
                    console.log(image_url);

                    const display_image_url = document.querySelector("#img_action" + [i + 5] + "");

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
       */
          /*
            // DOM object display img & text
            // const display_id = document.querySelector("#id");

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
*/
 

    // ============================================================================================

class Carousel {
    /*
     * @param (HTMLElement) element 
     * @param (Object) options
     * @param (Object) options.slidesToScroll Nombre d'éléments à faire défiler
     * @param (Object) options.slidesVisible Nombre d'élément visibles dans un slide
    */

    constructor(element, options = {}) {
        this.element = element;
        this.options = Object.assign({}, {
            slidesToScroll: 7,
            slidesVisible: 6
        }, options)
        this.children = [].slice.call(element.children)
        let root = this.createDivWithClass('carousel')
        let container = this.createDivWithClass('carousel__container')
        root.appendChild(container)
        this.element.appendChild(root)
        this.children.forEach((child) => {
            let item = this.createDivWithClass('carousel__item')
            item.appendChild(child)
            container.appendChild(item)
        })
    }
}

