import { useState } from 'react';
import "../App.css";
import Api from '../Backend/Api';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');  //Get the name of the pokemon
  const [submitted, setSubmitted] = useState(false); //Whether the Submit is pressed or not

  // When the Name is being typed or State is being Changed
  const handleChange = (event) => {
    setSubmitted(false);
    setSearchTerm(event.target.value);
  };

  // On Pressing Submit The Search Will Start Here
  const handleSubmit = (event) => {
    event.preventDefault();	
    setSubmitted(true); 
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="SearchBar">
        <input
          className='Input'
          type="text"
          placeholder="Name of the Pokemon... ex: Pikachu"
          value={searchTerm}
          onChange={handleChange}
          />
        <button type="submit" className='Submit'>Submit</button>

      </form>
      {/* if submit is pressed, We will render the details */}
      {submitted && (
      <Api searchTerm={searchTerm} submitted ={submitted}/>
    )}
    </div>
  );
}

export default SearchBar;