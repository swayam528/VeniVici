import { useState, useEffect } from 'react'
import Background from './components/Background'
import CatCard from './components/CatCard'
import BanList from './components/BanList'
import { fetchBreeds } from './services/catApi'
import './styles/App.css'

function App() {
  const [catBreeds, setCatBreeds] = useState([]);
  const [bannedAttributes, setBannedAttributes] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBreeds = async () => {
      try {
        const breeds = await fetchBreeds();
        setCatBreeds(breeds);
        console.log(`Loaded ${breeds.length} cat breeds`);
      } catch (err) {
        setError('Failed to load cat data. Please try again later.');
        console.error('Error fetching breeds:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadBreeds();
  }, []);

  const addBan = (attribute) => {
    setBannedAttributes(prev => {
      const newSet = new Set(prev);
      newSet.add(attribute);
      return newSet;
    });
  };

  const removeBan = (attribute) => {
    setBannedAttributes(prev => {
      const newSet = new Set(prev);
      newSet.delete(attribute);
      return newSet;
    });
  };

  const isBanned = (attribute) => {
    return bannedAttributes.has(attribute);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="app-container">
      <Background catBreeds={catBreeds} isLoading={isLoading} />
      <div className="main-container">
        <CatCard 
          catBreeds={catBreeds} 
          isBanned={isBanned}
          addBan={addBan}
          isLoading={isLoading}
        />
      </div>
      <BanList 
        bannedAttributes={Array.from(bannedAttributes)} 
        removeBan={removeBan} 
      />
    </div>
  );
}

export default App;