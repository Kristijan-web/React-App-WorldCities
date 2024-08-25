/* eslint react/prop-types: 0 */
import style from "./City.module.css"
import { useCities } from "../contexts/CitiesContext"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



function City({city,handleCityToDelete}) {
  const {isLoading,dispatch} = useCities();
 
  const navigate = useNavigate();

  // klikom na grad treba da se prikaze /cities/city_id?lat=x&lng=y

  function handleImageLoad() {
       dispatch({type: "city/loaded"})
  }

  // ova funkcija handleDelete mora da se pozove u citiesList ako je kliknut continue na confirmation com

  function handleChangeParams(e) {
    if(e.target.getAttribute("data-close")) {
      handleCityToDelete(city)

    }
    else {
      navigate(`/cities/${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`)

    }

  }

  // funkcija koja citiesList componenti salje izabran grad


  
  useEffect(function(){
    dispatch({type: 'city/loading'})
    
    },[dispatch])

    // TODO:  Kada se klikne na close dugme treba da se promemi state i da se return Confirmation componenta
    

return <li className={window.innerWidth < 600 ? `${style.li}` : style.liMain}>
  <img className={style.sakri} onLoad={handleImageLoad} src={`https://flagsapi.com/${city.emoji}/flat/64.png`}/>
    <div onClick={handleChangeParams} className={window.innerWidth < 600 ? `${style.city} ${style.cityWidth}` : style.city}>
    {isLoading ? <span className={style.loader}></span> : <img src={`https://flagsapi.com/${city.emoji}/flat/64.png`}/>}
      <p>{city.cityName}</p>
      <p>{new Date().toLocaleDateString()}</p>
      <p className={style.closeBtn} data-close >&times;</p>
    </div>
    
</li>
}

export default City