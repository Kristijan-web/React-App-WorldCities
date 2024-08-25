/* eslint react/prop-types: 0 */

import { useCities } from "../contexts/CitiesContext"
import style from "./Confirmation.module.css"
function Confirmation({cityToDelete,text,handleCityToDelete}) {
    const {deleteCity} = useCities();
    
    function handleDelete() {
     deleteCity(cityToDelete.id)
     handleCityToDelete(false);

    }
    function handleBack() {
        handleCityToDelete(false);
    }
    return <div className={style.confirmationContainer}>
    <p>Continue with removing city {text}?</p>
    <div className={style.buttonsContainer}>
    <button onClick={handleDelete}>Continue</button>
    <button onClick={handleBack}>Back</button>
    </div>
    </div>
}

export default Confirmation