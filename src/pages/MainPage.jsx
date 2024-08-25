import Sidebar from "../components/Sidebar"
import Map from "../components/Map"
import style from "./MainPage.module.css"
import Navigation from "../components/Navigation"
import { useSearchParams } from "react-router-dom"
import { useWindow } from "../contexts/WindowContext"

function MainPage() {
     
    // ideja je da: kad se klikne na mapu, vraca se samo sidebar a ne map, kad se unese nova lokacija, onda se vraca i map
    // klikom na mapu se setuje lat i lng u state na osnovu toga vracaj map

    // mada ovo raditi samo ako sirina manja od 600px

    // ne moze preko position mora da se hvala url


    // problem 2: kako prikati cities i countries kada je width ispod 600px

    // mora totalno drugacija logika
    // raditi da kad se klikne na mapu state mapClicked je setan na true i prikazuje se forma
    // kada je kliknut submit na formi state mapClicked se stavlja na false
     


    const [searchParams] = useSearchParams();
    console.log(searchParams);  
    // const lat = searchParams.get('lat');

    const {mapClicked} = useWindow();

    return <div className={style.mainPage}>
        <Navigation/>
        {/* {(window.innerWidth < 600) && lat ? <Sidebar/> : null}
        {(window.innerWidth < 600) && !lat ? <Map/> : null }

        {window.innerWidth > 600 && <Sidebar/>}
        {window.innerWidth > 600 && <Map/>} */}


        {mapClicked && window.innerWidth < 600 ? <Sidebar/> : null}
        {(window.innerWidth) > 600 && <Sidebar/>}

        {!mapClicked && window.innerWidth < 600 ? <Map/> : null}
        {window.innerWidth > 600 ? <Map/> : false}

    

    </div>
}
export default MainPage