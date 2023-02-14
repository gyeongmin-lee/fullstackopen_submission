import weatherService from "../services/weather";
import { useEffect, useState } from "react";

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    weatherService.getWeather({ query: country.capital }).then((newWeather) => {
      setWeather(newWeather);
    });
  }, [country]);

  return (
    <div>
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h3>languages</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flag} alt={`flag of ${country.name}`} />
      {weather && (
        <>
          <h3>Weather in {country.capital}</h3>
          <div>temperature {weather.current.temp_c} Celcius</div>
          <img
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
          />
          <div>wind {weather.current.wind_kph} k/h</div>
        </>
      )}
    </div>
  );
};

export default CountryInfo;
