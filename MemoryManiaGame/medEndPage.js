checker = 10;
window.onload = function() {
  var errors = localStorage.getItem('Errors');
  var matches = localStorage.getItem("Matches");
  var moves = localStorage.getItem("Moves");
  //using the values from the local storage, we display the values on the end page
  document.getElementById("errors").textContent = "Errors: " + errors; 
  document.getElementById("moves").textContent = "Moves: " + moves;
  document.getElementById("matches").textContent = "Matches: " + matches;

  //we also display a message for the user based on if they completed matching all the symbols or not
  var messageElement = document.getElementById("message");

  if (matches < checker) {
    messageElement.textContent = "Try Again?";
  } else if (matches == checker) {
    messageElement.textContent = "Congratulations!";
  }
}