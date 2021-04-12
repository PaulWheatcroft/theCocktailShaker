/* ----------- Getting the JSON of ingredients from https://www.thecocktaildb.com/ */

let ingredientRequest = new XMLHttpRequest();

ingredientRequest.open('GET', `https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`, true);

/* Get cocktails with the selected ingredients */
ingredientRequest.onload = function(){
    if(this.status === 200){
        ingredientList = JSON.parse(this.responseText);
        console.log(ingredientList);                           
    };    
};
ingredientRequest.send();

/* ----------- capture which input field was clicked */
let inputId = '';

function firstFilter() {
    inputId = 'first';
}
function secondFilter() {
    inputId = 'second';
}

/*construct html of ingredients to li items */

function ingredientSelection(callback) {



    let i = 0;
    let ingredientListItemsHtml = '';
    for (i; i<ingredientList.drinks.length; i++) {
        let ingredientName = ingredientList.drinks[i]["strIngredient1"];
        ingredientListItemsHtml += `<li class="drinks-list ${inputId}-list">${ingredientName}</li>`;           
    }
    let ingredientListHtml = `<ul id="${inputId}-ingredient-list" class="ingredient-list">
    ${ingredientListItemsHtml}
    </ul>
    `
    console.log(ingredientListHtml);

    document.getElementById(`${inputId}-ingredient-list-container`).innerHTML = ingredientListHtml;

    listenIngredientList(callback);
}
/* ----------- When an ingredient in the list is clicked add it to the input */
/* ----------- This function is called back by firstIngredientSelection(callback) */
function listenIngredientList() {

/* ----------- Listen out for the first ingredient input to be clicked */

    let ingredientListItem = document.getElementsByClassName('drinks-list');
    for (let i = 0; i<ingredientListItem.length; i++) {
        ingredientListItem[i].addEventListener('click', ingredientName);
            function ingredientName() {
            let theIngredient = ingredientListItem[i].innerText;
            document.getElementById(`${inputId}-selection`).value = theIngredient;
        }
    }
}

if (document.title === 'the Cocktail Shaker') {
    listenForIngredients()
}

function listenForIngredients() {
    let firstIngredientField = document.getElementById('first-selection');
    firstIngredientField.addEventListener('click', ingredientSelection);

    let secondIngredientField = document.getElementById('second-selection');
    secondIngredientField.addEventListener('click', ingredientSelection);
}

function filterIngredient() {
    let input, filter, li, i, textValue;
    input = document.getElementById(`${inputId}-selection`);
    filter = input.value.toUpperCase();
    li = document.getElementsByClassName(`${inputId}-list`);
    for (i = 0; i < li.length; i++) {        
        textValue = li[i].innerText;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        };
    };
}


let cocktailId = '';
let cocktailName = '';
let cocktailImage = '';
let cocktailHtml = '';
let drinkIndex = 0;
let cocktailInstructions = '';
let cocktailData = '';
let APIURL = '';
let firstIngredient;
let secondIngredient;

function getIngredientsURL() {

        firstIngredient = document.getElementById("first-selection").value;
        secondIngredient = document.getElementById("second-selection").value;

        if (firstIngredient === '' && secondIngredient === '') {
            return;
        } 
        else if (secondIngredient === '') {
            APIURL = `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${firstIngredient}`;  
        } else {
            APIURL = `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${firstIngredient},${secondIngredient}`;  
        }
    
    callAPI(APIURL);    
}

function getRandomeURL() {
    APIURL = 'https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php';
    callAPI(APIURL); 
}

/* ----------- Get cocktails with the selected ingredients */
function callAPI(APIURL) {
    console.log(APIURL);
    let searchingHtml1 = `
    <h1 class="we-are-shaking-it animate__animated animate__fadeIn">We</h1>
    <h1 class="we-are-shaking-it animate__animated animate__fadeIn">Are</h1>
    <h1 class="we-are-shaking-it animate__animated animate__fadeIn">Shaking</h1>
    <h1 class="we-are-shaking-it animate__animated animate__fadeIn">It!!</h1>
    `;
    document.getElementById("information-container").innerHTML = searchingHtml1;
    let searchingHtml2 = `
    <h1 class="we-are-shaking-it animate__animated animate__headShake animate__repeat-3 3">We</h1>
    <h1 class="we-are-shaking-it animate__animated animate__headShake animate__repeat-3 3">Are</h1>
    <h1 class="we-are-shaking-it animate__animated animate__headShake animate__repeat-3 3">Shaking</h1>
    <h1 class="we-are-shaking-it animate__animated animate__headShake animate__repeat-3 3">It!!</h1>
    `;
    setTimeout(function(){
        document.getElementById("information-container").innerHTML = searchingHtml2;
        }, 500);

    let request = new XMLHttpRequest();

    request.open('GET', `${APIURL}`, true);


    request.onload = function(){
        if(this.status === 200){
            cocktailData = JSON.parse(this.responseText);          
        };
    };
    request.send();

    setTimeout(initiateCocktails, 3000)    
}


