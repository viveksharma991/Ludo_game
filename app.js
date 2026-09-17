let chipsPositions = [
  [-6, -6, -6, -6],
  [-6, -6, -6, -6],
  [-6, -6, -6, -6],
  [-6, -6, -6, -6],
];

let road = [
  [
    20, 40, 41, 42, 43, 37, 35, 33, 21, 31, 28, 29, 30, 22, 32, 34, 36, 38, 44,
    45, 46, 23, 47, 48, 50, 60, 24, 59, 58, 57, 56, 62, 64, 66, 25, 68, 71, 70,
    69, 26, 67, 65, 63, 61, 55, 54, 53, 27, 52, 51, 49, 0, 1, 2, 3, 4,
  ],

  [
    22, 32, 34, 36, 38, 44, 45, 46, 23, 47, 48, 50, 60, 24, 59, 58, 57, 56, 62,
    64, 66, 25, 68, 71, 70, 69, 26, 67, 65, 63, 61, 55, 54, 53, 27, 52, 51, 49,
    39, 20, 40, 41, 42, 43, 37, 35, 33, 21, 31, 28, 29, 5, 6, 7, 8, 9,
  ],

  [
    24, 59, 58, 57, 56, 62, 64, 66, 25, 68, 71, 70, 69, 26, 67, 65, 63, 61, 55,
    54, 53, 27, 52, 51, 49, 39, 20, 40, 41, 42, 43, 37, 35, 33, 21, 31, 28, 29,
    30, 22, 32, 34, 36, 38, 44, 45, 46, 23, 47, 48, 50, 14, 13, 12, 11, 10,
  ],

  [
    26, 67, 65, 63, 61, 55, 54, 53, 27, 52, 51, 49, 39, 20, 40, 41, 42, 43, 37,
    35, 33, 21, 31, 28, 29, 30, 22, 32, 34, 36, 38, 44, 45, 46, 23, 47, 48, 50,
    60, 24, 59, 58, 57, 56, 62, 64, 66, 25, 68, 71, 70, 19, 18, 17, 16, 15,
  ],
];

let turn = 0;
let totalPlayer = 4;
let number = 0;
let count6 = 0;
let currentTurn;

let rankings = [];
let gameFinished = false;

// =========================================
// PLAYER NAMES
// =========================================

let playerNames = [
  "Player 1",
  "Player 2",
  "Player 3",
  "Player 4"
];

let gameStarted = false;

renderBoard();
renderChips();
renderDice();
renderPlayerValues();

// function renderDice() {
//   for (let i = 0; i < 4; i++) {
//     document.getElementById("dicebox" + i).innerHTML = "";
//   }

//   currentTurn = turn % totalPlayer;
// let  diceBoxID = "dicebox" + currentTurn;
//   document.getElementById(diceBoxID).innerHTML =
//     '<div class="dice" onclick="diceThrow(' + diceBoxID + ');"></div>';
// }

/* =========================================
   UPDATE PLAYER VALUES
========================================= */

function renderPlayerValues() {
  for (let player = 0; player < 4; player++) {
    let score = 0;

    for (let chip = 0; chip < 4; chip++) {
      let position = chipsPositions[player][chip];

      let valueElement = document.getElementById(
        "p" + (player + 1) + "c" + chip,
      );

      if (!valueElement) continue;

      /* HOME */

      if (position === -6) {
        valueElement.innerHTML = "HOME";

        valueElement.parentElement.classList.remove("active", "finished");

        valueElement.parentElement.classList.add("home");
      } else if (position === 56) {

      /* FINISHED */
        valueElement.innerHTML = "FINISHED";

        valueElement.parentElement.classList.remove("active", "home");

        valueElement.parentElement.classList.add("finished");

        score += 100;
      } else {

      /* BOARD */
        valueElement.innerHTML = position;

        valueElement.parentElement.classList.remove("home", "finished");

        valueElement.parentElement.classList.add("active");

        score += position;
      }
    }

    /* UPDATE SCORE */

    let scoreElement = document.getElementById("p" + (player + 1) + "score");

    if (scoreElement) {
      scoreElement.innerHTML = score;
    }
  }
}

