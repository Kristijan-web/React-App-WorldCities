/* eslint react/prop-types: 0 */

import { useEffect } from "react";
import { useCities } from "../contexts/CitiesContext"
import style from "./Country.module.css"
function Country({city}) {
        const {isLoading,dispatch} = useCities();

    function handleImageLoad() {

        dispatch({type: "city/loaded"})

    }

    useEffect(function(){
    
        dispatch({type: 'city/loading'})
     },[])

    return <div className={style.countryContainer}>
        {isLoading ? <span className={style.loader}></span> : <img src={`https://flagsapi.com/${city.emoji}/flat/64.png`}/>}
        <img onLoad={handleImageLoad} className={style.hiddenCountry} src={`https://flagsapi.com/${city.emoji}/flat/64.png`}/>
        <p>{city.countryName}</p>
        </div>

}
export default Country