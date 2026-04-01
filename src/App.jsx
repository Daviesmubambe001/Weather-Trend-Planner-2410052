import SearchBar from './components/SearchBar/SearchBar';
import WeatherCard from './components/WeatherCard/WeatherCard';
import ForecastChart from './components/ForecastChart/ForecastChart';
import InsightPanel from './components/InsightPanel/InsightPanel';
import { useWeather } from './hooks/useWeather';
import './styles/App.css';

function App() {
  const { weather, loading, error, searchCity } = useWeather();

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Weather Trend Planner</h1>
      </header>
      
      <main className="main-content">
        <SearchBar onSearch={searchCity} loading={loading} />
        
        {error && <div className="error-message">{error}</div>}
        
        {weather && (
          <>
            <WeatherCard city={weather.city} current={weather.current} />
            <ForecastChart forecast={weather.forecast} />
            <InsightPanel insight={weather.insight} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;