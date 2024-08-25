/* eslint react/prop-types: 0 */
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    useMapEvents
  } from 'react-leaflet'
import style from "./Map.module.css"
import { useCities } from '../contexts/CitiesContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useWindow } from '../contexts/WindowContext';


function Map() {
        
    const {cities,position,dispatch,isLoading} = useCities();
    const {dispatchWindow} = useWindow();

    function handleImageLoad() {
      
        dispatch({type: "city/loaded"})
   
    }
    useEffect(function(){
      dispatch({type: "city/loading"})
    },[dispatch])

   // napravi useEffect koji osluskuje promene u url-u, kad se desi promena

      return <div className={style.map} id="map">
       
      <MapContainer center={position} zoom={5} scrollWheelZoom={true} className={style.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map(city => {

         return <Marker position={[city.position.lat,city.position.lng]} key={city.id}>
          <Popup >
         
            <div className={style.popup}>
            {/* <img className={style.sakri} onLoad={handleImageLoad} src={`https://flagsapi.com/${city.emoji}/flat/64.png`}/> */}
            {isLoading ? <span className={style.loader}></span> : <img className={style.flag} onLoad={handleImageLoad} src={`https://flagsapi.com/${city.emoji}/flat/64.png`}/>}<br /><p className={style.cityName}>{city.cityName}</p>
            </div>
         
          </Popup>
          </Marker>
        })}
   
        <InteractiveMap position={position}/>
      <MapClick dispatch={dispatch} dispatchWindow={dispatchWindow}/>
      </MapContainer>
      </div>
    
}
function InteractiveMap({position}) {

   let map = useMap();
   map.setView(position);

  return null
}
function MapClick({dispatch,dispatchWindow}) {
  const navigate = useNavigate();
   const map = useMapEvents({
    click: (e) => {
      // Kada se desi klik treba pozvati navigate koji ce setovati form?lat=x&lng=y
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`); 
      map.locate();
      dispatch({type: "mapPosition/set", data: [e.latlng.lat,e.latlng.lng]})
      dispatchWindow({type: "mapClicked/true"})
    },
   })
}

export default Map