function previousCocktail() {
    drinkIndex = drinkIndex - 1;
    loadCocktail();
}

function nextCocktail() {
    drinkIndex = drinkIndex + 1;    
    loadCocktail();
}


function initiateCocktails() {
    
    if (cocktailData.drinks[drinkIndex]["strDrink"] === undefined) {
        document.getElementById("information-container").className = 'did-not-find animate__animated animate__fadeIn';
        noCocktailsHtml = `
        <h1 class"no-more">I couldn't find anything with both choices</h1>
        <p>So how about I suggest something for either ${firstIngredient} or ${secondIngredient}?</p>
        <button id="first-search-again" class="buttons blue-button">Search with <br> ${firstIngredient}</button>
        <button id="second-search-again" class="buttons green-button">Search with <br> ${secondIngredient}</button>
        `;
        document.getElementById("information-container").innerHTML = noCocktailsHtml;

        document.getElementById('first-search-again').onclick = function() {
            APIURL = `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${firstIngredient}`;  
            callAPI(APIURL);
        };
        document.getElementById('second-search-again').onclick = function() {
            APIURL = `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${secondIngredient}`;  
            callAPI(APIURL);
        }; 

    } else {
        loadCocktail();
    }
}

/* ----------- show the selection of cocktail */
function loadCocktail() {
    document.getElementById("information-container").className = '';
        
/* ----------- Get the name and the image of the cocktail */
    cocktailId = cocktailData.drinks[drinkIndex]["idDrink"];
    cocktailName = cocktailData.drinks[drinkIndex]["strDrink"];
    cocktailImage = cocktailData.drinks[drinkIndex]["strDrinkThumb"];

/* ----------- Set the navigation buttons to disabled if applicable */

    if (Object.keys(cocktailData.drinks).length === 1) {
        cocktailNavButtons = `
        <button id="click-back" class="pointer pointer-left pointer-disabled" onclick="previousCocktail()" disabled><i class="fas fa-hand-point-left"></i></button>
        <button id="home" class="pointer pointer-home"><a href="index.html"><i class="fas fa-home"></i></a></button>
        <button id="show-how" class="pointer pointer-middle"><i class="fas fa-info"></i></button>
        <button id="click-next" class="pointer pointer-right pointer-disabled" onclick="nextCocktail()" disabled><i class="fas fa-hand-point-right"></i></button>
        `
    } else if (drinkIndex === 0) {
        cocktailNavButtons = `
        <button id="click-back" class="pointer pointer-left pointer-disabled" onclick="previousCocktail()" disabled><i class="fas fa-hand-point-left"></i></button>
        <button id="home" class="pointer pointer-home"><a href="index.html"><i class="fas fa-home"></i></a></button>
        <button id="show-how" class="pointer pointer-middle"><i class="fas fa-info"></i></button>
        <button id="click-next" class="pointer pointer-right" onclick="nextCocktail()"><i class="fas fa-hand-point-right"></i></button>
        `
    } else if (drinkIndex === (Object.keys(cocktailData.drinks).length - 1)) {
        document.getElementById("information-container").className = 'random-no-more animate__animated animate__fadeIn';
        cocktailNavButtons = `
        <button id="click-back" class="pointer pointer-left" onclick="previousCocktail()"><i class="fas fa-hand-point-left"></i></button>
        <button id="home" class="pointer pointer-home"><a href="index.html"><i class="fas fa-home"></i></a></button>
        <button id="show-how" class="pointer pointer-middle pointer-disabled" disabled><i class="fas fa-info"></i></button>
        <button id="click-next" class="pointer pointer-right pointer-disabled" onclick="nextCocktail()" disabled><i class="fas fa-hand-point-right"></i></button>
        <h1>We've got to the end of that little selection</h1>
        <p>Didn't anything tickle your fancy? How about I show you some more? Perhaps you've got something in mind now?</p>
        <div class="button-container">
        <button class="buttons blue-button"><a href="random.html">Show me a random selection</a></button>
        <button class="buttons green-button"><a href="ingredients.html">Let me choose ingredients</a></button>
        </div>
        `;
        document.getElementById("information-container").innerHTML = cocktailNavButtons;
        return;
    } else {
        cocktailNavButtons = `
        <button id="click-back" class="pointer pointer-left" onclick="previousCocktail()"><i class="fas fa-hand-point-left"></i></button>
        <button id="home" class="pointer pointer-home"><a href="index.html"><i class="fas fa-home"></i></a></button>
        <button id="show-how" class="pointer pointer-middle"><i class="fas fa-info"></i></button>
        <button id="click-next" class="pointer pointer-right" onclick="nextCocktail()"><i class="fas fa-hand-point-right"></i></button>
        `
    }


/* ----------- Construct the HTML to view output */
    cocktailHtml = `
    <div id="nav-buttons">
    ${cocktailNavButtons}
    </div>         
    <div id="select-cocktail" class="animate__animated animate__fadeIn">    
    <img src="${cocktailImage}" alt="${cocktailName}" class="drinks-image">
    <h1 class="h1 cocktail-title">${cocktailName}</h1>
    <h2 id="cocktail-id">${cocktailId}</h2>
    <h2 id="cocktail-position">${drinkIndex}</h2>
    </div>        
    `;
        
/* ----------- Pass the HTML to the div the-data and increment drinkIndex  */
    /*document.getElementById("information-container").className = ''; */
    document.getElementById("information-container").innerHTML = cocktailHtml;
    let showHowCocktails = document.getElementById('show-how');
    showHowCocktails.addEventListener('click', getHow);

};



