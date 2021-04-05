let cocktailName = localStorage.getItem('cocktailName');
let cocktailIngredients = localStorage.getItem('cocktailIngredients');
let cocktailInstructions = localStorage.getItem('cocktailInstructions');

document.getElementById('text-name').innerText = cocktailName;
document.getElementById('text-ingredients').innerText = cocktailIngredients;
document.getElementById('text-instructions').innerText = cocktailInstructions;

console.log(cocktailName);
console.log(cocktailIngredients); 
console.log(cocktailInstructions);


