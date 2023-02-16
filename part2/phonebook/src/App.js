import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(existingPerson.id, { ...existingPerson, number: newNumber })
          .then((updatedPerson) => {
            setPersons(persons.map((person) => (person.id !== updatedPerson.id ? person : updatedPerson)));
            setSuccessMsg(`Updated ${updatedPerson.name}`);
            setTimeout(() => {
              setSuccessMsg(null);
            }, 5000);
          })
          .catch((error) => {
            console.error(error);
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
            setErrorMsg(`Information of ${existingPerson.name} has already been removed from server`);
            setTimeout(() => {
              setErrorMsg(null);
            }, 5000);
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };

      personService
        .create(newPerson)
        .then((newPerson) => {
          setPersons(persons.concat(newPerson));
          setSuccessMsg(`Added ${newPerson.name}`);
          setTimeout(() => {
            setSuccessMsg(null);
          }, 5000);
        })
        .catch((error) => {
          console.error(error);
          setErrorMsg(error.response.data.error);
          setTimeout(() => {
            setErrorMsg(null);
          }, 5000);
        });
    }
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .delete(person.id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== person.id));
          setSuccessMsg(`Deleted ${person.name}`);
          setTimeout(() => {
            setSuccessMsg(null);
          }, 5000);
        })
        .catch((error) => {
          console.error(error);
          setPersons(persons.filter((p) => p.id !== person.id));
          setErrorMsg(`Information of ${person.name} has already been removed from server`);
          setTimeout(() => {
            setErrorMsg(null);
          }, 5000);
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredPersons = persons.filter((person) => {
    const lowerCaseName = person.name.toLowerCase();
    const lowerCaseFilter = filter.toLowerCase();
    return lowerCaseName.includes(lowerCaseFilter);
  });

  return (
    <div>
      <h2>Phonebook</h2>
      {successMsg && <Notification message={successMsg} />}
      {errorMsg && <Notification message={errorMsg} type="error" />}
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDelete={deletePerson} />
    </div>
  );
};

export default App;
