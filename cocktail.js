let request = new XMLHttpRequest();
request.open('GET', 'https://www.thecocktaildb.com/api/json/v2/9973533/random.php', true);

request.onload = function(){
    if(this.status === 200){
        let cocktailData = JSON.parse(this.responseText);
        console.log(cocktailData);


    };
};
request.send();