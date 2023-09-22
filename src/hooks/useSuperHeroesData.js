import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get(`http://localhost:4000/superheroes`);
};

const addSuperHero = (hero) => {
  return axios.post(`http://localhost:4000/superheroes`, hero);
};

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery(`super-heroes`, fetchSuperHeroes, {
    onSuccess,
    onError,
    // select: (data) => {
    //   const superHeroNames = data.data.map((hero) => hero.name);
    //   return superHeroNames;
    // },
  });
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();

  return useMutation(addSuperHero, {
    // onSuccess:(data)=>{
    //   // queryClient.invalidateQueries(`super-heroes`)
    //   queryClient.setQueriesData(`super-heroes`,(oldQueryData)=>{
    //     return{
    //       ...oldQueryData,
    //       data:[...oldQueryData.data, data.data]
    //     }
    //   })
    // }
    /*---------------suppose data saving will not have any error------------*/
    /*---------------Optimistic Updates------------*/
    onMutate: async (newHero) => {
      await queryClient.cancelQueries(`super-heroes`);
      const previousHeroData = queryClient.getQueryData(`super-heroes`);
      /*----------append new data-------*/
      queryClient.setQueriesData(`super-heroes`, (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        };
      })
      /*----------return previous catched data-------*/
      return{
        previousHeroData, 
      }
    },
    onError: (_error, _hero, context) => {
      /*----------set previous data if any error from api-------*/
      queryClient.setQueryData(`super-heroes`, context.previousHeroData)
    },
    onSettled: () => {
      /*----------sync data from the db-------*/
      queryClient.invalidateQueries(`super-heroes`)
    },
  });
};
