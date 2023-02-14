import CountryInfo from "./CountryInfo";

const CountryList = ({ countries, onToggle }) => {
  return countries.map((country) =>
    country.show ? (
      <div key={country.cca2}>
        <div>
          {country.name}{" "}
          <button onClick={() => onToggle(country.cca2)}>hide</button>
        </div>
        <CountryInfo country={country} />
      </div>
    ) : (
      <div key={country.cca2}>
        {country.name}{" "}
        <button onClick={() => onToggle(country.cca2)}>show</button>
      </div>
    )
  );
};

export default CountryList;
