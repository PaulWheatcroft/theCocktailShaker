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

function previousRandomCocktail() {
    drinkIndex = drinkIndex - 1;
    loadRandomCocktail();
}

function nextRandomCocktail() {
    drinkIndex = drinkIndex + 1;
    loadRandomCocktail();
}

function loadRandomCocktail() {
    
    if (drinkIndex > 9 ) {
        document.getElementById("information-container").className = 'random-no-more';
        let noMoreHtml = `  
        <h1>We've got to the end of that little selection</h1>
        <p>Didn't anything tickly your fancy? How about I show you some more? Perhaps you;ve got something in mind now?</p>
        <div class="button-container">
        <button class="buttons blue-button"><a href="random.html">Show me some more <i class="fas fa-recycle"></i></a></button>
        <button class="buttons green-button"><a href="ingredients.html">Let me choose ingredients <i class="fas fa-mouse-pointer"></i></a></button>
        </div>
        `;
        document.getElementById("information-container").innerHTML = noMoreHtml;
        return;
    }

    /* ----------- Set the navigation buttons to disabled if applicable */
    if (drinkIndex === 0) {
        cocktailNavButtons = `
        <button id="click-back" class="pointer pointer-left pointer-disabled" onclick="previousRandomCocktail()" disabled><i class="fas fa-hand-point-left"></i></button>
        <button id="email-me" class="pointer pointer-middle"><i class="fas fa-envelope"></i></button>
        <button id="click-next" class="pointer pointer-right" onclick="nextRandomCocktail()"><i class="fas fa-hand-point-right"></i></button>
        `
    } else if (drinkIndex === 0 && drinkIndex === (Object.keys(randomCocktailData.drinks).length - 1)) {
        cocktailNavButtons = `
        <button id="click-back" class="pointer pointer-left pointer-disabled" onclick="previousRandomCocktail()" disabled><i class="fas fa-hand-point-left"></i></button>
        <button id="email-me" class="pointer pointer-middle"><i class="fas fa-envelope"></i></button>
        <button id="click-next" class="pointer pointer-right pointer-disabled" onclick="nextRandomCocktail()" disabled><i class="fas fa-hand-point-right"></i></button>
        `
    } else {
        cocktailNavButtons = `
        <button id="click-back" class="pointer pointer-left" onclick="previousRandomCocktail()"><i class="fas fa-hand-point-left"></i></button>
        <button id="email-me" class="pointer pointer-middle"><i class="fas fa-envelope"></i></button>
        <button id="click-next" class="pointer pointer-right" onclick="nextRandomCocktail()"><i class="fas fa-hand-point-right"></i></button>
        `
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
    ${cocktailNavButtons}
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




