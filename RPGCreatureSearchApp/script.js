const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const nameEl = document.getElementById("creature-name");
const idEl = document.getElementById("creature-id");
const weightEl = document.getElementById("weight");
const heightEl = document.getElementById("height");
const typesEl = document.getElementById("types");
const hpEl = document.getElementById("hp");
const attackEl = document.getElementById("attack");
const defenseEl = document.getElementById("defense");
const specialAttackEl = document.getElementById("special-attack");
const specialDefenseEl = document.getElementById("special-defense");
const speedEl = document.getElementById("speed");

const BASE_URL = "https://rpg-creature-api.freecodecamp.rocks/api/creature/";

searchButton.addEventListener("click", async () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) return;

  try {
    const response = await fetch(`${BASE_URL}${query}`);
    if (!response.ok) throw new Error("Creature not found");

    const creature = await response.json();

    // Clear previous type elements
    typesEl.innerHTML = "";

    // Set values
    nameEl.textContent = creature.name.toUpperCase();
    idEl.textContent = `#${creature.id}`;
    weightEl.textContent = `Weight: ${creature.weight}`;
    heightEl.textContent = `Height: ${creature.height}`;

    // Set stats
    creature.stats.forEach(stat => {
      const value = stat.base_stat;
      switch (stat.name) {
        case "hp":
          hpEl.textContent = value;
          break;
        case "attack":
          attackEl.textContent = value;
          break;
        case "defense":
          defenseEl.textContent = value;
          break;
        case "special-attack":
          specialAttackEl.textContent = value;
          break;
        case "special-defense":
          specialDefenseEl.textContent = value;
          break;
        case "speed":
          speedEl.textContent = value;
          break;
      }
    });

    // Set types
    creature.types.forEach(type => {
      const span = document.createElement("span");
      span.textContent = type.name.toUpperCase();
      typesEl.appendChild(span);
    });

  } catch (error) {
    alert("Creature not found");
  }
});
