let APIURL = '';

function getIngredients() {
    let firstIngredient = document.getElementById("first-selection").value;
    let secondIngredient = document.getElementById("second-selection").value;
    let thirdIngredient = document.getElementById("third-selection").value;
    APIURL = `'https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${firstIngredient},${secondIngredient},${thirdIngredient}'`;
    console.log(APIURL);
}

APIURL = 'https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php';

let request = new XMLHttpRequest();

/* Get a random cocktail */
request.open('GET', `${APIURL}`, true);

request.onload = function(){
    if(this.status === 200){
        let cocktailData = JSON.parse(this.responseText);
        console.log(cocktailData);

        let drinkIndex = 0;

        function loadNewCocktail() {
            
            if (drinkIndex > 9) {
                let noMoreHtml = `
                <h1>There are no more drinks to show you</h1>
                `;
                document.getElementById("the-data").innerHTML = noMoreHtml;
            }
                
            /* Get the name and the image of the cocktail */
            let cocktailName = cocktailData.drinks[drinkIndex]["strDrink"];
            let cocktailImage = cocktailData.drinks[drinkIndex]["strDrinkThumb"];

            /* Set the arrays to contain the ingredients and measurements */
            const cocktailIngredients = [];
            const cocktailMeasurements = [];
            let cocktailIndividualIngredient = '';
            let cocktailIngredientMeasure = '';
            
            /* go through the properties of the object*/
            for (let property in cocktailData.drinks[drinkIndex]){
            
            /* Select all properties that start with strIngredient and push in to cocktailIngredients array */
            if(property.startsWith('strIngredient') && cocktailData.drinks[drinkIndex][property] !== null){
                cocktailIndividualIngredient = cocktailData.drinks[drinkIndex][property]; 
                cocktailIngredients.push(cocktailIndividualIngredient);
            }
            /* Select all properties that start with strMeasure and push in to ocktailMeasurements array */
            if(property.startsWith('strMeasure') && cocktailData.drinks[drinkIndex][property] !== null){
                cocktailIngredientMeasure = cocktailData.drinks[drinkIndex][property];
                cocktailMeasurements.push(cocktailIngredientMeasure);
            }      
            }

            /* Loop through the cocktail ingredients and created list items that includes the corresponding measurement */
            /* handle measurements that are "undefined" due to fewer entries in array */
            let ingredientList = 0;
            let ingredientsHTML = '';
            for (ingredientList; ingredientList < cocktailIngredients.length; ingredientList++) {
                if (cocktailMeasurements[ingredientList] === undefined && cocktailIngredients !== undefined) {
                    ingredientsHTML += `<li>${cocktailIngredients[ingredientList]}</li>`;
                } else {
                if (cocktailMeasurements[ingredientList] !== undefined && cocktailIngredients !== undefined);
                ingredientsHTML += `<li>${cocktailMeasurements[ingredientList]} ${cocktailIngredients[ingredientList]}</li>`;
                }
            }
            /* Get the instructions for making the cocktial */
            let cocktailInstructions = cocktailData.drinks[drinkIndex]["strInstructions"];

            /* Construct the HTML to view in index.html */
            let cocktailHtml = `
            <button id="clickNext">Next</button>
            <h1 class="h1">${cocktailName}</h1>
            <img src="${cocktailImage}" alt="${cocktailName}" class="drinks-image">
            <ul>${ingredientsHTML}</ul>
            <p>${cocktailInstructions}</p>
            `;
                
            /* Pass the HTML to the div the-data and increment drinkIndex  */
            document.getElementById("the-data").innerHTML = cocktailHtml;
            drinkIndex = drinkIndex + 1;

            let nextCocktail = document.getElementById('clickNext');
            nextCocktail.addEventListener('click', loadNewCocktail)
                    
            }   

        let haveIngredientsCocktails = document.getElementById('have-ingreadients-cocktails');
        haveIngredientsCocktails.addEventListener('click', getIngredients)
        let knowStyleCocktails = document.getElementById('know-style-cocktails');
        knowStyleCocktails.addEventListener('click', getIngredients)
        let randomCocktails = document.getElementById('random-cocktails');
        randomCocktails.addEventListener('click', loadNewCocktail)
    }

};

request.send();