function renderDice() {
  currentTurn = turn % totalPlayer;

  for (let i = 0; i < 4; i++) {
    let diceBox = document.getElementById("dicebox" + i);

    if (!diceBox) continue;

    diceBox.innerHTML = "";

    if (i === currentTurn) {
      diceBox.classList.add("active-dice");

      diceBox.innerHTML =
        '<div class="dice" onclick="diceThrow(document.getElementById(\'dicebox' +
        i +
        "'))\"></div>";
    } else {
      diceBox.classList.remove("active-dice");
    }
  }

  let playerText = document.querySelector(".dice-card p");
  let currentPlayer = document.querySelector(".current-player strong");

  if (playerText) {
    playerText.innerHTML =
  playerNames[currentTurn] + "'s turn";
  }
  if (currentPlayer) {
    currentPlayer.innerHTML = playerNames[currentTurn] + "'s turn";

    let currentPlayerDote =
        document.querySelector(".current-player-dot");

    if (currentPlayerDote) {

        if (currentTurn === 0) {
            currentPlayerDote.innerHTML = "🔴";
        }
        else if (currentTurn === 1) {
            currentPlayerDote.innerHTML = "🟢";
        }
        else if (currentTurn === 2) {
            currentPlayerDote.innerHTML = "🟡";
        }
        else if (currentTurn === 3) {
            currentPlayerDote.innerHTML = "🔵";
        }

    }
  }
}

function hasValidMove(player, diceValue) {

  for (let i = 0; i < 4; i++) {

    let position = chipsPositions[player][i];

    // HOME chip sirf 6 par bahar aa sakti hai
    if (position === -6 && diceValue === 6) {
      return true;
    }

    // Board wali chip
    if (
      position >= 0 &&
      position < 56 &&
      56 - position >= diceValue
    ) {
      return true;
    }
  }

  return false;
}




function diceThrow(diceBoxID) {

  if (gameFinished) return;

  number = Math.ceil(Math.random() * 6);

  if (number === 6) {
    count6++;
  } else {
    count6 = 0;
  }

  // =========================
  // SHOW DICE
  // =========================

  let innerHTML = "";

  innerHTML += '<div class="dice dice' + (number - 1) + '">';

  for (let i = 0; i < number; i++) {
    innerHTML += '<div class="dot dot' + i + '"></div>';
  }

  innerHTML += "</div>";

  diceBoxID.innerHTML = innerHTML;


  // =========================
  // UPDATE BOARD
  // =========================

  renderBoard();
  renderChips();
  renderPlayerValues();


  // =========================
  // CHECK VALID MOVE
  // =========================

  let canMove = hasValidMove(currentTurn, number);


  // =========================
  // NO VALID MOVE
  // =========================

  if (!canMove) {

    setTimeout(function () {

      // 3 consecutive sixes
      if (number === 6 && count6 >= 3) {

        count6 = 0;
        turn++;

      }

      // Normal dice
      else if (number !== 6) {

        turn++;

      }

      // 6 aaya but koi move nahi hai
      // to same player ko dobara chance milega

      number = 0;

      renderDice();

    }, 1000);

    return;
  }
}

function renderBoard() {
  let ludoBoard = document.getElementById("ludoBoard");
  ludoBoard.innerHTML = "";
  let innerHTML = "";
  let boxNo = 0;

  // CITY -> HOUSE -> ROOM
  for (let i = 0; i < 4; i++) {
    // CITY
    innerHTML = innerHTML + '<div class="city city' + i + " color" + i + '">';
    //HOUSE
    innerHTML = innerHTML + '<div class="house">';
    //room
    for (let j = 0; j < 4; j++) {
      //room start
      innerHTML =
        innerHTML +
        '<div class="room room' +
        j +
        " color" +
        i +
        '" id="p' +
        i +
        "r" +
        j +
        '">';
      //room ends
      innerHTML = innerHTML + "</div>";
    }
    //house ends
    innerHTML = innerHTML + "</div>";
    //city ends
    innerHTML = innerHTML + "</div>";
  }

  //WINNING BOX
  innerHTML = innerHTML + '<div class="winningBox" id="winningBox"></div>';

  for (let i = 0; i < 4; i++) {
    //carpet
    innerHTML =
      innerHTML + '<div class="carpet color' + i + " carpet" + i + '">';
    for (let j = 0; j < 5; j++) {
      //boxes
      innerHTML = innerHTML + '<div class="box" id="box' + boxNo + '"></div>';
      boxNo++;
    }
    innerHTML = innerHTML + "</div>";
  }

  for (let i = 0; i < 4; i++) {
    //safehouse
    innerHTML =
      innerHTML +
      '<div class="box p' +
      i +
      "s0 color" +
      i +
      '"id="box' +
      boxNo +
      '"></div>';
    boxNo++;
    innerHTML =
      innerHTML +
      '<div class="box p' +
      i +
      "s1 color" +
      i +
      '" id="box' +
      boxNo +
      '"></div>';
    boxNo++;
  }

  for (let i = 0; i < 44; i++) {
    innerHTML = innerHTML + '<div class="box" id="box' + boxNo + '"></div>';
    boxNo++;
  }

  ludoBoard.innerHTML = innerHTML;
}

