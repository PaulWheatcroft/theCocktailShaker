function startEmailjs() {
    emailjs.init("user_xuHqhg0d940gXwsJXVA5A");
};

startEmailjs();


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
    emailjs.sendForm(
        "service_r1s6k5e",
        "template_464i5ds",
        "#email_form",
        "user_xuHqhg0d940gXwsJXVA5A"
    )
}

document.getElementById('send-instructions').click = formSubmit();
