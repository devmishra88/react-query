import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get(`http://localhost:4000/superheroes`);
};

export function RQSuperHeroesPage() {
  const { isLoading, isFetching, data, isError, error, refetch } = useQuery(
    `super-heroes`,
    fetchSuperHeroes,
    {
      enabled: false,
    }
  );

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <button onClick={refetch}>Fetch Heroes</button>
      <h2>RQ Super Hero Page</h2>
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
}
