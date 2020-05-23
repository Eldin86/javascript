import { elements, renderLoader, clearLoader } from './views/base';
import Search from './models/Search';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import Recipe from './models/Recipe';
import Likes from './models/Likes';

/* Global state of the app
    *- Search object
    *- Current recipe object
    *- Shopping list object
    *- Liked recipes
*/

const state = {};
/*
    SEARCH CONTROLLER
*/
//Async keyword is used because we get data from server
const controlSearch = async () => {
    //1)Get query from view
    //Save value from input into query const variable
    const query = searchView.getInput();
    //const query = 'pizza'; //TODO
    // console.log(query);

    if(query){
        //2) New search object and add to state
        //Proslijedimo query u Search class
        state.search = new Search(query);

        //3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try{
            //4) Search for recipes
            //We call method to get data from API, and we use await keyword
            await state.search.getResults();

            //5) Render results on UI
            //Pobrisemo loader
            clearLoader();
            //We pass object we get from api as parameter to the renderResults method
            searchView.renderResults(state.search.result)
            //console.log(state.search.result[0].recipe.label)
        }catch(err){
            alert('Something wrong with search...');
            clearLoader();
        }


    }

}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})


elements.searachResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');//https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
    console.log(btn.dataset)
    console.log(btn)
    if(btn){//Ako postoji btn
        const goTopage = parseInt(btn.dataset.goto, 10);//btn.dataset.goto Dohvacamo vrijednost iz data-goto atributa
        //Kad kliknemo na drugu stranicu prethodni rezultati se izbrisu
        searchView.clearResults();//ocistimo rezultate sa prethodne stranice da bismo novu ucitali
        //state.search.result je objekat koji smo dobili iz API, state.search je property u objektu u koji smo spasili podatke
        //broj rezultata po stranici nismo proslijedili jer smo postavili
        searchView.renderResults(state.search.result, goTopage)
        console.log(goTopage)
    }
})

//Extendamo sa new posto je class tipa
// const search = new Search('pizza');
// console.log(search)

//state.search.getResults();
controlSearch();
//npm start??
//npm start dev??


/*
    RECIPE CONTROLLER
*/
// const r = new Recipe(46956);
// r.getRecipe();//prvo pozovemo metodu da bismo mogli ispisati podatke iz objekta
// console.log(r)//ispisali smo cijeli objekat
const controlRecipe = async () => {
    //Get ID from URL
    const id = window.location.hash.replace('#', '');//Zamjenimo # sa praznim stringom, tako da smo dobili samo ID
    console.log(id)//Ispisujemo hash iz URL-a
    if(id){//Ako imamo ID
        //Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //Highlight selected search item
        if(state.search){//Ako postoji search tek onda jedan od search items moze biti selektiran
            searchView.highlightedSelected(id);
        }

        //Create new recipe object
        state.recipe = new Recipe(id);//spremamo recipe u state.recipe - Citavu klasu smo spasili u state.recipe

        try{
            //Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            //console.log(state.recipe.ingredients);
            state.recipe.parseIngredients();
            //Calculate servings and time
            state.recipe.calcTime(); 
            state.recipe.calcServings();
            //Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
            //console.log(state.recipe);
        }catch(error){
            alert('Error processing recipe');
            console.log(error)
        }
    }
}
//window.addEventListener('hashchange', controlRecipe);//https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event
//window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));//Kad loadiramo i ako je npr user bookmark radio na odredjenom receptu da mu otvori odmah taj rcept


/*
    LIST CONTROLLER
*/
const controlList = () => {
    //Create new list IF there is none yet
    if(!state.list) state.list = new List();//Ako nema u state objektu list property kreiraj ga

    //Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {//Provrtimo kroz sve ingredientse
        const item = state.list.addItem(el.count, el.unit, el.ingredient);//Dodajemo sve propertije koje ima ingredients niz
        listView.renderItem(item);//Proslijedili smo objekat kao parametar, koji renderamo u view
    })
}

//Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;//U html definisemo kao data-itemid u javascript kad pozivamo ide dataset.itemid

    //Handle the delete button
    if(e.target.matches('.shopping__delete, .shopping__delete *')){//Matches vraca true ili false?
        //Delete from state
        state.list.deleteItem(id)
        //Delete from UI
        listView.deleteItem(id);

        //Handle the count update
    }else if(e.target.matches('.shopping__count-value')){
        const val = parseFloat(e.target.value);//Value from input field
        state.list.updateCount(id, val)
    }
});

/*
    LIKE CONTROLLER
*/
const controlLike = () => {
    //Ako nema likes property u objektu state dodaj ga i dodjeli mu new Likes()
    if(!state.likes) state.likes = new Likes();
    //U currentID dodjelimo id od recepta 
    const currentID = state.recipe.id;

    //User has not yet liked current recipe
    if(!state.likes.isLiked(currentID)){
        //Add like to the state
        const newLike = state.likes.addLike(currentID, state.recipe.title, state.recipe.author, state.recipe.img);//Proslijedimo informacije da bismo mogli ispisati u UI podatke o receptu koji smo like
        //Toggle the like button
        //Posto trenutni recept nije lajkan proslijedi mu true da bude lajkan, odnosno visible
        likesView.toggleLikeBtn(true);
        //Add like to UI list
        likesView.renderLike(newLike)
        console.log(state.likes)
    //User has liked current recipe
    }else{
        //Remove like to the state
        state.likes.deleteLike(currentID);
        //Toggle the like button
        likesView.toggleLikeBtn(false);
        //Remove like from UI list
        likesView.deleteLike(currentID)
        console.log(state.likes)
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
}

//Restore liked recipes on page load
window.addEventListener('load', () => {
    state.likes = new Likes();
    //restore likes
    state.likes.readStorage();
    //Toggle like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    //Render the existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like))
})


//Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn-decrease, .btn-decrease *')){//https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
        // Decrease button is clicked
        if(state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    }else if(e.target.matches('.btn-increase, .btn-increase *')){
        // Increase button is clicked
        state.recipe.updateServings('inc')
        recipeView.updateServingsIngredients(state.recipe);
    }else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')){//Ako kliknuti element matchira recipe__btn--add klasu ili bilo koju child klasu.
        //Add ingredients to shopping list
        controlList();
    }else if(e.target.matches('.recipe__love, .recipe__love *')){
        //Like controller
        controlLike();
    }
    console.log(state.recipe)
})