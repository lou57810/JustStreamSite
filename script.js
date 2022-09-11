
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




addNew();
function addNew() {
   
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
        chevronL.src = "fonts/left.png";
        //chevronL.addEventListener("click", alertMeL());
        
        switchLeft.appendChild(chevronL);

        const newDivImg = document.createElement("div");
        newDivImg.classList.add('carouselimg' + i);
        
        newDivMain.appendChild(newDivImg);
        
        let switchRight = document.createElement("div");
        switchRight.classList.add("switchRight");
        newDivMain.appendChild(switchRight);


        next_url = document.getElementsByClassName("input").value;  ////?????


        let chevronR = document.createElement("img");
        chevronR.src = "fonts/right.png";
        chevronR.addEventListener("click", alertMeR(next_url));
        
        switchRight.appendChild(chevronR);
    }     
}

function alertMeR(url) {
    console.log('new_url: ', url);
}

function alertMeL(url) {
    console.log('new_url: ', url);
}


imgTab0 = [];
imgTab1 = [];
imgTab2 = [];
//           NEXT PREVIOUS
let i;

async function getResponse(url1, url2, q_selector, i) {     // index
    
    const promise1 = await fetch(url1);
    const response1 = await promise1.json();    
    for (let j = 0; j < 5; j++)
        try {
            const url = response1["results"][j]["image_url"];   // id  movies x 2
            const previous_url = response1["previous"];
            console.log("previous:", previous_url);
            try {                
                const display_image_url1 = document.querySelector(q_selector);
                const image1 = `<img src = "${url}">`;
                display_image_url1.insertAdjacentHTML("beforeend", image1);                
                if (i === 0) { imgTab0.push(image1); }
                else if (i === 1) { imgTab1.push(image1); }
                else if (i === 2) { imgTab2.push(image1); }
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
            const url = response2["results"][j]["image_url"];   // id  movies x 2
            const next_url = response2["next"];
            console.log("next:", next_url);
            try {
                const display_image_url2 = document.querySelector(q_selector);
                const image2 = `<img src = "${url}">`;
                display_image_url2.insertAdjacentHTML("beforeend", image2);                
                if (i === 0) { imgTab0.push(image2); }
                else if (i === 1) { imgTab1.push(image2); }
                else if (i === 2) { imgTab2.push(image2); }
                const display_next_url = document.querySelector(".switchRight");
                display_next_url.innerHTML = next_url;
            } catch (err) {
                console.log(err);
            }
        } catch (err) {
            console.log(err);
        }
}

const Container0 = document.getElementsByClassName(".carouselimg0");
Container0.innerHTML = getResponse("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score",
    "http://localhost:8000/api/v1/titles/?page=2&sort_by=-imdb_score", ".carouselimg0", 0);

const Container1 = document.getElementsByClassName(".carouselimg1");
Container0.innerHTML = getResponse("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Action",
    "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Action&page=2", ".carouselimg1", 1);

const Container2 = document.getElementsByClassName(".carouselimg2");
Container2.innerHTML = getResponse("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Animation",
    "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Animation&page=2", ".carouselimg2", 2);
