import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [ipAddress, setIpAddress] = useState('');
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetchIPData();
  }, []);

  const fetchIPData = async (ip = '') => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://ipapi.co/${ip || ''}/json/`);
      const data = await response.json();
      setIpAddress(data.ip);
      setLocation(data);
    } catch (error) {
      console.error('Eorror fetching IP data:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    fetchIPData(searchInput);
  }
  return (
    <div className="app">
      <header>
        <h1>IP Address Finder</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter IP address"
          />
          <button type="submit">Search</button>
        </form>
      </header>

      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : location ? (
        <div className="results">
          <div className="ip-card">
            <h2>IP Address</h2>
            <p>{ipAddress}</p>
          </div>
          <div className="location-card">
            <h2>Location</h2>
            <p>{location.city}, {location.region}, {location.country_name}</p>
          </div>
          {/* Add more details as needed */}
        </div>
      ) : (
        <div className="error">No data available</div>
      )}
    </div>
  );
}

export default App;
