// Not Working Due to error Invalid Hook Call
import {useState, useEffect } from 'react';

const Api = ({ searchTerm }) => {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/pokemon/${searchTerm.toLowerCase()}/stats`);
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchTerm]);

  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  const { height, weight, stats, description, gender, ability, category, type } = pokemonData;

  return (
    <div>
      <h1>Pokemon Stats for {searchTerm}</h1>
      <h2>Description: {description}</h2>
      <p>Height: {height}</p>
      <p>Weight: {weight}</p>
      <p>Gender: {gender}</p>
      <p>Ability: {ability}</p>
      <p>Category: {category}</p>
      <p>Type: {type.join(', ')}</p>
      <h3>Stats:</h3>
      <ul>
        {stats.map((stat) => (
          <li key={stat.name}>
            {stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Api;
