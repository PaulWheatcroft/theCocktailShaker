let request = new XMLHttpRequest();

/* Get a random cocktail */
request.open('GET', 'https://www.thecocktaildb.com/api/json/v2/9973533/random.php', true);

request.onload = function(){
    if(this.status === 200){
        let cocktailData = JSON.parse(this.responseText);
        console.log(cocktailData);

        /* Get the name and the image of the cocktail */
        let cocktailName = cocktailData.drinks[0]["strDrink"];
        let cocktailImage = cocktailData.drinks[0]["strDrinkThumb"];

        /* Set the arrays to contain the ingredients and measurements */
        const cocktailIngredients = [];
        const cocktailMeasurements = [];
        let cocktailIndividualIngredient = '';
        let cocktailIngredientMeasure = '';
        
        /* go through the properties of the object*/
        for (let property in cocktailData.drinks[0]){
        
        /* Select all properties that start with strIngredient and push in to cocktailIngredients array */
        if(property.startsWith('strIngredient') && cocktailData.drinks[0][property] !== null){
            cocktailIndividualIngredient = cocktailData.drinks[0][property]; 
            cocktailIngredients.push(cocktailIndividualIngredient);
        }
        /* Select all properties that start with strMeasure and push in to ocktailMeasurements array */
        if(property.startsWith('strMeasure') && cocktailData.drinks[0][property] !== null){
            cocktailIngredientMeasure = cocktailData.drinks[0][property];
            cocktailMeasurements.push(cocktailIngredientMeasure);
        }      
        }

        console.log(cocktailIngredients);
        console.log(cocktailMeasurements);

        /* Loop through the cocktail ingredients and created list items that includes the corresponding measurement */
        /* handle measurements that are "undefined" due to fewer entries in array */
        let i = 0;
        let ingredientsHTML = '';
        for (i; i < cocktailIngredients.length; i++) {
            if (cocktailMeasurements[i] === undefined && cocktailIngredients !== undefined) {
                ingredientsHTML += `<li>${cocktailIngredients[i]}</li>`;
            } else {
            if (cocktailMeasurements[i] !== undefined && cocktailIngredients !== undefined);
            ingredientsHTML += `<li>${cocktailMeasurements[i]} ${cocktailIngredients[i]}</li>`;
            }
        }
        /* Get the instructions for making the cocktial */
        let cocktailInstructions = cocktailData.drinks[0]["strInstructions"];

        /* Construct the HTML to view in index.html */
        let cocktailHtml = `
        <h1 class="h1">${cocktailName}</h1>
        <img src="${cocktailImage}" alt="${cocktailName}">
        <ul>${ingredientsHTML}</ul>
        <p>${cocktailInstructions}</p>
        `;
            
        /* Pass the HTML to the div the-data in  */
        document.getElementById("the-data").innerHTML = cocktailHtml;

    };
};
request.send();