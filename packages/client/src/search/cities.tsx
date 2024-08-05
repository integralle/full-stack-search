import {useQuery} from "@tanstack/react-query";
import {get} from "../api.ts";
import {ReactElement} from "react";
import {City} from "../cities/types.ts";

export const Cities = ({searchToken}: { searchToken: string }): ReactElement => {

  const {isPending, error, data: cities} = useQuery({
    queryKey: ['searchCities', searchToken],
    queryFn: () => get<City[]>(`cities?search=${searchToken}`)
  });

  if (isPending) {
    return <p>...Loading...</p>;
  }

  if (error || cities === undefined) {
    return <p>Failed to load cities, try again</p>;
  }

  if (cities.length === 0) {
    return <p>No cities matched</p>
  }

  return (
    <>
      {
        cities.map((city, index) => (
          <li key={index}>
            <a href={`/cities/${city.name}`} className="dropdown-item">
              <i className="fa fa-building mr-2"></i>
              {city.name}
            </a>
            <hr className="divider"/>
          </li>
        ))
      }
    </>
  )
}