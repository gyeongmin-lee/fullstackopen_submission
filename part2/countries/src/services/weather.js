import axios from "axios";
const baseUrl = `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}`;

const getWeather = ({ query }) => {
  const request = axios.get(`${baseUrl}&q=${query}`);
  return request.then((response) => response.data);
};

const exports = { getWeather };

export default exports;
