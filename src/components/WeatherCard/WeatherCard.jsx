import './WeatherCard.css';

const WeatherCard = ({ city, current }) => {
  if (!current) return null;
  return (
    <div className="weather-card">
      <h2>{city}</h2>
      <div className="weather-details">
        <p>Current Temperature: {Math.round(current.main.temp)}°C</p>
        <p>Condition: {current.weather[0].description}</p>
      </div>
    </div>
  );
};

export default WeatherCard;