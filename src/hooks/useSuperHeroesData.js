import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get(`http://localhost:4000/superheroes`);
}

const addSuperHero = (hero) => {
  return axios.post(`http://localhost:4000/superheroes`, hero);
}

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery(`super-heroes`, fetchSuperHeroes, {
    onSuccess,
    onError,
    // select: (data) => {
    //   const superHeroNames = data.data.map((hero) => hero.name);
    //   return superHeroNames;
    // },
  });
}

export const useAddSuperHeroData = () =>{
  const queryClient = useQueryClient()

  return useMutation(addSuperHero, {
    onSuccess:(data)=>{
      // queryClient.invalidateQueries(`super-heroes`)
      console.log(data)
      queryClient.setQueriesData(`super-heroes`,(oldQueryData)=>{
        return{
          ...oldQueryData,
          data:[...oldQueryData.data, data.data]
        }
      })
    }
  })
  
}