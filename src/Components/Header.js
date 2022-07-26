import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div>
        <Link to="/">buscalivro</Link>
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
