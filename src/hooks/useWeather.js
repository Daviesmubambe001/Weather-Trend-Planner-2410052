import { useState } from 'react';
import { fetchWeatherData } from '../services/weatherApi';
import { processForecastData, generateInsight } from '../utils/dataProcessor';

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchCity = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(city);
      const dailyData = processForecastData(data.list);
      const insight = generateInsight(dailyData);
      
      setWeather({
        city: data.city.name,
        current: data.list[0], // First item is roughly current
        forecast: dailyData,
        insight
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { weather, loading, error, searchCity };
};