import { NavLink, Outlet } from "react-router-dom"
import style from "./Sidebar.module.css"

function Sidebar() {

  // Subscribe na WindowContext uzmi state za prikaz sidebara i return sidebar na osnovu tog state-a
  // isto tako i za navigation componentu kada se sidebar ugasi navbar se pojavi


 
  return <div className={window.innerWidth < 600 ? `${style.sidebar} ${style.sidebarResponsive}` : style.sidebar}>
    <div className={style.sidebarHolder}>
    <h1 className={style.title}>WorldCities</h1>
    <nav className={style.navigation}>
    <ul>
      <li>
        <NavLink className={style.cities} to="/cities">Cities</NavLink>
      </li>
      <li>
      <NavLink className={style.countries} to="/countries">Countries</NavLink>
      </li>
    </ul>
    </nav>

    <Outlet/>
    </div>
  </div>
}
export default Sidebar