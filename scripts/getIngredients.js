function getIngredientsURL() {
    let firstIngredient = document.getElementById("first-selection").value;
    let APIURL = `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${firstIngredient}`;  
    callAPI(APIURL);    
}
function callAPI(APIURL) {
    console.log(APIURL);

    let request = new XMLHttpRequest();

    request.open('GET', `${APIURL}`, true);

    /* Get cocktails with the selected ingredients */
    request.onload = function(){
        if(this.status === 200){
            let cocktailData = JSON.parse(this.responseText);
            console.log(cocktailData);

            let drinkIndex = 0;

            function showCocktail() {
                
            /* Get the name and the image of the cocktail */
            let cocktailId = cocktailData.drinks[drinkIndex]["idDrink"];
            let cocktailName = cocktailData.drinks[drinkIndex]["strDrink"];
            let cocktailImage = cocktailData.drinks[drinkIndex]["strDrinkThumb"];

            /* Construct the HTML to view output */
            let cocktailHtml = `
            <div id="select-cocktail">
            <img src="${cocktailImage}" alt="${cocktailName}" class="drinks-image">
            <h2 id="cocktail-id">${cocktailId}</h2>
            <h1 class="h1 cocktail-title">${cocktailName}</h1>
            <button id="click-next">Next</button>
            <button id="show-how">Show me how to make this</button>
            </div>                      
            `;
                
            /* Pass the HTML to the div the-data and increment drinkIndex  */
            document.getElementById("the-ingredient-data").innerHTML = cocktailHtml;
            drinkIndex = drinkIndex + 1;

            let nextCocktail = document.getElementById('click-next');
            nextCocktail.addEventListener('click', showCocktail);
            let showHowCocktails = document.getElementById('show-how');
            showHowCocktails.addEventListener('click', getHow);

            };
            showCocktail();            
        };    
    };

    /* get how to make the cocktail */
    function getHow() {

    let cocktailIdToMake = document.getElementById('cocktail-id').textContent;
    console.log(cocktailIdToMake);

    let howToRequest = new XMLHttpRequest();

    howToRequest.open('GET', `https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${cocktailIdToMake}`, true);

    howToRequest.onload = function(){
        if(this.status === 200){
            let cocktailHowToData = JSON.parse(this.responseText);
            console.log(cocktailHowToData);
        
            /* Get the name and the image of the cocktail to make */
            let cocktailHowToName = cocktailHowToData.drinks[0]["strDrink"];
            let cocktailHowToImage = cocktailHowToData.drinks[0]["strDrinkThumb"];
            let cocktailHowToInstructions = cocktailHowToData.drinks[0]["strInstructions"];

            /* Set the arrays to contain the ingredients and measurements */
            const cocktailIngredients = [];
            const cocktailMeasurements = [];
            let cocktailIndividualIngredient = '';
            let cocktailIngredientMeasure = '';
            
            /* go through the properties of the object*/
            for (let property in cocktailHowToData.drinks[0]){
            
            /* Select all properties that start with strIngredient and push in to cocktailIngredients array */
            if(property.startsWith('strIngredient') && cocktailHowToData.drinks[0][property] !== null){
                cocktailIndividualIngredient = cocktailHowToData.drinks[0][property]; 
                cocktailIngredients.push(cocktailIndividualIngredient);
            }
            /* Select all properties that start with strMeasure and push in to ocktailMeasurements array */
            if(property.startsWith('strMeasure') && cocktailHowToData.drinks[0][property] !== null){
                cocktailIngredientMeasure = cocktailHowToData.drinks[0][property];
                cocktailMeasurements.push(cocktailIngredientMeasure);
            }      
            }

            /* Loop through the cocktail ingredients and created list items that includes the corresponding measurement */
            /* handle measurements that are "undefined" due to fewer entries in array */
            let ingredientList = 0;
            let ingredientsHowToHtml = '';
            for (ingredientList; ingredientList < cocktailIngredients.length; ingredientList++) {
                if (cocktailMeasurements[ingredientList] === undefined && cocktailIngredients !== undefined) {
                    ingredientsHTML += `<li>${cocktailIngredients[ingredientList]}</li>`;
                } else {
                if (cocktailMeasurements[ingredientList] !== undefined && cocktailIngredients !== undefined);
                ingredientsHowToHtml += `<li>${cocktailMeasurements[ingredientList]} ${cocktailIngredients[ingredientList]}</li>`;
                }
            }

        /* Construct the HTML to view how to make the cocktail */
            let cocktailToMakeHtml = `
            <div id="selected-cocktail">
            <img src="${cocktailHowToImage}" alt="${cocktailHowToName}" class="drinks-image-how">
            <h1 class="h1">${cocktailHowToName}</h1>
            <ul>${ingredientsHowToHtml}</ul>
            <p>${cocktailHowToInstructions}</p>
            <button id="go-back">Go Back</button>
            </div>
            `;
                
            /* Pass the HTML to the div the-ingredient-data */
            document.getElementById("the-ingredient-data").innerHTML = cocktailToMakeHtml;
        }
    }
    howToRequest.send();
}




    request.send();
}


let haveIngredientsCocktails = document.getElementById('show-me');
haveIngredientsCocktails.addEventListener('click', getIngredientsURL)

