import {useQuery} from "@tanstack/react-query";
import {get} from "../api";
import { useParams } from 'react-router-dom';
import {City} from "./types";

export const CityPage = () => {
  const { name } = useParams<{name: string}>();

  if (name === undefined) {
    throw new Error('name not defined');
  }

  const {isPending, error, data: city} = useQuery({
    queryKey: ['getCityByName', name],
    queryFn: () => get<City>(`cities/${name}`)
  });

  if (isPending) {
    return <p>...Loading...</p>;
  }

  if (error || city === undefined) {
    return <p>Failed to load city details, try again</p>;
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <h2>City</h2>
          <p>{city.name}</p>
        </div>
      </div>
    </div>
  )
}