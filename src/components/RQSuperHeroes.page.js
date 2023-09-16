import React from "react";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";

export function RQSuperHeroesPage() {
  const onSuccess = (data) => {
    console.log(`Perform side effect after data fetching`, data);
  };

  const onError = (error) => {
    console.log(`Perform side effect after encountering error`, error);
  };

  const { isLoading, isFetching, data, isError, error, refetch } =
    useSuperHeroesData(onSuccess, onError);

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
      {/* {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })} */}
      {data.map((heroNames) => {
        return <div key={heroNames}>{heroNames}</div>;
      })}
    </>
  );
}
