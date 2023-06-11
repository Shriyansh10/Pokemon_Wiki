// import {useEffect, useState} from 'react'
// // import {fetchDataFromApi1, fetchDataFromApi2} from './ApiCall.js'

// function Api({searchTerm}) {
//   const [data, setData] = useState([]);
//   // const [data, setData] = useState(null);
//   const [isLoading, setIsLoading] = useState([true]);
//   const [error, setError] = useState([]);
   
//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
          
//   //       const api1Data = await fetchDataFromApi1(searchTerm);
//   //       const api2Data = await fetchDataFromApi2(searchTerm);

//   //       // Process the data as needed
//   //       // const processedData = {
//   //       //   api1Data,
//   //       //   api2Data,
//   //       // };

//   //       // Set the processed data to the state
//   //       setData(processedData);
//   //       setIsLoading(false);
//   //     } catch (error) {
//   //       // Handle errors
//   //       setError(error);
//   //       setIsLoading(false);
//   //     }
//   //   };
//   //   fetchData();
//   // }, [searchTerm]);
  
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//           const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
//           const api1Data = await response.json();
//           console.log(api1Data);
//           setData(api1Data);
//       }catch (error) {
//         // Handle errors
//         setError(error);
//         setIsLoading(false);
//       }
//         // const api1Data = await fetchDataFromApi1(searchTerm);
//         // const api2Data = await fetchDataFromApi2(searchTerm);

//         // Process the data as needed
//         // const processedData = {
//         //   data1,
//         //   data2,
//         // };

//         // Set the processed data to the state
//         // setData(processedData);
//         setIsLoading(false);
//     };
//     fetchData();
//   }, [searchTerm]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div>
//       <h2>Data from API 1:</h2>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
  
// }

// export default Api;

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
