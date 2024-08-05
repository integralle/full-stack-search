import {useQuery} from "@tanstack/react-query";
import {get} from "../api.ts";
import { useParams } from 'react-router-dom';
import {Hotel} from "./types.ts";

export const HotelPage = () => {
  const { id } = useParams<{id: string}>();

  if (id === undefined) {
    throw new Error('Id not defined');
  }

  const {isPending, error, data: hotel} = useQuery({
    queryKey: ['getHotelById', id],
    queryFn: () => get<Hotel>(`hotels/${id}`)
  });

  if (isPending) {
    return <p>...Loading...</p>;
  }

  if (error || hotel === undefined) {
    return <p>Failed to load hotel details, try again</p>;
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <h2>Hotel</h2>
            <p>{hotel.hotel_name}</p>
            <p>{hotel.chain_name}</p>
            <p>{hotel.city}</p>
            <p>{hotel.country}</p>
          </div>
        </div>
      </div>
    </div>
  )
}