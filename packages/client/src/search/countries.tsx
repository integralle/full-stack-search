import {useQuery} from "@tanstack/react-query";
import {ReactElement} from "react";
import {get} from "../api.ts";
import {Country} from "../countries/types.ts";

export const Countries = ({searchToken}: { searchToken: string }): ReactElement => {

  const {isPending, error, data: countries} = useQuery({
    queryKey: ['searchCountries', searchToken],
    queryFn: () => get<Country[]>(`countries?search=${searchToken}`)
  });

  if (isPending) {
    return <p>...Loading...</p>;
  }

  if (error || countries === undefined) {
    return <p>Failed to load countries, try again</p>;
  }

  if (countries.length === 0) {
    return <p>No countries matched</p>
  }

  return (
    <>
      {
        countries.map((country, index) => (
          <li key={index}>
            <a href={`/countries/${country.countryisocode}`} className="dropdown-item">
              <i className="fa fa-building mr-2"></i>
              {country.country}
            </a>
            <hr className="divider"/>
          </li>
        ))
      }
    </>
  )
}