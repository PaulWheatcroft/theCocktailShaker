let request = new XMLHttpRequest();

function inputIngredients() {
    inputIngredientsHtml = `

    `;
}

/* Get a random cocktail */
request.open('GET', 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list', true);

request.onload = function(){
    if(this.status === 200){
        let cocktailIngredients = JSON.parse(this.responseText);
        console.log(cocktailIngredients);
    }

};

request.send();