import { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) onSearch(city);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <label htmlFor="city-input">Enter city:</label>
      <input 
        id="city-input"
        type="text" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        placeholder="e.g. London"
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Search'}
      </button>
    </form>
  );
};

export default SearchBar;