import {useQuery} from "@tanstack/react-query";
import {get} from "../api.ts";
import {Hotel} from "../hotels/types.ts";

export const Hotels = ({searchToken}: { searchToken: string }) => {

  const {isPending, error, data: hotels} = useQuery({
    queryKey: ['searchHotels', searchToken],
    queryFn: () => get<Hotel[]>(`hotels?search=${searchToken}`)
  });

  if (isPending) {
    return <p>...Loading...</p>;
  }

  if (error || hotels === undefined) {
    return <p>Failed to load hotels, try again</p>;
  }

  if (hotels.length === 0) {
    return <p>No hotels matched</p>
  }

  return (
    <>
      {
        hotels.map((hotel, index) => (
          <li key={index}>
            <a href={`/hotels/${hotel._id}`} className="dropdown-item">
              <i className="fa fa-building mr-2"></i>
              {hotel.hotel_name}
            </a>
            <hr className="divider"/>
          </li>
        ))
      }
    </>
  )
}