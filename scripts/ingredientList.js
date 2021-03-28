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

function firstIngredientSelection() {
        /* Get the name of the ingredients */
            let i = 0;
            let ingredientListItemsHtml = '';
            for (i; i<ingredientList.drinks.length; i++) {
                let ingredientName = ingredientList.drinks[i]["strIngredient1"];
                ingredientListItemsHtml += `<li>${ingredientName}</li>`;            
            }
            let ingredientListHtml = `<ul id="ingredient-list">
            ${ingredientListItemsHtml}
            </ul>
            `
            console.log(ingredientListHtml);

            document.getElementById('first-ingredient-filter').innerHTML = ingredientListHtml;
}

function listenIngredientList() {
    let ingredientListItem = document.getElementsByClassName('drinks-list');
    for (let i = 0; i<ingredientListItem.length; i++) {
        ingredientListItem[i].addEventListener("click", ingredientName);
            function ingredientName() {
            let theIngredient = ingredientListItem[i].innerText;
            document.getElementById('first-selection').value = theIngredient;
        }
    }
}

let firstIngredientField = document.getElementById('first-selection');
firstIngredientField.addEventListener("click", firstIngredientSelection);

