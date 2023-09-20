import { Fragment } from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";

const fetchColors = ({ pageParam = 1 }) => {
    console.log(pageParam)
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

export const InfiniteQueries = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(["colors"], fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>
        {data?.pages.map((group, index) => {
          return (
            <Fragment key={index}>
              {group?.data?.map((color) => {
                return (
                  <div key={color.id}>
                    <h2>
                      {color.id}. {color.label}
                    </h2>
                  </div>
                );
              })}
            </Fragment>
          );
        })}
      </div>
      <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
        Load more
      </button>
      <div>{isFetching && !isFetchingNextPage ? `Fetching...` : null}</div>
    </>
  );
};
