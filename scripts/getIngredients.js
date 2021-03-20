function getIngredientsURL() {
    let firstIngredient = document.getElementById("first-selection").value;
    let APIURL = `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${firstIngredient}`;  
    callAPI(APIURL);    
}

function getHow() {
    let howRequest = new XMLHttpRequest();

    console.log(cocktailId);

    howRequest.open('GET', `https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${cocktailId}`, true);

    howRequest.send();
}

function callAPI(APIURL) {
    console.log(APIURL);

    let request = new XMLHttpRequest();

    request.open('GET', `${APIURL}`, true);
    request.onload = function(){
        if(this.status === 200){
            let cocktailData = JSON.parse(this.responseText);
            console.log(cocktailData);

            let drinkIndex = 0;

            function showCocktail() {
                if (drinkIndex > 9) {
                let noMoreHtml = `
                <h1>There are no more drinks to show you</h1>
                `;
                document.getElementById("the-data").innerHTML = noMoreHtml;
                }
            
                
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
            document.getElementById("the-data").innerHTML = cocktailHtml;
            drinkIndex = drinkIndex + 1;

            let nextCocktail = document.getElementById('click-next');
            nextCocktail.addEventListener('click', showCocktail);
            let showHowCocktails = document.getElementById('show-how');
            showHowCocktails.addEventListener('click', getHow);

            }
            showCocktail();            
        };    
    };
    request.send();
}

let haveIngredientsCocktails = document.getElementById('show-me');
haveIngredientsCocktails.addEventListener('click', getIngredientsURL)

