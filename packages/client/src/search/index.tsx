import {ReactElement, useState} from 'react';
import {Hotels} from "./hotels.tsx";
import {Countries} from "./countries.tsx";
import {Cities} from "./cities.tsx";

export const SearchPage = (): ReactElement => {
  const [searchToken, setSearchToken] = useState<string>('');

  return (
    <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="dropdown">
              <div className="form">
                <i className="fa fa-search"></i>
                <input
                  type="text"
                  value={searchToken}
                  className="form-control form-input"
                  placeholder="Search accommodation..."
                  onChange={(e) => setSearchToken(e.target.value)}
                />
                {!!searchToken && (
                  <span className="left-pan">
                    <i className="fa fa-close" onClick={() => setSearchToken("")}></i>
                  </span>
                )}
              </div>
              {!!searchToken && <Dropdown searchToken={searchToken}/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Dropdown = ({searchToken}: { searchToken: string }): ReactElement => {
  return (
    <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
      <h2>Hotels</h2>
      <Hotels searchToken={searchToken} />
      <h2>Countries</h2>
      <Countries searchToken={searchToken} />
      <h2>Cities</h2>
      <Cities searchToken={searchToken} />
    </div>
  )
}