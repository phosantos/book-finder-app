import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [value, setValue] = React.useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (value) {
      const searchParam = value.split(' ').join('+').toLowerCase();
      navigate(`/search?q=${searchParam}`);
    }
  }

  return (
    <form
      className={styles.searchBar}
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <input
        type="text"
        name="searchbar"
        id="searchbar"
        placeholder="Pesquise por título ou autor..."
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
      <button><span>Pesquisar</span></button>
    </form>
  );
};

export default SearchBar;
