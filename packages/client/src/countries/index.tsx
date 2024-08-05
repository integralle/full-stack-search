import {useQuery} from "@tanstack/react-query";
import {get} from "../api.ts";
import { useParams } from 'react-router-dom';
import {Country} from "./types.ts";

export const CountryPage = () => {
  const { isoCode } = useParams<{isoCode: string}>();

  if (isoCode === undefined) {
    throw new Error('isoCode not defined');
  }

  const {isPending, error, data: country} = useQuery({
    queryKey: ['getCountryByIsoCode', isoCode],
    queryFn: () => get<Country>(`countries/${isoCode}`)
  });

  if (isPending) {
    return <p>...Loading...</p>;
  }

  if (error || country === undefined) {
    return <p>Failed to load country details, try again</p>;
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <h2>Country</h2>
          <p>{country.country}</p>
        </div>
      </div>
    </div>
  )
}