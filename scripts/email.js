
let cocktailName = localStorage.getItem('cocktailName');
let cocktailIngredients = localStorage.getItem('cocktailIngredients');
let cocktailInstructions = localStorage.getItem('cocktailInstructions');

document.getElementById('text-name').innerText = cocktailName;
document.getElementById('text-ingredients').innerText = cocktailIngredients;
document.getElementById('text-instructions').innerText = cocktailInstructions;

console.log(cocktailName);
console.log(cocktailIngredients); 
console.log(cocktailInstructions);

function formSubmit() {
    event.preventDefault();
    emailjs.sendForm("service_r1s6k5e", "template_464i5ds", "#email-form", "user_xuHqhg0d940gXwsJXVA5A")
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
}

const sendForm = document.getElementById('send-instructions');
sendForm.addEventListener('click', formSubmit);
