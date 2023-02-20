import { Link } from "react-router-dom";
import ucp from "../../assets/images/ucp.png";
import Clock from "../Clock";


const NavBar = () => {
    return (
        <div className="bg-base-200">
            <div className="navbar bg-base-100 rounded-b-3xl">
                <div className="navbar-start">
                    <div className="flex-1">
                        <a className="btn btn-ghost normal-case text-xl overflow-hidden">
                            <img src={ucp} className="h-5 mr-2" alt="Ucp Logo" />
                            UCP Correlativas
                        </a>
                    </div>
                </div>
                <div className="navbar-start">
                    <Clock />
                </div>
                <div className="flex-none navbar-end">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to="#">Sobre Mi</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
};
export default NavBar;