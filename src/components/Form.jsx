/* eslint react/prop-types: 0 */

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from "./Form.module.css"
import { forwardRef, useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useWindow } from "../contexts/WindowContext";
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
const today = new Date();
function Form() {
    const [cityData,setCityData] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [note,setNote] = useState("");
    const {position,createCity,dispatch} = useCities();
    const {dispatchWindow} = useWindow();
    // treba mi hook sa kojim cu procitati parametre iz urla
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    console.log(cityData);
    const lat = searchParams.get('lat');

    const ExampleCustomInput = forwardRef(
        ({ value, onClick, className }, ref) => (
          <button className={className} onClick={onClick} ref={ref}>
            {value}
          </button>
        ),)
        ExampleCustomInput.displayName = 'ExampleCustomInput';


      // Zadatak: prebaci podatke koje je korisnik uneo mockapi-u 
    
    // podaci unutar cityData objekta:
//      "city":"Migne"
//      "continent":"Europe"
//      "continentCode":"EU"
//      "countryCode":"FR"
//      "countryName":"France"
//      "latitude":"46.637327411155894
//      locality":"Migne"
    function handleChangeCity(e) {
         setCityData(function (city) {
            return {...city,city: e.target.value}
         })
     }

    function handleNote(e) {
        setNote(e.target.value);
     }

     function handleSubmit() {
      
        
        // trebam da podatke iz forme prebacim u json fajl
        const dataToSend = {
            cityName: cityData.city,
            date: today.toLocaleDateString(),
            notes: note,
            emoji: cityData.countryCode,
            id: new Date().getTime(),
            countryName: cityData.countryName,
            position: {
                lat: searchParams.get('lat'),
                lng: searchParams.get('lng')
            }
            // dodaj bre lat i lng za grad koji je korisnik izabrao
            // ovaj objekat salji createCity funkciji u cityContextu
        }
        createCity(dataToSend);
        dispatchWindow({type: "mapClicked/false"})
        

    }
    function handleNavigatePrevious() {
        navigate(-1);

    }
    function handleDatePicker() {
        // e.preventDefault(); 

    }
    

     useEffect(function(){
        async function getCityData() {
            setCityData(null);
            const getData = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position[0]}&longitude=${position[1]}`);
            const cityInfo = await getData.json();
            setCityData(cityInfo);
            
        }
        getCityData();
    },[position],lat)
    
    useEffect(function() {
      dispatch({type: "mapPosition/set", data: [searchParams.get('lat'),searchParams.get('lng')]})
    },[lat],dispatch)
    
    if(!cityData) return <span className={style.loader}></span> 
    if(cityData.city == '') return  <p className={style.notCity}>😮 This does not seem to be a city, please click somewhere else 😄</p>
    return <form className={style.myForm}  onSubmit={(event) => { event.preventDefault(); }}>
                <p>City name:</p>
                <input type='text' className={style.cityTitle} value={cityData?.city} onChange={handleChangeCity}/>
                <p>Date:</p>
                <DatePicker onClick={handleDatePicker} customInput={<ExampleCustomInput className={style.datePickerInput} />}
                className={style.dateLibrary} selected={startDate} onChange={(date) => setStartDate(date)} />
                <p>Note:</p>
                <input className={style.note} type='text' value={note} onChange={handleNote}/>
                <div className={style.buttons}>
                    <button onClick={handleNavigatePrevious}>Back</button>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
           </form>

    
}

export default Form