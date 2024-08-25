import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom"
import { CitiesProvider } from "./contexts/CitiesContext"
import { WindowProvider } from "./contexts/WindowContext"
import MainPage from './pages/MainPage'
import ErrorPage from './pages/ErrorPage'
import Form from "./components/Form"
import CitiesList from "./components/CitiesList"
import CountryList from "./components/CountryList"
import CityDetails from "./components/CityDetails"


function App() {

  // zadatak: dohvati sve gradove iz json-a
  // ideja: napravi citiesContext i u njemu pozovi useEffect da dohvatim podatke

  return <>

    <BrowserRouter>
    <WindowProvider>
    <CitiesProvider>  
    <Routes>
      <Route path="/" element={<MainPage/>}>
          <Route index element={<Navigate replace to="cities"/>}></Route>
          <Route path="cities" element={<CitiesList/>}/>
          <Route path="cities/:id" element={<CityDetails/>}/>
          <Route path="countries" element={<CountryList/>}/>
          <Route path="form" element={<Form/>}/>
      </Route>
      <Route path="*" element={<ErrorPage/>}/>
    </Routes>
    </CitiesProvider>
    </WindowProvider>
    </BrowserRouter>
   
  </>


  
}

export default App
