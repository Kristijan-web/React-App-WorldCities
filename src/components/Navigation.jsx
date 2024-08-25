import { useWindow } from "../contexts/WindowContext";
import style from "./Navigation.module.css"
function Navigation() {
   const {currWidthAbove600,dispatchWindow, mapClicked} = useWindow();


   function handleBurgerClick() {
    if(mapClicked == true) {
        dispatchWindow({type: "mapClicked/false"})
    }
    else {
        dispatchWindow({type: "mapClicked/true"})

    }
   }
    
    // clickom na burger iconicu state mapClicked staviti na true
    if(currWidthAbove600) return null;
    return <header className={style.header}>
            <p className={style.logo}>World cities</p>

        <nav className={style.nav}>
           <img className={style.burgerMenu} onClick={handleBurgerClick} src="/images/burger-bar.png"/>
        </nav>
    </header>
}

export default Navigation