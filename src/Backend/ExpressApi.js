const express = require('express');
const axios = require('axios');
const { GenderHelper } = require('./GenderHelper');
const { removeBackslashCommands } = require('./removeBackslashCommands');
const cors = require('cors');
const app = express();


const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

let pokemonDataCache = {}; // For the cache of the data fetched once

app.use(cors());

app.get('/pokemon/:id/stats', async (req, res) => {
    try {
      const { id } = req.params;
      // if the data was fetched previously and stored in the variable
      if (pokemonDataCache.hasOwnProperty(id)) {
        const combinedData = pokemonDataCache[id];
        const { height, weight, stats, species, abilities, types} = combinedData.pokemon;
        const pokemonStats = stats.map((stat) => ({
          name: stat.stat.name,
          base_stat: stat.base_stat,
        }));
        const response = {
          height,
          weight,
          stats: pokemonStats,
          description: removeBackslashCommands(species.flavor_text_entries[0].flavor_text), 
          gender: GenderHelper(species.gender_rate),
          ability: abilities[0].ability.name,
          category: species.genera.find((genus) => genus.language.name === 'en').genus, // Select the English category
          type: types.map((type) => type.type.name),
        };
        res.json(response);
        return;
      }
      
      // Fetch the data from the API 
      const [pokemonResponse, speciesResponse] = await Promise.all([
        axios.get(`${POKEAPI_BASE_URL}/pokemon/${id}`),
        axios.get(`${POKEAPI_BASE_URL}/pokemon-species/${id}`),
      ]);
      
      const pokemon = pokemonResponse.data;
      const species = speciesResponse.data;
      
      // Store the fetched json in CombinedData
      const combinedData = { pokemon: { ...pokemon, species } };

      // Cache the data for the next call based on the id
      pokemonDataCache[id] = combinedData;
  
      const { height, weight, stats, species: cachedSpecies, abilities, types } = combinedData.pokemon;
      const pokemonStats = stats.map((stat) => ({
        name: stat.stat.name,
        base_stat: stat.base_stat,
      }));
      const responseData = {
        height,
        weight,
        stats: pokemonStats,
        description: removeBackslashCommands(cachedSpecies.flavor_text_entries[0].flavor_text),
        gender: GenderHelper(species.gender_rate),
        ability: abilities[0].ability.name,
        category: cachedSpecies.genera.find((genus) => genus.language.name === 'en').genus, // Select the English category
        type: types.map((type) => type.type.name),
      };
      res.json(responseData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
const port = 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
