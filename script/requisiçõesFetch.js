const BASE_URL = "https://tabplusbackend.onrender.com/Game";

export async function postGame(gameGrade, gameYear, player, hits, multiplication, answer) {
  let data = {
    game_grade: gameGrade,
    game_year: gameYear,
    player: player,
    hits: hits,
    multiplication: multiplication,
    answer: answer
  };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), // - Convertido em uma JSON String
  };

  return fetch(`${BASE_URL}`, options)
    .catch((err) => console.error(err));
}

async function getAllGames() {
  const options = { method: "GET" };

  return fetch(`${BASE_URL}/searchAll`, options)
    .then(async (response) => await response.json())
    .catch((err) => console.error(err));
}

async function getGameById(id) {
  const options = { method: "GET" };

  return fetch(`${BASE_URL}/searchByID/${id}`, options)
    .then(async (response) => await response.json())
    .catch((err) => console.error(err));
}

async function getGameByPlayer(player) {
  const options = { method: "GET" };

  return fetch(`${BASE_URL}/searchByPlayer/${player}`, options)
    .then(async (response) => await response.json())
    .catch((err) => console.error(err));
}