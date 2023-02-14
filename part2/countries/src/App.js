import { useState, useEffect } from "react";
import CountryInfo from "./components/CountryInfo";
import CountryList from "./components/CountryList";
import countryService from "./services/countries";

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const toggleCountryInfo = (cca2) => {
    setCountries(
      countries.map((country) =>
        country.cca2 === cca2 ? { ...country, show: !country.show } : country
      )
    );
  };

  useEffect(() => {
    if (!query) {
      setCountries([]);
      return;
    }

    countryService
      .searchByName({ name: query })
      .then((countries) => {
        setCountries(countries.map((country) => ({ ...country, show: false })));
      })
      .catch((error) => {
        setCountries([]);
        console.error(error);
      });
  }, [query]);

  return (
    <div>
      <h1>Countries</h1>
      <div>
        find countries <input value={query} onChange={handleChange} />
      </div>
      <div>
        {countries.length > 10 ? (
          <div>Too many matches, specify another filter</div>
        ) : countries.length > 1 ? (
          <CountryList countries={countries} onToggle={toggleCountryInfo} />
        ) : countries.length === 1 ? (
          <CountryInfo country={countries[0]} />
        ) : null}
      </div>
    </div>
  );
};

export default App;
