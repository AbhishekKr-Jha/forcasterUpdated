export function useWeatherBackground() {
    const updateBackground = (condition) => {
      const weather = condition.toLowerCase();
  
      if (weather.includes("clear") || weather.includes("sunny") ) {
        return "linear-gradient(to bottom right, #87CEEB, #ffffff)"; 
      } else if (weather.includes("cloud")) {
        return "linear-gradient(to bottom right, #B0C4DE, #ffffff)";
      } else if (weather.includes("rain")) {
        return "linear-gradient(to bottom right, #708090, #2F4F4F)"; 
      } else if (weather.includes("snow")) {
        return "linear-gradient(to bottom right, #ffffff, #D3D3D3)"; 
      } else {
        return "linear-gradient(to bottom right, #EFF8FF, #01549A)";
      }
    };
  
    return { updateBackground };
  }
  