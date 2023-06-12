import React, { useState, useEffect } from 'react';
import "../App.css"
import pikachu from "../Assets/Pokemon Image Dataset/pikachu.png"

function Api({searchTerm, submitted}) {
  const [data, setData] = useState([]);                           // For storing the json response in data
  const [error, setError] = useState(null);                       // For error text to pop up
  const [loading, setLoading] = useState(false);                  // For loading text to pop up

  useEffect(() => {
    async function fetchDataFromApi() {
      try {
        setLoading(true);
        const response = await fetch(`http://192.168.1.7:5000/pokemon/${searchTerm.toLowerCase()}/stats/`);
        if(response.ok){
          const jsonData = await response.json();
          setData(jsonData);
        }else{
          setError('Invalid Input')
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error('Error fetching data:', error);
      }
    }
    if(submitted){
      fetchDataFromApi();
    }
  }, []);
  
  // if response is not ok occurs
  if(loading){
    return <div className='ErrorMessage'>Loading...</div>
  }

  // if error occurs
  if(error){
    return <div className='ErrorMessage'>{error}</div>
  }

  // deconstructing the data json to get its values
  const { height, weight, stats=[], description, gender, ability, category, type=[] } = data;

  return (
    <div className='Details'>
      <div><h1 className='Heading'>{searchTerm.toUpperCase()}</h1></div>
      <img src={pikachu} alt="" />
      <div>
        <h2 className='Description'>Description: {description}</h2>
        <h3 className='Stats'>Basic Information</h3>
        <div className='BasicStats'>
            <p className='Height'>Height: {height}</p>
            <p className='Weight'>Weight: {weight}</p>
            <p className='Gender'>Gender: {gender}</p>
            <p className='Ability'>Ability: {ability}</p>
            <p className='Category'>Category: {category}</p>
            <p className='Type'>Type: {type.join(', ')}</p>
        </div>
        <h3 className='Stats'>Stats</h3>
        <ul className='ul'>
            {stats.map((stat) => (
                <li className="li" key={stat.name}>
                {stat.name}: {stat.base_stat}
            </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default Api;
