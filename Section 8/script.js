//************************************************************************************ */
//Lection 127: Making AJAX calls with fetch and async/await
async function getWeather(woeid){
    try{
        const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`);
        const data = await result.json();
        const today = data.consolidated_weather[0];
        console.log(`Temperatures today in ${data.title} stay between ${today.min_temp} and ${today.max_temp}.`)
    
        const tomorrow = data.consolidated_weather[1];
        console.log(`Temperatures tomorrow in ${data.title} stay between ${tomorrow.min_temp} and ${tomorrow.max_temp}.`)
        return data;
    } catch(err){
        console.log(err)
    }


}
getWeather(2487956);
let dataLondon;
getWeather(44418).then(data => {
    //Preko then() mozemo data sa servera dodjeliti u varijablu i ispisati u toj toj then metodi.
    //Van metode ne mozemo jer dohvaca asinhrono
    dataLondon = data
    console.log(dataLondon)
})




//************************************************************************************ */
//Lection 126: Making AJAX calls with fetch and Promises

// function getWeather(woeid){
//     fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`)
//     .then(result => {
//         console.log(result);
//         return result.json();
//     })
//     .then(data => {
//         //console.log(data)
//         const today = data.consolidated_weather[0];
//         console.log(`Temperatures in ${data.title} stay between ${today.min_temp} and ${today.max_temp}.`)
//     })
//     .catch(err => {
//         console.log(err);
//     });
// }
// getWeather(2487956);
// getWeather(44418);





//************************************************************************************ */
//Lection 124: From Promises to Async/Await
// const getID = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve([523, 883, 432, 974])
//     }, 1500)
// })

// //recID proslijedimo unutar setTimeout kao treci argument
// //Napravili smo funkciju da bismo je mogli koristiti u .then()
// const getRecipe = recID => {
//     return new Promise((resolve, reject) => {
//         //id je argument koji smo proslijedili iz setTimeout funkcije kao treci argument (recID)
//         setTimeout((id) => {
//             const recipe = {
//                 title: 'Fresh Tomato pasta',
//                 publisher: 'Jonas'
//             }
//             resolve(`${id}: ${recipe.title}`)
//             //recID je treci argument iz getRecipe funkcije
//         }, 1500, recID);
//     });
// };

// const getRelated = publisher => {
//     return new Promise((resolve, reject) => {
//         setTimeout((pub) => {
//             const recipe = {
//                 title: 'Italian pizza',
//                 publisher: 'Jonas'
//             }
//             resolve(`${pub}: ${recipe.title}`)
//         }, 1500, publisher);
//     })
// };

// async function getRecipesAW() {
//     const IDs = await getID;
//     console.log(IDs);
//     const recipe = await getRecipe(IDs[2]);
//     console.log(recipe);
//     const related = await getRelated('Jonaas');
//     console.log(related);

//     return recipe
// }
// getRecipesAW().then(result => console.log(`${result} is the best ever!`))




//************************************************************************************ */
//Lection 123: From Callback Hell to Promises
// const getID = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve([523, 883, 432, 974])
//     },1500)
// })

// //recID proslijedimo unutar setTimeout kao treci argument
// //Napravili smo funkciju da bismo je mogli koristiti u .then()
// const getRecipe = recID => {
//     return new Promise((resolve, reject) => {
//         //id je argument koji smo proslijedili iz setTimeout funkcije kao treci argument (recID)
//         setTimeout((id) => {
//             const recipe = {
//                 title: 'Fresh Tomato pasta',
//                 publisher: 'Jonas'
//             }
//             resolve(`${id}: ${recipe.title}`)
//             //recID je treci argument iz getRecipe funkcije
//         }, 1500, recID);
//     });
// };

// const getRelated = publisher => {
//     return new Promise((resolve, reject) => {
//         setTimeout((pub) => {
//             const recipe = {
//                 title: 'Italian pizza',
//                  publisher: 'Jonas'
//                 }
//                 resolve(`${pub}: ${recipe.title}`)
//         }, 1500, publisher);
//     })
// };

// getID
// //Proslijedili smo niz koji vraca getID
// .then(IDs => {
//     //Ispisali smo niz IDs
//     console.log(IDs)
//     //Proslijedili smo IDs[2] u getRecipe funkciju i vratili kao promise
//     //da bismo radili sa novim promise u ovom slucaju getRecipe moram ga returnati i pozvati novi then()
//     return getRecipe(IDs[2])
// })
// .then(recipe => {
//     //Recipe je iz prethodnog then() funkcija getRecipe(IDs[2]) koju smo vratili
//     console.log(recipe)
//     return getRelated('Jonas');
// })
// .then(recipe => {
//     console.log(recipe)
// })
// .catch(error => {
//     console.log('Error!!')
// })


//************************************************************************************ */
//Lection 122: The Old Way: Asynchronous JavaScript With Callbacks

// function getRecipe(){
//     setTimeout(() => {
//         const recipeID = [523, 883, 432, 974];
//         console.log(recipeID)

//         setTimeout((id) => {
//             const recipe = { 
//                 title: 'Fresh Tomato pasta',
//                 publisher: 'Jonas'
//             }
//             console.log(`${id}: ${recipe.title}`)
//             setTimeout(publisher => {
//                 const recipe2 = {
//                     title: 'Italian pizza',
//                     publisher: 'Jonas'
//                 }
//                 console.log(recipe)
//             }, 1500, recipe.publisher)
//         },1500, recipeID[2])//recipeID[2] je treci argument koji prima setTimeout a zatim je prosljedjen umjesto id parametra
//     },1500)
// }
// getRecipe();



//************************************************************************************ */
//Async
// const second = () => {
//     setTimeout(() => {
//         console.log('Async Hey There')
//     }, 2000);
// }

// const first = () => {
//     //Prvo se izvrsi ova linija
//     console.log('Hey there');
//     //Trece se izvrsava second()
//     second();
//     //Drugo se izvrsava posljednja linija console.log ('The end')
//     console.log('The end')
// }

// first();

//Sync
// const second = () => {
//     console.log('Second');
// }

// const first = () => {
//     //Prvo se izvrsi ova linija
//     console.log('Hey there');
//     //Drugo se pozove funkcija i ispise se 'second'
//     second();
//     //Trece, nakon sto second() zavrsi onda se izvrsava posljednja linija console.log ('The end')
//     console.log('The end')
// }

// first();