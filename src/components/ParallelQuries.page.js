import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get(`http://localhost:4000/superheroes`);
};

const fetchFriends = () => {
  return axios.get(`http://localhost:4000/friends`);
};

export const ParallelQuriesPage = () => {
  const { data: superHeroes } = useQuery(`super-heroes`, fetchSuperHeroes);
  const { data: friends } = useQuery(`friends`, fetchFriends);

  console.log(superHeroes.data);
  console.log(friends.data);

  return <div>ParallelQuries page</div>;
};