/* ----------- get how to make the cocktail */
function getHow() {
    cocktailPositionInArray = document.getElementById('cocktail-position').textContent;


    let howToRequest = new XMLHttpRequest();

    howToRequest.open('GET', `https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${cocktailId}`, true);

    howToRequest.onload = function(){
        if(this.status === 200){
            let cocktailHowToData = JSON.parse(this.responseText);
            console.log(cocktailHowToData);
        
/* ----------- Get the name and the image of the cocktail to make */
            cocktailInstructions = cocktailHowToData.drinks[0]["strInstructions"];

/* ----------- Set the arrays to contain the ingredients and measurements */
            const cocktailIngredients = [];
            const cocktailMeasurements = [];
            let cocktailIndividualIngredient = '';
            let cocktailIngredientMeasure = '';
            
/* ----------- go through the properties of the object*/
            for (let property in cocktailHowToData.drinks[0]){
            
/* ----------- Select all properties that start with strIngredient and push in to cocktailIngredients array */
            if(property.startsWith('strIngredient') && cocktailHowToData.drinks[0][property] !== null){
                cocktailIndividualIngredient = cocktailHowToData.drinks[0][property]; 
                cocktailIngredients.push(cocktailIndividualIngredient);
            }
/* ----------- Select all properties that start with strMeasure and push in to ocktailMeasurements array */
            if(property.startsWith('strMeasure') && cocktailHowToData.drinks[0][property] !== null){
                cocktailIngredientMeasure = cocktailHowToData.drinks[0][property];
                cocktailMeasurements.push(cocktailIngredientMeasure);
            };    
            };

/* ----------- Loop through the cocktail ingredients and created list items that includes the corresponding measurement */
/* ----------- handle measurements that are "undefined" due to fewer entries in array */
            let ingredientList = 0;
            let ingredientsHtml = '';
            let ingredientsText = '';
            for (ingredientList; ingredientList < cocktailIngredients.length; ingredientList++) {
                if (cocktailMeasurements[ingredientList] === undefined && cocktailIngredients !== undefined) {
                    ingredientsHtml += `<li>${cocktailIngredients[ingredientList]}</li>`;
                    ingredientsText += cocktailIngredients[ingredientList] + '\n';
                } else {
                if (cocktailMeasurements[ingredientList] !== undefined && cocktailIngredients !== undefined);
                    ingredientsHtml += `<li>${cocktailMeasurements[ingredientList]} ${cocktailIngredients[ingredientList]}</li>`;
                    ingredientsText += cocktailMeasurements[ingredientList] + '' + cocktailIngredients[ingredientList] + '\n';
                };
            };

/* ----------- Construct the HTML to view how to make the cocktail */
            let cocktailToMakeHtml = `
            <div id="nav-buttons">
            <button id="go-back" class="pointer pointer-left" onclick="previousCocktail()"><i class="fas fa-hand-point-left"></i></button>
            <button id="email-me" class="pointer pointer-middle"><a href="email.html"><i class="fas fa-envelope"></i></a></button>
            <button id="click-next" class="pointer pointer-right pointer-disabled" disabled><i class="fas fa-hand-point-right"></i></button>
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
                
/* ----------- Pass the HTML to the div the-ingredient-data */
            localStorage.setItem('cocktailName', cocktailName);
            localStorage.setItem('cocktailIngredients', ingredientsText);
            localStorage.setItem('cocktailInstructions', cocktailInstructions);
            document.getElementById("information-container").innerHTML = cocktailToMakeHtml;
            drinkIndex = drinkIndex + 1;
        };
    };
    howToRequest.send();
};

if (document.title === 'Random Cocktails - the Cocktail Shaker') {
    getRandomeURL()
}


