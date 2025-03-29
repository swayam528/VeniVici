import { useEffect, useState } from "react";
import { fetchCatImage } from "../services/catApi";
import "../styles/Background.css";

function Background({ catBreeds, isLoading }) {
  const [backgroundImages, setBackgroundImages] = useState([]);

  useEffect(() => {
    const loadBackgroundImages = async () => {
      if (isLoading || catBreeds.length === 0) return;

      try {
        // Use a selection of breed IDs for background images
        const breedIds = catBreeds.slice(0, 48).map((breed) => breed.id);
        const images = [];

        // Fetch images in parallel
        const promises = [];
        for (let i = 0; i < 48; i++) {
          promises.push(fetchCatImage(breedIds[i % breedIds.length]));
        }

        const results = await Promise.allSettled(promises);
        results.forEach((result) => {
          if (result.status === "fulfilled" && result.value) {
            images.push(result.value);
          } else {
            // Add placeholder for failed loads
            images.push(null);
          }
        });

        setBackgroundImages(images);
      } catch (error) {
        console.error("Error loading background images:", error);
      }
    };

    loadBackgroundImages();
  }, [catBreeds, isLoading]);

  return (
    <div className="background">
      {backgroundImages.map((imageUrl, index) => (
        <div
          key={index}
          className="bg-image"
          style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : {}}
        />
      ))}
    </div>
  );
}

export default Background;
