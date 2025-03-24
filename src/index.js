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

    let totalVotes = 100;
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
      nameElement.textContent = character.name;
      imageElement.src = character.image;
      imageElement.alt = character.name;
      voteCount.textContent = character.votes;
      imageElement.dataset.id = character.id;
      totalVotes = character.votes;
      currentCharacterId = character.id;
    }

    
    votesForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const newVotes = parseInt(voteInput.value) || 0;

      if (newVotes > 0 && currentCharacterId) {
        totalVotes += newVotes;
        voteCount.textContent = totalVotes;
        voteInput.value = "";

        
        fetch(`${baseUrl}/${currentCharacterId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ votes: totalVotes }),
        })
        .then((response) => response.json())
        .then((updatedCharacter) => console.log("Updated character:", updatedCharacter))
        .catch((error) => console.error("Error updating votes:", error));
      } else {
        alert("Please enter a valid number of votes.");
      }
    });

    
    resetButton.addEventListener("click", () => {
      if (currentCharacterId) {
        totalVotes = 0;
        voteCount.textContent = totalVotes;

        
        fetch(`${baseUrl}/${currentCharacterId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ votes: 0 }),
        })
        .then((response) => response.json())
        .then((updatedCharacter) => console.log("Votes reset:", updatedCharacter))
        .catch((error) => console.error("Error resetting votes:", error));
      }
    });
});
