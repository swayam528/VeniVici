import { useState } from "react";
import { fetchCatImage, generateCatName } from "../services/catApi";
import "../styles/CatCard.css";

function CatCard({ catBreeds, isBanned, addBan, isLoading }) {
  const [currentCat, setCurrentCat] = useState(null);
  const [isDiscovering, setIsDiscovering] = useState(false);

  const discoverNewCat = async () => {
    try {
      setIsDiscovering(true);

      // Fetch a random cat
      let validCatFound = false;
      let attempts = 0;
      let catData;

      while (!validCatFound && attempts < 10) {
        attempts++;

        // Get a random breed that's not banned
        const eligibleBreeds = catBreeds.filter(
          (breed) =>
            !isBanned(breed.name) &&
            !isBanned(`${breed.weight.imperial} lbs`) &&
            !isBanned(`${breed.life_span} years`)
        );

        if (eligibleBreeds.length === 0) {
          alert("No cats match your criteria! Please remove some bans.");
          setIsDiscovering(false);
          return;
        }

        // Select a random eligible breed
        const randomIndex = Math.floor(Math.random() * eligibleBreeds.length);
        const selectedBreed = eligibleBreeds[randomIndex];

        // Fetch an image of this breed
        const imageUrl = await fetchCatImage(selectedBreed.id);

        if (imageUrl) {
          catData = {
            image: imageUrl,
            name: generateCatName(),
            breed: selectedBreed.name,
            weight: `${selectedBreed.weight.imperial} lbs`,
            lifespan: `${selectedBreed.life_span} years`,
          };
          validCatFound = true;
        }
      }

      if (!validCatFound) {
        throw new Error("Could not find a valid cat after multiple attempts");
      }

      setCurrentCat(catData);
    } catch (error) {
      console.error("Error discovering new cat:", error);
      alert("Failed to discover a new cat. Please try again.");
    } finally {
      setIsDiscovering(false);
    }
  };

  return (
    <div className="cat-card">
      <h1>Veni Vici!</h1>
      <h2>Discover cats from your wildest dreams!</h2>
      <div className="emoji-row">😺😸😹😻😼😽🙀😿😾</div>

      {currentCat && (
        <div className="cat-info">
          <h3 className="cat-name">{currentCat.name}</h3>
          <div className="attributes">
            {[
              { value: currentCat.breed, label: currentCat.breed },
              { value: currentCat.weight, label: currentCat.weight },
              { value: currentCat.lifespan, label: currentCat.lifespan },
            ].map((attr, index) => (
              <div
                key={index}
                className="attribute"
                onClick={() => addBan(attr.value)}
              >
                {attr.label}
              </div>
            ))}
          </div>
          <img
            src={currentCat.image}
            alt={`${currentCat.breed} cat named ${currentCat.name}`}
            className="cat-image"
          />
        </div>
      )}

      <button
        className="discover-btn"
        onClick={discoverNewCat}
        disabled={isDiscovering || isLoading}
      >
        {isDiscovering ? "Loading..." : "Discover!"}
      </button>
    </div>
  );
}

export default CatCard;