function renderChips() {
  //player
  for (let i = 0; i < 4; i++) {
    //chip
    for (let j = 0; j < 4; j++) {
      // let cls = (move = null);
      let cls = "";
      let move = "";
      let chipPosition = chipsPositions[i][j];
      let ID = null;
      if (chipPosition === -6) {
        ID = "p" + i + "r" + j;
        if (number === 6 && currentTurn === i) {
          cls = "rotate";
          move = 'onclick="moveChip(' + j + ')"';
        }
      } else if (chipPosition === 56) {
        ID = "winningBox";
      } else {
        if (56 - chipPosition >= number && currentTurn === i) {
          cls = "rotate";
          move = 'onclick="moveChip(' + j + ')"';
        }
        ID = "box" + road[i][chipPosition];
      }

      //   document.getElementById(ID).innerHTML =
      //     '<div class="chip ' + cls + " color" + i + '" ' + move + "></div>";

      let topClass = "";

      // Current player ki chip agar kisi aur chip ke upar hai
      if (chipPosition !== -6 && chipPosition !== 56 && currentTurn === i) {
        let currentBox = road[i][chipPosition];

        for (let p = 0; p < 4; p++) {
          if (p === i) continue;

          for (let c = 0; c < 4; c++) {
            let opponentPosition = chipsPositions[p][c];

            if (
              opponentPosition !== -6 &&
              opponentPosition !== 56 &&
              road[p][opponentPosition] === currentBox
            ) {
              topClass = "top-chip";
            }
          }
        }
      }

      // document.getElementById(ID).innerHTML +=
      //   '<div class="chip ' +
      //   cls +
      //   " color" +
      //   i +
      //   " " +
      //   topClass +
      //   '" ' +
      //   move +
      //   "></div>";

      document.getElementById(ID).innerHTML +=
        '<div class="chip ' +
        cls +
        " color" +
        i +
        " " +
        topClass +
        '" ' +
        move +
        ">" +
        '<svg class="chip-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
        "<defs>" +
        '<linearGradient id="chipGrad' +
        i +
        '" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0%" stop-color="white" stop-opacity=".45"/>' +
        '<stop offset="35%" stop-color="currentColor" stop-opacity="1"/>' +
        '<stop offset="100%" stop-color="currentColor" stop-opacity=".7"/>' +
        "</linearGradient>" +
        "</defs>" +
        '<circle cx="50" cy="50" r="44" fill="rgba(0,0,0,.25)"/>' +
        '<path d="M50 8 C35 8 24 20 24 35 C24 48 32 55 39 61 L30 82 C28 87 32 92 38 92 H62 C68 92 72 87 70 82 L61 61 C68 55 76 48 76 35 C76 20 65 8 50 8Z" ' +
        'fill="url(#chipGrad' +
        i +
        ')" stroke="white" stroke-width="3"/>' +
        '<circle cx="42" cy="28" r="8" fill="white" opacity=".55"/>' +
        "</svg>" +
        "</div>";
    }
  }
  //positon -> 56 winning box
  // box
}

