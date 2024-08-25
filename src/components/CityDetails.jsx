import { useParams, useSearchParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext"
import style from "./CityDetails.module.css"
import { useEffect } from "react";
function CityDetails() {

    // const {dispatch} = useCities();

    const {dispatch,city,isLoading} = useCities();
    const {id} = useParams();
    const [searchParams] = useSearchParams();
    // console.log(city);
    // sad treba preko ida izvaditi iz localStoragea grad
    
  
    // efekat koji uzima kliknuti grad iz localStorage-a
    useEffect(function(){
        if(localStorage.getItem('cities')){
            const citiesLocal = JSON.parse(localStorage.getItem('cities'));
            const city = citiesLocal.find(cityLocal => cityLocal.id == id);
            console.log(city);
            dispatch({type: "singleCity/add", data: city})
    
        }

    },[])


    // efekat koji menja position state
    useEffect(function(){
        
     dispatch({type: "position/set", data: [searchParams.get("lat"),searchParams.get("lng")]})
    },[])

    //efekat koji setuje isLoading state na true;
    useEffect(function(){
        dispatch({type: "city/loading"})
    },[])

    function handleImageLoad() {
        dispatch({type: "city/loaded"})
   }


    return <div className={style.cityContainer}>
        <p>City Name</p>
        <p> {city.cityName} {city.length != 0 && !isLoading ? <img className={style.flagImage} src={`https://flagsapi.com/${city.emoji}/flat/64.png`}/> :<span className={style.loader}></span>}</p>
        <p>You went to {city.cityName   } on</p>
        <p>{city.date}</p>
        <p>Your notes</p>
        <p>{city.notes}</p>
        <p>Learn more</p>
        <a href={`https://en.wikipedia.org/wiki/${city.cityName}`} target="_blank">Checkout {city.cityName} on wikipedia</a>
        <img className={style.sakri} onLoad={handleImageLoad} src={`https://flagsapi.com/${city.emoji}/flat/64.png`}/>
        {city.length != 0 ? <img className={style.sakri} onLoad={handleImageLoad} src={`https://flagsapi.com/${city.emoji}/flat/64.png`}/> : ""}


    </div>
}

export default CityDetails