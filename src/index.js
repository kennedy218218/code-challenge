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

  let totalVotes = 0;

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

    fetch(baseUrl,{
      method:'PATCH',
      headers:{"Content-Type": 'application/json'},
      body:JSON.stringify(newVotes),
    
    })

  function displayCharacter(character) {
    nameElement.textContent = character.name;
    imageElement.src = character.image;
    imageElement.alt = character.name;
    voteCount.textContent = character.votes;
    imageElement.dataset.id = character.id;
    totalVotes = character.votes;
  }

  votesForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newVotes = parseInt(voteInput.value) || 0;
    if (newVotes > 0) {
      totalVotes += newVotes;
      voteCount.textContent = totalVotes;
      voteInput.value = "";
    } else {
      alert("Please enter a valid number of votes.");
    }
  });

  resetButton.addEventListener("click", () => {
    totalVotes = 0;
    voteCount.textContent = totalVotes;
  });
});
