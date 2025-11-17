function shufflesymbols() {
  symbolsSet.sort(() => Math.random() - 0.5);
}

function startGame(symbolsSet) {
  for (let r = 0; r < 4; r++) { // each iteration represents a row in the game board
    let row = [];              // new empty array named row is initialized
    for (let c = 0; c < columns; c++) { // another loop begins inside the first loop, iterating based on the number of columns
      if (symbolsSet.length > 0) {      // function checks if there are still symbols available by checking its length
        let symbolImg = symbolsSet.pop(); // if available, the function removes the last symbol from symbolsSet using pop()
                                          //  and adds it to the row array; pop() both retrieves and removes the 
                                          //  last element of the array.
        row.push(symbolImg);

        let symbol = document.createElement("img");    // img element is created using document.createElement()
        symbol.id = r.toString() + "-" + c.toString(); // new image element is created
        symbol.src = symbolImg + ".png";
        symbol.classList.add("symbol");
        symbol.addEventListener("click", selectSymbol); // event listener is added to the symbolImg, so when it's clicked,
                                                        //   the function selectSymbol will be triggered
        document.getElementById("game").append(symbol); // image element is appended to the HTML element with the ID game
                                                        //   adding it to the game board
      } else {
        console.error("Not enough symbols in the set");
        return; // exit the function early if there are not enough symbols
      }
    }
    game.push(row);
  }

  console.log(game);
  setTimeout(hideSymbols, 1000);
}

function hideSymbols() {
  for (let r = 0; r < columns; r++) { // loop iterates through each row of the game board
    for (let c = 0; c < columns; c++) { // nested loop iterates through each column for the current row
      let symbol = document.getElementById(r.toString() + "-" + c.toString()); // constructs an ID using the current row and column indices which identifies each image element on the board
      symbol.src = "back.png"; // sets the src attribute of the selected image element to back.png to hide the symbol
    }
  }
}

// used this resource to help with extracting the row and column of the symbol's location: https://www.youtube.com/watch?v=wz9jeI9M9hI
function selectSymbol() {
  if (this.src.includes("back")) { // checks if the source of the clicked image includes the substring back
    if (!symbol1Selected) {
      symbol1Selected = this; // if no first symbol has been selected yet, the current symbol becomes the first selected symbol

      let coords = symbol1Selected.id.split("-"); // the function then parses the id of the selected symbol to extract the row and column where the symbol is located
      let r = parseInt(coords[0]);
      let c = parseInt(coords[1]);

      symbol1Selected.src = game[r][c] + ".png"; // source of the image is updated to show the symbol face
    } else if (!symbol2Selected && this != symbol1Selected) { // checks if no second symbol and ensures the same symbol is not selected twice 
      symbol2Selected = this;

      let coords = symbol2Selected.id.split("-"); // it parses the id of the symbol to find its position and updates its source to show the symbol face
      let r = parseInt(coords[0]);
      let c = parseInt(coords[1]);

      symbol2Selected.src = game[r][c] + ".png";
      setTimeout(update, 1000)
    }
  }
}

// used this source to add a border when the user selects a pair: https://stackoverflow.com/questions/40199323/change-border-color-javascript
function update() {
  if (symbol1Selected.src !== symbol2Selected.src) { // If the pair that the user chose does not match
    symbol1Selected.style.border = "3px solid #BC1823"; // The border is changed to red
    symbol2Selected.style.border = "3px solid #BC1823";

    setTimeout(function() {
      symbol1Selected.style.border = "none"; // The border is gone if the match is found
      symbol2Selected.style.border = "none";

      setTimeout(function() {
        symbol1Selected.src = "back.png"; // The border is gone and the symbols are hidden if the match is not found
        symbol2Selected.src = "back.png";

        setTimeout(function() {
          symbol1Selected = null; // The border is gone and the symbols are hidden if nothing is chosen
          symbol2Selected = null;
        }, 250);
      }, 0);
    }, 250);

    errors++; // Increment the number of mistakes by 1 and show that on the page
    document.getElementById("errors").textContent = "Errors: " + errors;
    localStorage.setItem("Errors", errors);

    moves++; // Increment the number of moves by 1 once a mistake happens
    document.getElementById("moves").textContent = "Moves: " + moves;
    localStorage.setItem("Moves", moves);
  } else {
    symbol1Selected.style.border = "3px solid #29741D"; // The border is changed to green
    symbol2Selected.style.border = "3px solid #29741D";
    matches++; // Increment the number of matches by 1
    document.getElementById("matches").textContent = "Matches: " + matches;
    localStorage.setItem("Matches", matches);

    moves++; // Increment the number of moves by 1 once a match happens
    document.getElementById("moves").textContent = "Moves: " + moves;
    localStorage.setItem("Moves", moves);

    setTimeout(function() {
      symbol1Selected.style.border = "none";
      symbol2Selected.style.border = "none";
      symbol1Selected = null;
      symbol2Selected = null;
    }, 250);
  }
}

var countdownTime; // variable to store the time left in the countdown
document.getElementById('countdown').innerHTML = countdownTime;
var countdownInterval = setInterval(function() {
  countdownTime--; // time decreases by 1 every second
  document.getElementById('countdown').innerHTML = countdownTime;

  if (matches == checker) { // If the number of matches is equal to the number of symbols in the set, the game is won
    if (matches == 8) {
      document.location.href = 'endPageEasy.html';
    } else if (matches == 10) {
      document.location.href = 'endPageMedium.html';
    } else if (matches == 12) {
      document.location.href = 'endPageHard.html';
    }
  } else if (countdownTime <= 0) { // If timer runs out before user finishes, the game is lost
    clearInterval(countdownInterval);
    document.getElementById('countdown').innerHTML = "Done!";
    if (checker == 8 && matches < 8) {
      document.location.href = 'endPageEasy.html';
    } else if (checker == 10 && matches < 10) {
      document.location.href = 'endPageMedium.html';
    } else if (checker == 12 && matches < 12) {
      document.location.href = 'endPageHard.html';
    }
  }
}, 1000);
// each level has an assigned end page, which is displayed when the user wins or loses the game