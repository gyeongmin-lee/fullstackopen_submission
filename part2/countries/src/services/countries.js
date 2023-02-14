import axios from "axios";
const baseUrl = "https://restcountries.com/v3.1";

const searchByName = ({ name }) => {
  const request = axios.get(`${baseUrl}/name/${name}`);
  return request.then((response) => {
    const countries = response.data;
    return countries.map((country) => ({
      name: country.name.common,
      capital: country.capital && country.capital[0],
      area: country.area,
      languages: Object.values(country.languages),
      flag: country.flags.png,
      cca2: country.cca2,
    }));
  });
};

const exports = { searchByName };

export default exports;
