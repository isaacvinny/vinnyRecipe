import chefIcon from "../assets/images/chef-icon.png"
import { Link } from "react-router-dom"
import "../css/Navbar.css"

function Navbar(){
    return(
        <div className="nav">
            <img src={chefIcon} alt="" />
            <Link className="nav-link" to="/"><h2>Vinny's Recipe</h2></Link>
        </div>
    )
}
export default Navbar