function moveChip(chipNumber) {
  let player = currentTurn;
  let currentPosition = chipsPositions[player][chipNumber];

  if (currentPosition === -6) {
    if (number !== 6) return;

    chipsPositions[player][chipNumber] = 0;
    number = 0;
    renderBoard();
    renderChips();
    renderDice();
    renderPlayerValues();

    return;
  }

  if (56 - currentPosition < number) {
    number = 0;
    turn++;
    renderDice();
    return;
}

  let steps = number;
  let step = 0;

  function moveOneStep() {
    if (step < steps) {
      chipsPositions[player][chipNumber]++;
      step++;

      renderBoard();
      renderChips();
      renderPlayerValues();

      setTimeout(moveOneStep, 300);
    } else {
      // ⭐ Chip final position par pahunch gayi
      // Ab opponent ki chip ko check karo
      cutOpponentChip(player, chipNumber);

      renderBoard();
      renderChips();
      renderPlayerValues();
   
      checkWinner(player);


      if (number === 6) {
        if (count6 === 3) {
          count6 = 0;
          turn++;
        }
      } else {
        turn++;
      }

      number = 0;

      renderDice();
    }
  }

  moveOneStep();
}

function cutOpponentChip(player, chipNumber) {
  let position = chipsPositions[player][chipNumber];

  // Winning box me koi cut nahi hota
  if (position === 56) {
    return;
  }

  // Current player's actual board box
  let currentBox = road[player][position];

  // Safe positions
  // Apne game ke safe box numbers yahan rakho
  // let safeBoxes = [20, 22, 24, 26, 49, 50, 51, 52];
  let safeBoxes = [20, 21, 22, 23, 24, 25, 26, 27];

  // Agar current position safe hai to cut nahi hoga
  if (safeBoxes.includes(currentBox)) {
    return;
  }

  // Dusre players ki chips check karo
  for (let p = 0; p < 4; p++) {
    // Apni chip ko skip karo
    if (p === player) {
      continue;
    }

    for (let c = 0; c < 4; c++) {
      let opponentPosition = chipsPositions[p][c];

      // Home ya winning box me chip ko ignore karo
      if (opponentPosition === -6 || opponentPosition === 56) {
        continue;
      }

      // Opponent ka board box
      let opponentBox = road[p][opponentPosition];

      // Same box mil gaya
      if (currentBox === opponentBox) {
        // Opponent chip ko home bhejo
        chipsPositions[p][c] = -6;
      }
    }
  }
}

let resetBtn = document.querySelector(".game-btn");

resetBtn.addEventListener("click", resetGame);

function resetGame() {
    // Game Over popup remove karo
    let oldPopup = document.querySelector(".game-over-overlay");

    if (oldPopup) {
        oldPopup.remove();
    }

    // Game state reset
    rankings = [];
    gameFinished = false;

    // Start screen dobara show karo
    let startScreen = document.getElementById("startScreen");

    if (startScreen) {
        startScreen.style.display = "flex";
    }

    // Player names ke input clear karo
    let playerName1 = document.getElementById("playerName1");
    let playerName2 = document.getElementById("playerName2");
    let playerName3 = document.getElementById("playerName3");
    let playerName4 = document.getElementById("playerName4");

    if (playerName1) playerName1.value = "";
    if (playerName2) playerName2.value = "";
    if (playerName3) playerName3.value = "";
    if (playerName4) playerName4.value = "";

    // Default 2 players select karo
    selectPlayerCount(2);
}

function checkWinner(player) {

    // Agar player already ranking me hai to kuch mat karo
    if (rankings.includes(player)) {
        return;
    }

    // Check karo ki player ki saari 4 chips finish hain
    let allFinished = chipsPositions[player].every(
        position => position === 56
    );

    if (!allFinished) {
        return;
    }

    // Player ki position save karo
    rankings.push(player);

    console.log(
        "Player " + (player + 1) + " finished at position " + rankings.length
    );

    // 4 players finish -> game over
    if (rankings.length === totalPlayer) {
        gameFinished = true;
        showGameResult();
    }
}

