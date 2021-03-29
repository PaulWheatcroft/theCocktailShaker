function callRandomAPI() {
    let randomRequest = new XMLHttpRequest();
    randomRequest.open('GET', `https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php`, true);

    randomRequest.onload = function(){
        if(this.status === 200){
            randomCocktailData = JSON.parse(this.responseText);
            console.log(randomCocktailData);                   
        };    
    };
    randomRequest.send();
    setTimeout(loadRandomCocktail, 3000)   
}

let drinkIndex = 0;

function previousRandomCocktail(callback) {
    drinkIndex = drinkIndex - 1;
    loadRandomCocktail(callback);
}

function nextRandomCocktail(callback) {
    drinkIndex = drinkIndex + 1;
    loadRandomCocktail(callback);
}

function loadRandomCocktail() {
    
    if (drinkIndex < 0 || drinkIndex > 9 ) {
        let noMoreHtml = `
        <h1>There are no more drinks to show you</h1>
        `;
        document.getElementById("information-container").innerHTML = noMoreHtml;
        return;
    }
        
    /* Get the name and the image of the cocktail */
    let cocktailName = randomCocktailData.drinks[drinkIndex]["strDrink"];
    let cocktailImage = randomCocktailData.drinks[drinkIndex]["strDrinkThumb"];

    /* Set the arrays to contain the ingredients and measurements */
    const cocktailIngredients = [];
    const cocktailMeasurements = [];
    let cocktailIndividualIngredient = '';
    let cocktailIngredientMeasure = '';
    
    /* go through the properties of the object*/
    for (let property in randomCocktailData.drinks[drinkIndex]){
    
    /* Select all properties that start with strIngredient and push in to cocktailIngredients array */
    if(property.startsWith('strIngredient') && randomCocktailData.drinks[drinkIndex][property] !== null){
        cocktailIndividualIngredient = randomCocktailData.drinks[drinkIndex][property]; 
        cocktailIngredients.push(cocktailIndividualIngredient);
    }
    /* Select all properties that start with strMeasure and push in to ocktailMeasurements array */
    if(property.startsWith('strMeasure') && randomCocktailData.drinks[drinkIndex][property] !== null){
        cocktailIngredientMeasure = randomCocktailData.drinks[drinkIndex][property];
        cocktailMeasurements.push(cocktailIngredientMeasure);
    }      
    }

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
        }
    }
    /* Get the instructions for making the cocktial */
    let cocktailInstructions = randomCocktailData.drinks[drinkIndex]["strInstructions"];

    /* Construct the HTML to view in index.html */
    let cocktailHtml = `
    <div id="nav-buttons">
    <button id="go-back" class="pointer pointer-left" onclick="previousRandomCocktail()"><i class="fas fa-hand-point-left"></i></button>
    <button id="email-me" class="pointer pointer-middle"><i class="fas fa-envelope"></i></button>
    <button id="click-next" class="pointer pointer-right" onclick="nextRandomCocktail()"><i class="fas fa-hand-point-right"></i></button>
    </div>

    <div id="select-cocktail"  class="animate__animated animate__fadeIn">
        <img src="${cocktailImage}" alt="${cocktailName}" class="drinks-image-how">
        <h1 class="h1">${cocktailName}</h1>        
        <ul>${ingredientsHtml}</ul>
            <div id="instructions">
            <p>${cocktailInstructions}</p>
            </div>
    </div>  
    `;
        
    /* Pass the HTML to the div the-data and increment drinkIndex  */
    document.getElementById("information-container").innerHTML = cocktailHtml;
    
            
    }
callRandomAPI();




