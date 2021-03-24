let cocktailId = '';
let cocktailName = '';
let cocktailImage = '';
let cocktailHtml = '';
let drinkIndex = 0;
let cocktailInstructions = '';
let cocktailData = '';

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
            cocktailData = JSON.parse(this.responseText);
            console.log(cocktailData);                   
        };    
    };
    request.send();
    setTimeout(showCocktail, 3000)   
}

/* show the selection of cocktail */
function showCocktail() {
        
    /* Get the name and the image of the cocktail */
    cocktailId = cocktailData.drinks[drinkIndex]["idDrink"];
    cocktailName = cocktailData.drinks[drinkIndex]["strDrink"];
    cocktailImage = cocktailData.drinks[drinkIndex]["strDrinkThumb"];

    /* Construct the HTML to view output */
    cocktailHtml = `
    <div id="select-cocktail" class="animate__animated animate__fadeIn">
    <img src="${cocktailImage}" alt="${cocktailName}" class="drinks-image">
    <h2 id="cocktail-id">${cocktailId}</h2>
    <h2 id="cocktail-position">${drinkIndex}</h2>
    <h1 class="h1 cocktail-title">${cocktailName}</h1>
    </div>
    <div id="nav-buttons">
    <button id="click-back" class="pointer pointer-left" onclick="showCocktail()"><i class="fas fa-hand-point-left"></i></button>
    <button id="show-how" class="pointer middle-button"><i class="fas fa-thumbs-up"></i></button>
    <button id="click-next" class="pointer pointer-right" onclick="showCocktail()"><i class="fas fa-hand-point-right"></i></button>
    </div>                 
    `;
        
    /* Pass the HTML to the div the-data and increment drinkIndex  */
    document.getElementById("information-container").innerHTML = cocktailHtml;
    drinkIndex = drinkIndex + 1;


    let showHowCocktails = document.getElementById('show-how');
    showHowCocktails.addEventListener('click', getHow);

};

/* get how to make the cocktail */
function getHow() {
    cocktailPositionInArray = document.getElementById('cocktail-position').textContent;


    let howToRequest = new XMLHttpRequest();

    howToRequest.open('GET', `https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${cocktailId}`, true);

    howToRequest.onload = function(){
        if(this.status === 200){
            let cocktailHowToData = JSON.parse(this.responseText);
            console.log(cocktailHowToData);
        
            /* Get the name and the image of the cocktail to make */
            cocktailInstructions = cocktailHowToData.drinks[0]["strInstructions"];

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
            };    
            };

            /* Loop through the cocktail ingredients and created list items that includes the corresponding measurement */
            /* handle measurements that are "undefined" due to fewer entries in array */
            let ingredientList = 0;
            let ingredientsHtml = '';
            for (ingredientList; ingredientList < cocktailIngredients.length; ingredientList++) {
                if (cocktailMeasurements[ingredientList] === undefined && cocktailIngredients !== undefined) {
                    ingredientsHtml += `<li>${cocktailIngredients[ingredientList]}</li>`;
                } else {
                if (cocktailMeasurements[ingredientList] !== undefined && cocktailIngredients !== undefined);
                ingredientsHtml += `<li>${cocktailMeasurements[ingredientList]} ${cocktailIngredients[ingredientList]}</li>`;
                };
            };

        /* Construct the HTML to view how to make the cocktail */
            let cocktailToMakeHtml = `
            <div id="select-cocktail"  class="animate__animated animate__fadeIn">
            <img src="${cocktailImage}" alt="${cocktailName}" class="drinks-image-how">
            <h1 class="h1">${cocktailName}</h1>        
            <ul>${ingredientsHtml}</ul>
            <div id="instructions">
            <p>${cocktailInstructions}</p>
            </div>
            </div>
            <div id="nav-buttons">
            <button id="go-back" class="pointer pointer-left" onclick="showCocktail()"><i class="fas fa-hand-point-left"></i></button>
            <button id="email-me" class="pointer pointer-right" onclick="showCocktail()"><i class="fas fa-envelope"></i></button>
            </div>
            `;
                
            /* Pass the HTML to the div the-ingredient-data */
            document.getElementById("information-container").innerHTML = cocktailToMakeHtml;
            drinkIndex = drinkIndex - 1;

        };
    };
    howToRequest.send();

};


