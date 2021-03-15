let request = new XMLHttpRequest();

/* Get a random cocktail */
request.open('GET', 'https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php', true);

request.onload = function(){
    if(this.status === 200){
        let cocktailData = JSON.parse(this.responseText);
        console.log(cocktailData);

function loadNewCocktail() {
    let i = 0

    for (i; i < 10; i++) {
        /* Get the name and the image of the cocktail */
        let cocktailName = cocktailData.drinks[i]["strDrink"];
        let cocktailImage = cocktailData.drinks[i]["strDrinkThumb"];

        /* Set the arrays to contain the ingredients and measurements */
        const cocktailIngredients = [];
        const cocktailMeasurements = [];
        let cocktailIndividualIngredient = '';
        let cocktailIngredientMeasure = '';
        
        /* go through the properties of the object*/
        for (let property in cocktailData.drinks[i]){
        
        /* Select all properties that start with strIngredient and push in to cocktailIngredients array */
        if(property.startsWith('strIngredient') && cocktailData.drinks[i][property] !== null){
            cocktailIndividualIngredient = cocktailData.drinks[i][property]; 
            cocktailIngredients.push(cocktailIndividualIngredient);
        }
        /* Select all properties that start with strMeasure and push in to ocktailMeasurements array */
        if(property.startsWith('strMeasure') && cocktailData.drinks[i][property] !== null){
            cocktailIngredientMeasure = cocktailData.drinks[i][property];
            cocktailMeasurements.push(cocktailIngredientMeasure);
        }      
        }

        console.log(cocktailIngredients);
        console.log(cocktailMeasurements);

        /* Loop through the cocktail ingredients and created list items that includes the corresponding measurement */
        /* handle measurements that are "undefined" due to fewer entries in array */
        let ingredientList = 0;
        let ingredientsHTML = '';
        for (ingredientList; ingredientList < cocktailIngredients.length; ingredientList++) {
            if (cocktailMeasurements[ingredientList] === undefined && cocktailIngredients !== undefined) {
                ingredientsHTML += `<li class="list-group-item">${cocktailIngredients[ingredientList]}</li>`;
            } else {
            if (cocktailMeasurements[ingredientList] !== undefined && cocktailIngredients !== undefined);
            ingredientsHTML += `<li class="list-group-item">${cocktailMeasurements[ingredientList]} ${cocktailIngredients[ingredientList]}</li>`;
            }
        }
        /* Get the instructions for making the cocktial */
        let cocktailInstructions = cocktailData.drinks[i]["strInstructions"];

        /* Construct the HTML to view in index.html */
        let cocktailHtml = `
        <h1 class="h1">${cocktailName}</h1>
        <img src="${cocktailImage}" alt="${cocktailName}">
        <ul class="list-group">${ingredientsHTML}</ul>
        <p>${cocktailInstructions}</p>
        `;
            
        /* Pass the HTML to the div the-data in  */
        document.getElementById("the-data").innerHTML = cocktailHtml;
    }
}
    
let nextCocktail = document.getElementById('clickNext');
nextCocktail.addEventListener('click', loadNewCocktail);

    };
};

request.send();