
let randomRequest = new XMLHttpRequest();

/* Get a random cocktail */
randomRequest.open('GET', 'https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php', true);

randomRequest.onload = function(){
    if(this.status === 200){
        let cocktailData = JSON.parse(this.responseText);
        console.log(cocktailData);

        let drinkIndex = 0;

        function loadNewCocktail() {
            
            if (drinkIndex > 9) {
                let noMoreHtml = `
                <h1>There are no more drinks to show you</h1>
                `;
                document.getElementById("information-container").innerHTML = noMoreHtml;
                return;
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
            let cocktailInstructions = cocktailData.drinks[drinkIndex]["strInstructions"];

            /* Construct the HTML to view in index.html */
            let cocktailHtml = `
            <div id="nav-buttons">
            <button id="go-back" class="pointer pointer-left"><i class="fas fa-hand-point-left"></i></button>
            <button id="email-me" class="pointer middle-button"><i class="fas fa-envelope"></i></button>
            <button id="click-next" class="pointer pointer-right"><i class="fas fa-hand-point-right"></i></button>
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
            drinkIndex = drinkIndex + 1;

            let nextCocktail = document.getElementById('click-next');
            nextCocktail.addEventListener('click', loadNewCocktail)
                    
            }   

        loadNewCocktail();
    }

};

randomRequest.send();