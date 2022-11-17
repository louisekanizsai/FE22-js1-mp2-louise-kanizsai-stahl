document.querySelector("#name-button").addEventListener("click", displayGame);
const game = document.querySelector("#game-container");
game.style.display = "none";

function displayGame() {
  // tar bort gamla introt och visar själva spelet
  const newIntro = document.querySelector("#new-intro");
  const name = document.querySelector("#name-input");
  newIntro.innerText = `Välkommen, ${name.value}! Universums öde ligger i dina händer. Välj sten, sax eller påse till vänster. Ondskan gör sedan sitt val till höger.`;
  game.style.display = "block";
  document.querySelector("#first-intro").remove();

  // info om vinnaren ska inte visas förrän någon vinner
  const winnerInfo = document.querySelector("#winner-info");
  winnerInfo.style.display = "none";

  let playerPoints = 0;
  let computerPoints = 0;
  const playerButtons = document.querySelector("#player-buttons");
  const allButtons = document.querySelectorAll(".button");
  const computerButtons = document.querySelectorAll(".computer-button");

  playerButtons.addEventListener("click", getChoicesAndCompare);

  // funktion som hämtar ens val, gör datorns val, visar detta med färger, och sedan jämför för att se vem som vann tills någon fått 3 poäng
  function getChoicesAndCompare(event) {
    if (event.target.tagName == "IMG") {
      let playerChoice = event.target.id;
      let computerChoice = Math.floor(Math.random() * 3);

      // loop som tar bort den klass som visar vad användaren + datorn valde, dvs nollställer sedan förra valet
      for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove("choice-marker");
        allButtons[i].classList.remove("random-marker");
      }

      // lägger till klass för att visa valen
      event.target.classList.add("choice-marker");
      computerButtons[computerChoice].classList.add("random-marker");

      // kollar vem som vann
      if (
        (playerChoice == 0 && computerChoice == 1) ||
        (playerChoice == 1 && computerChoice == 2) ||
        (playerChoice == 2 && computerChoice == 0)
      ) {
        playerPoints++;
      } else if (
        (computerChoice == 0 && playerChoice == 1) ||
        (computerChoice == 1 && playerChoice == 2) ||
        (computerChoice == 2 && playerChoice == 0)
      ) {
        computerPoints++;
      }
      displayPoints();

      // när någon fått 3 poäng:
      if (playerPoints == 3) {
        win("Du vann! Universum är räddat!","lightgreen");
      } else if (computerPoints == 3) {
        win("Ondskan vann och universum gick under... Men du kan återfödas och prova igen.","indianred");
      }
    }

    function displayPoints() {
      document.querySelector("#player-score").innerText = `Dina poäng: ${playerPoints}/3`;
      document.querySelector("#computer-score").innerText = `Ondskans poäng: ${computerPoints}/3`;
    }

    //funktion som skriver ut vinnartext och visar "spela igen"-knappen, som resettar spelet
    function win(winnerText,winnerColor) {
      winnerInfo.style.display = "block";
      document.querySelector("#winner").innerText = `${winnerText}`;
      document.body.style.backgroundColor = winnerColor;
      playerButtons.removeEventListener("click", getChoicesAndCompare);

      document.querySelector("#restart").addEventListener("click", function () {
          playerPoints = 0;
          computerPoints = 0;
          displayPoints();
          winnerInfo.style.display = "none";
          document.body.style.backgroundColor = "azure";
          for (let i = 0; i < allButtons.length; i++) {
            allButtons[i].classList.remove("choice-marker");
            allButtons[i].classList.remove("random-marker");
          }
          playerButtons.addEventListener("click", getChoicesAndCompare);
        });
    }
  }
}
