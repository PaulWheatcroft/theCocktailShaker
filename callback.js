function first(callback){
  // Simulate a code delay
  setTimeout( function(){
    console.log(1);
    callback();
  }, 500 );
  
}

function second(){
  console.log(2);
}

first(second);

/* ----------------------------------- */

function doHomework(subject, callback) {
  console.log(`Starting my ${subject} homework.`);
  callback();
}

function finished() {
  console.log('Finished my homework');
};

doHomework('math', finished);