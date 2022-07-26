import React from 'react';

const useFetch = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(null);

  const request = React.useCallback(async (url) => {
    try {
      setLoading(true);
      setData(null);
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, request };
};

export default useFetch;
