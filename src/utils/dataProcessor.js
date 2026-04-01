export const processForecastData = (list) => {
  const dailyData = {};

  // 1. Group by date
  list.forEach((item) => {
    // dt_txt format: "2023-10-27 12:00:00"
    const date = item.dt_txt.split(" ")[0]; 
    if (!dailyData[date]) {
      dailyData[date] = { temps: [], conditions: [] };
    }
    dailyData[date].temps.push(item.main.temp);
    dailyData[date].conditions.push(item.weather[0].main);
  });

  // 2. Calculate Averages & Pick Dominant Condition
  return Object.keys(dailyData).map((date) => {
    const data = dailyData[date];
    const avgTemp = data.temps.reduce((a, b) => a + b, 0) / data.temps.length;
    
    // Simple logic: most frequent weather condition for the day
    const condition = data.conditions[0]; 

    return {
      date,
      temp: Math.round(avgTemp),
      condition
    };
  });
};

export const generateInsight = (dailyData) => {
  if (!dailyData || dailyData.length === 0) return "No data available";

  // Find best day (moderate temp, e.g., closest to 20°C)
  const bestDay = dailyData.reduce((prev, curr) => {
    return Math.abs(curr.temp - 20) < Math.abs(prev.temp - 20) ? curr : prev;
  });

  // Check for extremes
  const maxTemp = Math.max(...dailyData.map(d => d.temp));
  const minTemp = Math.min(...dailyData.map(d => d.temp));

  if (maxTemp > 35) return `Heat Warning: ${maxTemp}°C expected. Stay hydrated.`;
  if (minTemp < 5) return `Cold Warning: ${minTemp}°C expected. Dress warmly.`;
  
  return `Best day to go out: ${new Date(bestDay.date).toLocaleDateString('en-US', { weekday: 'long' })} (${bestDay.temp}°C)`;
};