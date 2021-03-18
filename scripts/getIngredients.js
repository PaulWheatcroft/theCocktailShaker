

function getIngredientsURL() {
    let firstIngredient = document.getElementById("first-selection").value;
    let APIURL = `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${firstIngredient}`;  
    callAPI(APIURL);    
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
            <img src="${cocktailImage}" alt="${cocktailName}" class="drinks-image">
            <h1 class="h1 cocktail-title">${cocktailName}</h1>
            <button id="clickNext">Next</button>
            `;
                
            /* Pass the HTML to the div the-data and increment drinkIndex  */
            document.getElementById("the-data").innerHTML = cocktailHtml;
            drinkIndex = drinkIndex + 1;

            let nextCocktail = document.getElementById('clickNext');
            nextCocktail.addEventListener('click', showCocktail)

            }
            showCocktail();


            
        };    
    };
    request.send();
}

let haveIngredientsCocktails = document.getElementById('show-me');
haveIngredientsCocktails.addEventListener('click', getIngredientsURL)

