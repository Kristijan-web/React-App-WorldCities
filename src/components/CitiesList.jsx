import { useState } from "react";
import { useCities } from "../contexts/CitiesContext"
import style from "./CitiesList.module.css"
import City from "./City.jsx"
import Confirmation from "./Confirmation.jsx";
function CitiesList() {
    // uzmi cities iz contexta
    const {cities} = useCities();
    const [cityToDelete,setCityToDelete] = useState(false);

    function handleCityToDelete(cityInfo) {
         setCityToDelete(cityInfo);
    }
    
    // TREBA NAPRAVITI DA SE BACI TIMEOUT NAKON 8+ SEKUNDI LOADANJA, to znaci da korisniku internet ne valja

    // na osnovu trenutnih city-a napravi njihove markere na mapi

      if(cityToDelete) return <Confirmation cityToDelete={cityToDelete} text={cityToDelete.cityName} handleCityToDelete={handleCityToDelete}/>

      if(cities.length === 0) return <p className={style.emptySidebar}>👋 Start by clicking on the map</p>

        return <ul className={style.citiesContainer}>
        {cities.map(function(city) {
            return <City city={city} key={city.id} handleCityToDelete={handleCityToDelete}/>
        })}
    </ul>
    
    
 
}
export default CitiesList