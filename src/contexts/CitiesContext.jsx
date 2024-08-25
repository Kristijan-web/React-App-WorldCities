/* eslint react/prop-types: 0 */

import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const CitiesContext = createContext();

const initialState = {
    cities: [],
    city: [],
    isLoading: false,
    position: [40,20],
}

function reducer(state,payload) {

     switch (payload.type) {
        // case "ready": return [...state,cities: 5]
        case "cities/fetched": 
        return {...state,cities: payload.data, isLoading: false};
        case "city/loading": 
            return {...state,isLoading: true}
        
        case "city/loaded": 
            return {...state,isLoading: false}
        
        case "city/add": {
            return {...state,cities: [...state.cities,payload.data]}
        }

        case "mapPosition/set": {
            return {...state,position: payload.data}
        }
        case "singleCity/add": {
            return {...state,city: payload.data}
        
        }
        case "position/set": {
            return {...state,position: payload.data}
        }
     
    
        default: throw new Error("Reducer zajebao");

        
     }

}
function CitiesProvider({children}) {

     const [{cities,isLoading,position,city},dispatch] = useReducer(reducer,initialState)
     const navigate = useNavigate();

 
    // useEffect(function(){
    //     // dohvata gradove iz localStorage-a
    //     console.log("EVO DESILA SE PROMENA U LOCAL STORAGE-U")
      
    // },[localStorage.getItem('cities')]);

    useEffect(function() {
        getCitiesFromLocal();
    },[])

    function getCitiesFromLocal() {
        if(localStorage.getItem('cities')) {
            const localStorageCities = JSON.parse(localStorage.getItem('cities'));
            dispatch({type: "cities/fetched", data: localStorageCities})
         }
    }

    
  

    function deleteCity(id) {
        const localCities = JSON.parse(localStorage.getItem('cities'));
        const newCities = localCities.filter(city => city.id != id);
        localStorage.setItem('cities',JSON.stringify(newCities));
        getCitiesFromLocal();

    }

    async function createCity(newCity) {

        if(localStorage?.getItem('cities')) {
            const dataFromLocal = JSON.parse(localStorage.getItem('cities'));
            localStorage.setItem("cities",JSON.stringify([...dataFromLocal,newCity]))
            getCitiesFromLocal();
            navigate("/cities");


        }
        else {
            localStorage.setItem("cities",JSON.stringify([newCity]));
            getCitiesFromLocal();
            navigate("/cities");

        }
 
    }

    return <CitiesContext.Provider value={{cities,isLoading,position,city,createCity,deleteCity,getCitiesFromLocal,dispatch}}>
        {children}
    </CitiesContext.Provider>

}

function useCities() {
    const x = useContext(CitiesContext);
    if(!x) {
        throw new Error("The component has not subscribed to the context of cities")
    }
    return x;
}

export {CitiesProvider,useCities}