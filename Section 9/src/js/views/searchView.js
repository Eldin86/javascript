//Get imported HTML elements from base
import { elements } from './base'


//Get value from input field
export const getInput = () => elements.searchInput.value;


//U { } stavljamo jer ne vracamo nista
export const clearInput = () => {
    elements.searchInput.value = '';
}


//Clear results when new item is searched
export const clearResults = () => {
    elements.searchResultList.innerHTML = '';//ocistimo listu
    elements.searachResPages.innerHTML = '';//ocistimo buttone
}

export const highlightedSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link--active'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active')
    })
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active')
}


//Limit length of string
const limitRecipeTitle = (title, limit = 15) => {
    if (title.length >= limit) {
        return title = title.substring(0, limit) + '...'
    }
    return title

    // const newTitle = [];
    // if(title.length > limit){
    //     title.split(' ').reduce((acc, cur) => {
    //         if(acc + cur.length <= limit){
    //             newTitle.push(cur)
    //         }
    //         return acc + cursorTo.length
    //     }, 0)
    //     //return the result
    //     return `${newTitle.join(' ')}...}`
    // }
    // return title
}


const renderRecipe = recipe => {
    const markup = `
    <li>
        <a class="results__link results__link--active" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
    //Attach items to parent element
    elements.searchResultList.insertAdjacentHTML('beforeend', markup)
    //console.log(recipe)
};


//page = broj page na kojem smo
//type = da li je 'prev' ili 'next' page
const createButton = (page, type) =>
    //Ako je type 'prev' idi stranicu manje, ako je 'next' idi stranicu vise
    `
        <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
            <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
            </svg>
        </button>
    `;


//Buttons for pagination
const renderButtons = (page, numresults, resPerPage) => {
    //ako imamo npr 30 rezultata i 10 pregleda po page ukupno imamo 3 stranice
    //Ukoliko imamo npr 45 rezultata zaokruzimo na gornji broj 45/10 = 4.5 (5 stranica) pomoci ceil metode
    const pages = Math.ceil(numresults / resPerPage);//Ukupan broj stranica
    let button;

    //Pagination pages
    if (page === 1 && pages > 1) {//Ako je prva stranica i ako ima vise od jedna stranica idi na sljedecu
        //Only button to go to next page
        button = createButton(page, 'next');//Proslijedili smo next jer smo na prvoj stranici
    } else if (page < pages) {//ako je trenutna page manje od ukupnih stranica znaci da imamo prev i next
        //Both buttons shown or that we are in middle of pages
        //dvije funkcije renderaju buttons prev i next posto smo ih dva puta pozvali
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `; 
    } else if (page === pages && pages > 1) {//Ako je zadnja stranica jednaka trenutnoj i ako je vise pages od 1 onda idi na prev, jer smo na zadnjoj
        //Only button to go to previous page
        button = createButton(page, 'prev');//Proslijedili smo prev jer smo na zadnjoj stranici
    }

    elements.searachResPages.insertAdjacentHTML('afterbegin', button);//Apenda html u ovisnosti koji uslov je proslo
};


//Rendering results into view using forEach loop, using pagination
//Defaultno je prva stranica i izlistava maximalno 10 itemsa po stranici
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    //Render results of current page
    //(1 - 1 = 0) => (0 * 10 = 0), pocinjemo od pocetka
    const start = (page - 1) * resPerPage; //start ce biti pocetna indexna pozicija u slice metodi
    // 1 * 10(10 je broj items po stranici), kad se prebaci na drugu stranicu bit ce 2*10  i td
    const end = page * resPerPage;//end ce biti krajnja indexna pozicija u slice metodi


    console.log(recipes);
    //Slice metodom odredjujemo koliko ce se rezultata prikazivati, odnosno kopiramo niz od start do end
    recipes.slice(start, end).forEach(renderRecipe);

    //Render paginations buttons
    //page = strana na kojoj smo
    //recipes.length = broj podataka koje smo dobili iz API(broj recepata), ukupni recepti
    //Broj rezultata po stranici koje prikazuje
    renderButtons(page, recipes.length, resPerPage)
}