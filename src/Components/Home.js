import React from 'react';
import styles from './Home.module.css';
import SearchBar from './SearchBar';

const Home = () => {
  React.useEffect(() => {
    document.title = 'Busca Livro';
  }, []);

  return (
    <section className={styles.home}>
      <div>
        <h1>buscalivro</h1>
        <SearchBar />
        <p>Milhares de livros prontos para serem encontrados.</p>
      </div>
    </section>
  );
};

export default Home;
