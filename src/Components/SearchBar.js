import { useState } from 'react';
import "../App.css";
import Api from '../Backend/Api';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Api(searchTerm);
  };

  return (
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
  );
}

export default SearchBar;