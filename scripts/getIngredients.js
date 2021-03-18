

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
        };    
    };
    request.send();
}

let haveIngredientsCocktails = document.getElementById('show-me');
haveIngredientsCocktails.addEventListener('click', getIngredientsURL)

