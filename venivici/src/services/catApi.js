// Configuration
const CAT_API_KEY = import.meta.env.VITE_CAT_API_KEY; // Load API key from environment variable
const BASE_URL = "https://api.thecatapi.com/v1";

// Fetch all cat breeds
export async function fetchBreeds() {
  try {
    const response = await fetch(`${BASE_URL}/breeds`, {
      headers: { "x-api-key": CAT_API_KEY },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching breeds:", error);
    throw error;
  }
}

// Fetch a cat image by breed ID
export async function fetchCatImage(breedId) {
  try {
    const response = await fetch(
      `${BASE_URL}/images/search?breed_ids=${breedId}`,
      {
        headers: { "x-api-key": CAT_API_KEY },
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data[0]?.url;
  } catch (error) {
    console.error("Error fetching cat image:", error);
    throw error;
  }
}

// Generate a random cat name
export function generateCatName() {
  const catNames = [
    "Whiskers",
    "Luna",
    "Oliver",
    "Leo",
    "Lily",
    "Kitty",
    "Charlie",
    "Lucy",
    "Simba",
    "Bella",
    "Max",
    "Daisy",
    "Milo",
    "Chloe",
    "Tigger",
    "Nala",
    "Oscar",
    "Molly",
    "Felix",
    "Sophie",
    "Jack",
    "Loki",
    "Lola",
    "Finn",
    "Ruby",
    "Toby",
    "Zoe",
    "Rocky",
    "Piper",
  ];

  return catNames[Math.floor(Math.random() * catNames.length)];
}
