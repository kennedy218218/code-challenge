document.addEventListener("DOMContentLoaded", () => {
  const baseUrl = "http://localhost:3000/characters";
  const characterBar = document.getElementById("character-bar");
  const detailedInfo = document.getElementById("detailed-info");
  const nameElement = document.getElementById("name");
  const imageElement = document.getElementById("image");
  const voteCount = document.getElementById("vote-count");
  const votesForm = document.getElementById("votes-form");
  const voteInput = document.getElementById("votes");
  const resetButton = document.getElementById("reset-btn");

  let currentCharacterId = null; 

  
  fetch(baseUrl)
    .then((response) => response.json())
    .then((characters) => {
      characters.forEach((character) => {
        const span = document.createElement("span");
        span.textContent = character.name;
        span.style.cursor = "pointer";
        span.addEventListener("click", () => displayCharacter(character));
        characterBar.appendChild(span);
      });
    });

  
  function displayCharacter(character) {
    currentCharacterId = character.id; 
    nameElement.textContent = character.name;
    imageElement.src = character.image;
    imageElement.alt = character.name;
    voteCount.textContent = character.votes;
  }

  
  votesForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const newVotes = parseInt(voteInput.value) || 0; 
    if (newVotes > 0 && currentCharacterId) {
      const updatedVotes = parseInt(voteCount.textContent) + newVotes;

      
      voteCount.textContent = updatedVotes;

      
      fetch(`${baseUrl}/${currentCharacterId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ votes: updatedVotes }),
      })
        .then((response) => response.json())
        .then((updatedCharacter) => {
          console.log("Updated character:", updatedCharacter);
        })
        .catch((error) => console.error("Error updating votes:", error));

      
      voteInput.value = "";
    } else {
      alert("Please enter a valid number of votes.");
    }
  });

  
  resetButton.addEventListener("click", () => {
    if (currentCharacterId) {
      
      voteCount.textContent = 0;

     
      fetch(`${baseUrl}/${currentCharacterId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ votes: 0 }),
      })
        .then((response) => response.json())
        .then((updatedCharacter) => {
          console.log("Reset votes for character:", updatedCharacter);
        })
        .catch((error) => console.error("Error resetting votes:", error));
    }
  });
});
