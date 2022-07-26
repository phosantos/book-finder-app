import React from 'react';
import { useParams } from 'react-router-dom';
import API_KEY from '../API_KEY';
import useFetch from '../Hooks/useFetch';
import Header from './Header';
import styles from './Book.module.css';
import Loading from './Loading';

const Book = () => {
  const { id } = useParams();
  const { data, loading, request } = useFetch();

  React.useEffect(() => {
    const url = `https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`;
    request(url);
  }, [id, request]);

  React.useEffect(() => {
    if (data) document.title = data.volumeInfo.title + ' | Busca Livro';
  }, [data]);

  return (
    <>
      <Header />
      {loading && <Loading />}
      {data && (
        <section className={styles.book}>
          <div className={styles.volumeInfo1}>
            <div className={styles.thumbImg}>
              {data.volumeInfo.imageLinks ? (
                <img
                  src={data.volumeInfo.imageLinks.thumbnail}
                  alt={data.volumeInfo.title}
                ></img>
              ) : (
                <span>Imagem não disponível</span>
              )}
            </div>

            <div>
              {data.volumeInfo.title && (
                <h1 className={styles.title}>{data.volumeInfo.title}</h1>
              )}
              {data.volumeInfo.subtitle && (
                <p className={styles.subtitle}>{data.volumeInfo.subtitle}</p>
              )}
              {data.volumeInfo.authors && data.volumeInfo.publishedDate && (
                <p className={styles.authorAndYear}>
                  Por {data.volumeInfo.authors[0]} ·{' '}
                  {data.volumeInfo.publishedDate.slice(0, 4)}
                </p>
              )}

              <div className={styles.buttons}>
                {data.volumeInfo.previewLink && (
                  <a href={data.volumeInfo.previewLink}>Ler demonstração</a>
                )}
                {data.saleInfo.buyLink && (
                  <a href={data.saleInfo.buyLink}>Comprar</a>
                )}
              </div>
            </div>
          </div>

          <ul className={styles.volumeInfo2}>
            {data.volumeInfo.pageCount && (
              <li>
                <p>Páginas: </p> <p>{data.volumeInfo.pageCount}</p>
              </li>
            )}
            {data.volumeInfo.publishedDate && (
              <li>
                <p>Publicação: </p>{' '}
                <p>
                  {new Date(data.volumeInfo.publishedDate).toLocaleDateString()}
                </p>
              </li>
            )}
            {data.volumeInfo.publisher && (
              <li>
                <p>Editora: </p>
                <p>{data.volumeInfo.publisher}</p>
              </li>
            )}
            {data.volumeInfo.language && (
              <li>
                <p>Idioma: </p> <p>{data.volumeInfo.language}</p>
              </li>
            )}
            {data.volumeInfo.authors && (
              <li>
                <p>Autor: </p> <p>{data.volumeInfo.authors[0]}</p>
              </li>
            )}
            {data.volumeInfo.averageRating && (
              <li>
                <p>Classificação: </p> <p>{data.volumeInfo.averageRating}/5</p>
              </li>
            )}
          </ul>

          {data.volumeInfo.description && (
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{
                __html: data.volumeInfo.description,
              }}
            ></div>
          )}
        </section>
      )}
    </>
  );
};

export default Book;
