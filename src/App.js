import { useState, useEffect } from 'react';
import "./App.css";
import CardList from './components/card-list/card-list.component';
import SearchBox from "./components/search-box/search-box.component";

const App = () => {
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setfilteredMonsters] = useState(monsters);
  const [searchField, setSearchField] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField)
    });

    setfilteredMonsters(newFilteredMonsters)
  }, [monsters, searchField])

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  }

  return (
    <div className='App'>
      <h1 className='app-title'>Monsters Rolodex</h1>
      <SearchBox
        className='search-box'
        placeholder='search monsters'
        onChangeHandler={onSearchChange} 
      />
      <CardList monsters={filteredMonsters} /> 
    </div>
  );
}

export default App;
