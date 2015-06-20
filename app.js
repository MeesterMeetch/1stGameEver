$(document).ready(function() {
  
});

console.log("hello constructors!");

function Character(options) {
  // body...
  this.name = options.name;
  this.ability = options.ability || "swim 3ft";
};
