import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {SearchPage} from "./search";
import {HotelPage} from "./hotels";
import {CountryPage} from "./countries";
import {CityPage} from "./cities";


const queryClient = new QueryClient()

function App() {


  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="hotels/:id" element={<HotelPage />} />
          <Route path="countries/:isoCode" element={<CountryPage />} />
          <Route path="cities/:name" element={<CityPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}


export default App;
