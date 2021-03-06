/* ----------- Get the JSON list of ingredients from https://www.thecocktaildb.com/ */

let ingredientRequest = new XMLHttpRequest();
let ingredientList;
ingredientRequest.open('GET', `https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list`, true);

/* Get cocktails with the selected ingredients */
ingredientRequest.onload = function(){
    if(this.status === 200){
        ingredientList = JSON.parse(this.responseText);                         
    }    
};
ingredientRequest.send();

/* ----------- capture which input field was clicked */
let inputId = '';
function firstFilter() {
    inputId = 'first';
    ingredientSelection();
}
function secondFilter() {
    inputId = 'second';
    ingredientSelection();
}
/* ----------- construct html of ingredients to li items */
let ingredientsArray = [];
function ingredientSelection() {
    let i = 0;
    let ingredientListItemsHtml = '';
    for (i; i<ingredientList.drinks.length; i++) {
        let ingredientName = ingredientList.drinks[i].strIngredient1;
        ingredientListItemsHtml += `<li class="drinks-list ${inputId}-list">${ingredientName}</li>`;
        ingredientsArray.push(ingredientName.toUpperCase());
    }
    let ingredientListHtml = `<ul id="${inputId}-ingredient-list" class="ingredient-list">
    ${ingredientListItemsHtml}
    </ul>
    `;
    document.getElementById(`${inputId}-ingredient-list-container`).innerHTML = ingredientListHtml;
    listenIngredientList();
}
/* ----------- When an ingredient in the list is clicked add it to the input */
function listenIngredientList() {
    let ingredientListItem = document.getElementsByClassName(`${inputId}-list`);
    let theIngredient = '';    
    for (let i = 0; i<ingredientListItem.length; i++) {
        ingredientListItem[i].addEventListener('click', ingredientName);       
    }
    function ingredientName() {
        if (this.parentNode.id === 'first-ingredient-list') {
            theIngredient = this.innerText;
            document.getElementById('first-selection').value = theIngredient;    
        } else {

            theIngredient = this.innerText;
            document.getElementById('second-selection').value = theIngredient;       
        }
    }
}
/* ----------- This function filters the list as text is entered */
function filterIngredient() {
    let input, filter, li, textValue, i;
    input = document.getElementById(`${inputId}-selection`);
    filter = input.value.toUpperCase();
    li = document.getElementsByClassName(`${inputId}-list`);
    for (i = 0; i < li.length; i++) {        
        textValue = li[i].innerText;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
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
/* ----------- Set the API URL based on which input or both inputs contain information */
/* ----------- Catch any errors and display them to the user */
function getIngredientsURL() {
        firstIngredient = document.getElementById("first-selection").value;
        secondIngredient = document.getElementById("second-selection").value;
        if (firstIngredient === '') {
            document.getElementById('error-message').innerHTML = `<p>The first ingredient cannot be blank</p>`;
            document.getElementById('error-message').className = 'visible-error-message animate__animated animate__fadeIn';
            return;
        } else if (ingredientsArray.includes(firstIngredient.toUpperCase()) && secondIngredient === '') {
            APIURL = `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${firstIngredient}`; 
        } else if (ingredientsArray.includes(firstIngredient.toUpperCase()) === false && ingredientsArray.includes(secondIngredient.toUpperCase()) || secondIngredient === '') {
            document.getElementById('error-message').innerHTML = `<p>It looks like the first ingredient is mispelt</p>`;
            document.getElementById('error-message').className = 'visible-error-message animate__animated animate__fadeIn';
            return;
        } else if (ingredientsArray.includes(firstIngredient.toUpperCase()) === false && ingredientsArray.includes(secondIngredient.toUpperCase()) === false) {
            document.getElementById('error-message').innerHTML = `<p>It looks like both ingredients are mispelt</p>`;
            document.getElementById('error-message').className = 'visible-error-message animate__animated animate__fadeIn';
            return;
        } else if (firstIngredient.toUpperCase() === secondIngredient.toUpperCase()) {
            document.getElementById('error-message').innerHTML = `<p>It looks like both ingredients are the same</p>`;
            document.getElementById('error-message').className = 'visible-error-message animate__animated animate__fadeIn';
            return;
        }else if (ingredientsArray.includes(firstIngredient.toUpperCase()) && ingredientsArray.includes(secondIngredient.toUpperCase()) === false) {
            document.getElementById('error-message').innerHTML = `<p>It looks like the second ingredient is mispelt</p>`;
            document.getElementById('error-message').className = 'visible-error-message animate__animated animate__fadeIn';
            return;
        } else {
            APIURL = `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${firstIngredient},${secondIngredient}`;  
        } 
    document.getElementById('error-message').className = 'hidden-error-message animate__animated animate__fadeIn';   
    callAPI(APIURL);    
}
/* ----------- If the API call is from random.html this is the URL it will use */
function getRandomeURL() {
    APIURL = 'https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php';
    callAPI(APIURL); 
}
/* ----------- Get cocktails with the selected ingredients */
function callAPI(APIURL) {
    document.getElementById('information-container').className = '';
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
 /* ----------- now get all the cocktails returned in the selection */       
    let request = new XMLHttpRequest();
    request.open('GET', `${APIURL}`, true);
    request.onload = function(){
        if(this.status === 200){
            cocktailData = JSON.parse(this.responseText);          
        }
    };
    request.send();
    setTimeout(initiateCocktails, 3000);  
}
/* ----------- function to handle the initial display of cocktails */
/* ----------- Also handles if nothing was returned */  
function initiateCocktails() {    
    if (cocktailData.drinks[drinkIndex].strDrink === undefined) {
        document.getElementById("information-container").className = 'did-not-find animate__animated animate__fadeIn';
        if (secondIngredient === '' || secondIngredient === firstIngredient) {
            let noCocktailsHtml = `
            <nav id="click-back" class="pointer pointer-left pointer-disabled" aria-label="Previous Cocktail"><i class="fas fa-hand-point-left"></i></nav>
            <a href="index.html"><nav id="home" class="pointer pointer-home" aria-label="Home"><i class="fas fa-home tooltip"><span class="tooltiptext">Home</span></i></nav></a>
            <nav id="show-how" class="pointer pointer-information pointer-disabled" aria-label="Show Ingredients"><i class="fas fa-info"></i></nav>
            <nav id="click-next" class="pointer pointer-right pointer-disabled" aria-label="Next Cocktail"><i class="fas fa-hand-point-right"></i></nav>
            <h1 class="no-more">I'm afraid I'm not sure what happened there</h1>
            <p>It seems like we don't actually have any cocktails that use ${firstIngredient}. Please accept my apology and I will try again. Let me know what you would like to do.</p>
            <div id="context-buttons">
            <a href="ingredients.html" class="buttons button-float-left green-button">Let me choose ingredients</a>
            <a href="random.html" class="buttons button-float-right blue-button">Show me a random selection</a>
            </div>
            `;
            document.getElementById("information-container").innerHTML = noCocktailsHtml;
            return;
        }
        let noCocktailsHtml = `
        <nav id="click-back" class="pointer pointer-left pointer-disabled" aria-label="Previous Cocktail"><i class="fas fa-hand-point-left"></i></nav>
        <a href="index.html"><nav id="home" class="pointer pointer-home" aria-label="Home"><i class="fas fa-home tooltip"><span class="tooltiptext">Home</span></i></nav></a>
        <nav id="show-how" class="pointer pointer-information pointer-disabled" aria-label="Show Ingredients"><i class="fas fa-info"></i></nav>
        <nav id="click-next" class="pointer pointer-right pointer-disabled" aria-label="Next Cocktail"><i class="fas fa-hand-point-right"></i></nav>
        <h1 class="no-more">I couldn't find anything with both choices</h1>
        <p>So how about I suggest something for either ${firstIngredient} or ${secondIngredient}?</p>
        <div id="context-buttons">
        <div id="first-search-again" class="buttons button-float-left blue-button">Search with <br> ${firstIngredient}</div>
        <div id="second-search-again" class="buttons button-float-right green-button">Search with <br> ${secondIngredient}</div>
        </div>
        `;
        document.getElementById("information-container").innerHTML = noCocktailsHtml;
        document.getElementById('first-search-again').onclick = function() {
            APIURL = `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${firstIngredient}`;
/* ----------- Making the secondIngredient the same as the firstIngredient single ingredients that don't return cocktails */
/* ----------- can be identified in the if statement at the top of the fuction (secondIngredient === firstIngredient) */ 
/* ----------- This is a bug in the API */
            secondIngredient = firstIngredient;
            callAPI(APIURL);
        };
        document.getElementById('second-search-again').onclick = function() {
            APIURL = `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${secondIngredient}`;
/* ----------- Making the firstIngredient the same as the secondIngredient single ingredients that don't return cocktails */
/* ----------- can be identified in the if statement at the top of the fuction (secondIngredient === firstIngredient) */ 
/* ----------- This is a bug in the API */ 
            firstIngredient = secondIngredient;
            callAPI(APIURL);
        }; 
    } else {
        loadCocktail();
    }
}
/* ----------- For navigating through the cocktails */  
function previousCocktail() {
    drinkIndex = drinkIndex - 1;
    loadCocktail();
}
function nextCocktail() {
    drinkIndex = drinkIndex + 1;    
    loadCocktail();
}
/* ----------- show the selection of cocktail */
function loadCocktail() {
    document.getElementById("information-container").className = '';
    let cocktailNavButtons = '';
/* ----------- Get the ID, name and the image of the cocktail if available */
    if (drinkIndex < Object.keys(cocktailData.drinks).length) {
        cocktailId = cocktailData.drinks[drinkIndex].idDrink;
        cocktailName = cocktailData.drinks[drinkIndex].strDrink;
        cocktailImage = cocktailData.drinks[drinkIndex].strDrinkThumb;
    }       
/* ----------- Set the navigation buttons to disabled if applicable */
    if (drinkIndex === 0) {
        cocktailNavButtons = `
        <nav id="click-back" class="pointer pointer-left pointer-disabled" aria-label="Previous Cocktail"><i class="fas fa-hand-point-left"></i></nav>
        <a href="index.html"><nav id="home" class="pointer pointer-home" aria-label="Home"><i class="fas fa-home tooltip"><span class="tooltiptext">Home</span></i></nav></a>
        <nav id="show-how" class="pointer pointer-information animate__animated  animate__headShake animate__delay-1s animate__repeat-3" aria-label="Show Ingredients"><i class="fas fa-info tooltip"><span class="tooltiptext">Show Ingredients</span></i></nav>
        <nav id="click-next" class="pointer pointer-right" onclick="nextCocktail()" aria-label="Next Cocktail"><i class="fas fa-hand-point-right tooltip"><span class="tooltiptext">Next Cocktail</span></i></nav>
        `;
    } else if (drinkIndex === Object.keys(cocktailData.drinks).length) {
        document.getElementById("information-container").className = 'random-no-more animate__animated animate__fadeIn';
        cocktailNavButtons = `
        <nav id="click-back" class="pointer pointer-left" onclick="previousCocktail()" aria-label="Previous Cocktail"><i class="fas fa-hand-point-left tooltip"><span class="tooltiptext">Previous Cocktail</span></i></nav>
        <a href="index.html"><nav id="home" class="pointer pointer-home" aria-label="Home"><i class="fas fa-home tooltip"><span class="tooltiptext">Home</span></i></nav></a>
        <nav id="show-how" class="pointer pointer-information pointer-disabled" aria-label="Show Ingredients"><i class="fas fa-info"></i></nav>
        <nav id="click-next" class="pointer pointer-right pointer-disabled" aria-label="Next Cocktail"><i class="fas fa-hand-point-right"></i></nav>
        <h1>We've got to the end of that little selection</h1>
        <p>Didn't anything tickle your fancy? How about I show you some more? Perhaps you've got something in mind now?</p>
        <div id="context-buttons">
        <a href="random.html" class="buttons button-float-left blue-button">Show me a random selection</a>
        <a href="ingredients.html" class="buttons button-float-right green-button">Let me choose ingredients</a>
        </div>
        `;
        document.getElementById("information-container").innerHTML = cocktailNavButtons;
        return;
    } else {
        cocktailNavButtons = `
        <nav id="click-back" class="pointer pointer-left" onclick="previousCocktail()" aria-label="Previous Cocktail"><i class="fas fa-hand-point-left tooltip"><span class="tooltiptext">Previous Cocktail</span></i></nav>
        <a href="index.html"><nav id="home" class="pointer pointer-home" aria-label="Home"><i class="fas fa-home tooltip"><span class="tooltiptext">Home</span></i></nav></a>
        <nav id="show-how" class="pointer pointer-information animate__animated  animate__headShake animate__delay-1s animate__repeat-3" aria-label="Show Ingredients"><i class="fas fa-info tooltip"><span class="tooltiptext">Show Ingredients</span></i></nav>
        <nav id="click-next" class="pointer pointer-right" onclick="nextCocktail()" aria-label="Next Cocktail"><i class="fas fa-hand-point-right tooltip"><span class="tooltiptext">Next Cocktail</span></i></nav>
        `;
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
/* ----------- Pass the HTML to the div information-container  */
    document.getElementById("information-container").innerHTML = cocktailHtml;
    let showHowCocktails = document.getElementById('show-how');
    showHowCocktails.addEventListener('click', getHow);
}
/* ----------- get how to make the cocktail from TheCocktailDB API  */
function getHow() {
    let howToRequest = new XMLHttpRequest();
    howToRequest.open('GET', `https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${cocktailId}`, true);
    howToRequest.onload = function(){
        if(this.status === 200){
            let cocktailHowToData = JSON.parse(this.responseText);       
/* ----------- Get the name and the image of the cocktail to make */
            cocktailInstructions = cocktailHowToData.drinks[0].strInstructions;
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
/* ----------- Select all properties that start with strMeasure and push in to cocktailMeasurements array */
            else if(property.startsWith('strMeasure') && cocktailHowToData.drinks[0][property] !== null){
                cocktailIngredientMeasure = cocktailHowToData.drinks[0][property];
                cocktailMeasurements.push(cocktailIngredientMeasure);
            }   
        }
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
                }
            }
/* ----------- Construct the HTML to view how to make the cocktail */
            let cocktailToMakeHtml = `
            <div id="nav-buttons">
                <nav id="go-back" class="pointer pointer-left" onclick="previousCocktail()" aria-label="Back to Cocktails"><i class="fas fa-hand-point-left tooltip"><span class="tooltiptext">Previous Cocktail</span></i></nav>
                <a href="index.html"><nav id="home" class="pointer pointer-home" aria-label="Home"><i class="fas fa-home tooltip"><span class="tooltiptext">Home</span></i></nav></a>
                <a href="email.html" ><nav id="email-me" class="pointer pointer-information" aria-label="Email the Instructions"><i class="fas fa-envelope tooltip"><span class="tooltiptext">Email</span></i></nav></a>
                <nav id="click-next" class="pointer pointer-right pointer-disabled"><i class="fas fa-hand-point-right"></i></nav>
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
/* ----------- Pass the HTML to the div the-ingredient-data and set text instructions  */
/* ----------- to local variables so they are accessible from the email.html page */
            localStorage.setItem('cocktailName', cocktailName);
            localStorage.setItem('cocktailIngredients', ingredientsText);
            localStorage.setItem('cocktailInstructions', cocktailInstructions);
            document.getElementById("information-container").innerHTML = cocktailToMakeHtml;
            drinkIndex = drinkIndex + 1;
        }
    };
    howToRequest.send();
}
/* ----------- call getRandomeURL when random.html is loaded  */
if (document.title === 'Random Cocktails - the Cocktail Shaker') {
    getRandomeURL();
}


