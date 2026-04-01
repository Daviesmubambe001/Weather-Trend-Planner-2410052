// Use fallback URL if env var is missing
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.openweathermap.org/data/2.5';
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const fetchWeatherData = async (city) => {
  // Validate API key
  if (!API_KEY) {
    console.error('❌ API key is missing! Check your .env file');
    throw new Error("API key is missing. Check your .env file.");
  }
  
  if (!city || city.trim() === '') {
    throw new Error("Please enter a city name");
  }

  const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;
  
  // Debug: Log the full URL (remove in production)
  console.log('🔍 Fetching:', url);
  
  try {
    const response = await fetch(url);
    
    // Log response status for debugging
    console.log('📡 Response status:', response.status);
    
    if (!response.ok) {
      // Try to read error body
      const errorText = await response.text();
      console.error('❌ API Error Response:', errorText);
      
      if (response.status === 401) {
        throw new Error("Invalid API key. Check your .env file.");
      }
      if (response.status === 404) {
        throw new Error("City not found. Please check the spelling.");
      }
      if (response.status === 429) {
        throw new Error("API rate limit exceeded. Please wait a moment.");
      }
      
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('🚨 Fetch failed:', error);
    throw error;
  }
};