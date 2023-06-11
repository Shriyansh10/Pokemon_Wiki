import React from 'react'
import jsonData from "./DetailsHardCoded.json"
import "../App.css"
import pikachu from "../Assets/Pokemon Image Dataset/pikachu.png"

function PokemonDetails({searchTerm}) {

  // deconstructing the json hardcoded or the json which will be fetching
  const { height, weight, stats, description, gender, ability, category, type } = jsonData;

  return (
    <div className='Details'>
      <div><h1 className='Heading'>{searchTerm}</h1></div>
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
        <h3 className='Stats'>Stats:</h3>
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

export default PokemonDetails;