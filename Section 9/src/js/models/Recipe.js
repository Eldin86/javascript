import axios from 'axios';
import {key, proxy } from '../config';

export default class Recipe {
    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        try{
            //const res = await axios(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            //Dohvacamo naziv recepta - globalno postavljamo
            this.title = res.data.recipe.title;
            //Dohvacamo autora recepta - globalno postavljamo
            this.author = res.data.recipe.publisher
            //Dohvacamo sliku recepta  - globalno postavljamo
            this.img = res.data.recipe.image_url;
            //Dohvacamo utl recepta  - globalno postavljamo
            this.url = res.data.recipe.isource_url;
            //Dohvacamo sastav recepta  - globalno postavljamo
            this.ingredients = res.data.recipe.ingredients;
            //console.log(res);
        }catch(error){
            console.log(error);
            alert('Something went wrong :(')
        }
    }

    calcTime() {
        //Assuming that we need 15 min for each 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15
    }

    calcServings(){
        this.servings = 4;
    }

    parseIngredients(){
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound']
        const units = [...unitsShort, 'kg', 'g']
        //Provrtimo petljom kroz niz sastojaka
        const newIngredients = this.ingredients.map(el => {
            // 1) Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i])
            });
            // 2) Remove parantheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
            // 3) Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');//Razdvojimo rijeci koje smo spasili u ingredient varijablu i spasimo u arrIng
            console.log(arrIng);
            //Ako rijec iz niza koji smo razdvojili po ' ', postoji i u unitsShort vrati true
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));//Trazimo index rijeci koja se poklapa sa indexom u unitsShort

            let objIng;

            if(unitIndex > -1){//Ako je unitIndex > -1 znaci da je true. mozemo staviti i unitIndex !== -1?
                //There is unit
                 //Ex. 4 1/2 cups, arrCount is [4, 1/2] --> "4+1/2" --> 4.5. Pokusat ce izvrsiti matematicku radnju
                 //Ex. 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex);
                let count;

                if(arrCount.length === 1){
                    count = eval(arrIng[0].replace('-', '+'));
                }else{
                    count = eval(arrIng.slice(0, unitIndex).join('+'))
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };
            }else if(parseInt(arrIng[0], 10)){//Parse first item of array into number, if number return true, else Nan(false)
                //There is no unit, but 1st element is number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            }else if(unitIndex === -1){//return false
                //There is no unit and no number in 1st position
                objIng = {
                    count: 1,//Kao neka defaultna vrijednost
                    unit: '',
                    ingredient //dodjelili smo ingredient u ingredient, ES6 nacin
                }
            }

            return objIng;
        });
        this.ingredients = newIngredients;
    }

    updateServings(type){//kao type proslijedimo parametar kojim govorimo da li increase ili decrease servings
        //Update servings
        const newServings = type === 'dec' ? this.servings -1 : this.servings + 1; //ako je dec onda this.servings -1 ako je inc onda this.servings+1
        //Update Ingredients
        this.ingredients.forEach(ing => {
            ing.count *= (newServings / this.servings)
        });
        
        console.log(this.ingredients)

        this.servings = newServings
    }
}