function showGameResult() {

  let resultHTML = `
    <div class="game-over-overlay">

      <div class="game-over-popup">

        <h1>🏆 Game Over!</h1>
  `;


  // =====================================
  // 2 PLAYER RESULT
  // =====================================

  if (totalPlayer === 2) {

    resultHTML += `

      <div class="winner">
        🏆 ${playerNames[rankings[0]]}
        <span>WINNER</span>
      </div>

      <div class="rank loser">
        😔 ${playerNames[rankings[1]]}
        <span>2nd</span>
      </div>

    `;

  }


  // =====================================
  // 4 PLAYER RESULT
  // =====================================

  else {

    resultHTML += `

      <div class="winner">
        🏆 ${playerNames[rankings[0]]}
        <span>WINNER</span>
      </div>

      <div class="rank second">
        🥈 ${playerNames[rankings[1]]}
        <span>2nd</span>
      </div>

      <div class="rank third">
        🥉 ${playerNames[rankings[2]]}
        <span>3rd</span>
      </div>

      <div class="rank loser">
        😔 ${playerNames[rankings[3]]}
        <span>LOOSER</span>
      </div>

    `;

  }


  resultHTML += `

        <button
          onclick="resetGame()"
          class="play-again-btn">

          🔄 Play Again

        </button>

      </div>

    </div>
  `;


  document.body.insertAdjacentHTML(
    "beforeend",
    resultHTML
  );
}
// =========================================
// SELECT PLAYER COUNT
// =========================================

function selectPlayerCount(count) {

  totalPlayer = count;

  let twoBtn = document.getElementById("twoPlayerBtn");
  let fourBtn = document.getElementById("fourPlayerBtn");

  let player3 = document.getElementById("player3Input");
  let player4 = document.getElementById("player4Input");

  if (count === 2) {

    twoBtn.classList.add("active");
    fourBtn.classList.remove("active");

    player3.classList.add("hidden-player");
    player4.classList.add("hidden-player");

  } else {

    fourBtn.classList.add("active");
    twoBtn.classList.remove("active");

    player3.classList.remove("hidden-player");
    player4.classList.remove("hidden-player");
  }
}


// =========================================
// START GAME
// =========================================

function startGame() {

  let name1 = document.getElementById("playerName1").value.trim();
  let name2 = document.getElementById("playerName2").value.trim();

  let name3 = document.getElementById("playerName3").value.trim();
  let name4 = document.getElementById("playerName4").value.trim();


  // Player 1 & 2 compulsory

  if (name1 === "") {
    alert("Please enter Player 1 name.");
    document.getElementById("playerName1").focus();
    return;
  }

  if (name2 === "") {
    alert("Please enter Player 2 name.");
    document.getElementById("playerName2").focus();
    return;
  }


  // 4 players ke liye Player 3 & 4 compulsory

  if (totalPlayer === 4) {

    if (name3 === "") {
      alert("Please enter Player 3 name.");
      document.getElementById("playerName3").focus();
      return;
    }

    if (name4 === "") {
      alert("Please enter Player 4 name.");
      document.getElementById("playerName4").focus();
      return;
    }

  }


  // Save names

  playerNames[0] = name1;
  playerNames[1] = name2;

  if (totalPlayer === 4) {
    playerNames[2] = name3;
    playerNames[3] = name4;
  }


  // Game start

  gameStarted = true;

  document.getElementById("startScreen").style.display = "none";


  // Player names screen par show karo

  updatePlayerNames();


  // Fresh game

  resetGameData();
}


// =========================================
// UPDATE PLAYER NAMES
// =========================================

function updatePlayerNames() {

  for (let i = 0; i < 4; i++) {

    let title = document.getElementById("playerTitle" + (i + 1));

    if (title) {
      title.innerHTML = playerNames[i];
    }
  }


  // 2 player mode me player 3 & 4 hide

  let playerCards = document.querySelectorAll(".player-card");

  if (playerCards.length >= 4) {

    if (totalPlayer === 2) {

      playerCards[2].style.display = "none";
      playerCards[3].style.display = "none";

    } else {

      playerCards[2].style.display = "";
      playerCards[3].style.display = "";
    }
  }
}


// =========================================
// RESET GAME DATA
// =========================================

function resetGameData() {

  rankings = [];
  gameFinished = false;

  chipsPositions = [
    [-6, -6, -6, -6],
    [-6, -6, -6, -6],
    [-6, -6, -6, -6],
    [-6, -6, -6, -6]
  ];

  turn = 0;
  number = 0;
  count6 = 0;
  currentTurn = 0;

  renderBoard();
  renderChips();
  renderDice();
  renderPlayerValues();
}
