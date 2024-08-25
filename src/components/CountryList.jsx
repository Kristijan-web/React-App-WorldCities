import style from "./CountryList.module.css"
import Country from "./Country"
import { useCities } from "../contexts/CitiesContext"
function CountryList() {
 const {cities} = useCities();
 let uniqueCities = [];

 
 // 3 ideja

//  cities.forEach(function(mainCity) {
//    if(uniqueCities?.cityName?.includes(mainCity.cityName)) {
//       return;
//    }
//    else {
//       uniqueCities.push(mainCity);
//    }
//  })

 // 4 ideja
 cities.forEach(function(mainCity) {
   if(uniqueCities.some(uniqueCity =>uniqueCity.emoji == mainCity.emoji )) {
       return;
   }
   else {
      uniqueCities.push(mainCity);
   }
 })
 if(cities.length == 0) return  <p className={style.emptySidebar}>👋 Start by clicking on the map</p>
 return <div className={window.innerWidth < 600 ? `${ style.countriesContainer} ${style.countriesContainerWidth}` : `${style.countriesContainer}`}>
    {uniqueCities?.map(city => <Country city={city} key={city.id}/>)}
 </div>
}

export default CountryList