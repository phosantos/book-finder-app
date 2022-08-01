import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styles from './Search.module.css';
import API_KEY from '../API_KEY';
import useFetch from '../Hooks/useFetch';
import Header from './Header';
import Loading from './Loading';

const Search = () => {
  const [searchParams] = useSearchParams();
  const { data, loading, request } = useFetch();

  React.useEffect(() => {
    document.title = 'Busca Livro';
  }, []);

  React.useEffect(() => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchParams.get(
      'q',
    )}&maxResults=20&key=${API_KEY}`;
    request(url);
  }, [searchParams, request]);

  return (
    <>
      <Header />

      {loading && <Loading />}
      {data && (
        <section className={styles.results}>
          <span>
            <strong>{data.totalItems}</strong> resultados encontrados.
          </span>
          <div className={styles.resultsWrapper}>
            {data.items &&
              data.items.map((book) => {
                return (
                  <div key={book.id} className={styles.resultBook}>
                    <div className={styles.thumbImg}>
                      {book.volumeInfo.imageLinks ? (
                        <img
                          src={`${book.volumeInfo.imageLinks.smallThumbnail}`}
                          alt={`${book.volumeInfo.title}`}
                        />
                      ) : (
                        <span>Imagem não disponível</span>
                      )}
                    </div>
                    <div className={styles.textWrapper}>
                      <Link className={styles.title} to={`/book/${book.id}`}>
                        {book.volumeInfo.title}
                      </Link>
                      {book.volumeInfo.subtitle && (
                        <p className={styles.subtitle}>
                          {book.volumeInfo.subtitle}
                        </p>
                      )}
                      {book.volumeInfo.authors && (
                        <p className={styles.author}>
                          {book.volumeInfo.authors[0]}
                        </p>
                      )}
                      {book.volumeInfo.publishedDate && (
                        <p className={styles.publicationYear}>
                          {book.volumeInfo.publishedDate.slice(0, 4)}
                        </p>
                      )}
                      {book.searchInfo && (
                        <p
                          className={styles.snippet}
                          dangerouslySetInnerHTML={{
                            __html: book.searchInfo.textSnippet,
                          }}
                        ></p>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      )}
    </>
  );
};

export default Search;
