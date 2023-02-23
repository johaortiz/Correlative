import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";
import { Link } from "react-router-dom";
import ucp from "../../assets/images/ucp.png";
import profile from "../../assets/svg/navbar/profile.svg";
import Clock from "../Clock";
import Logout from "../Logout";

const token: string = Cookies.get("token") || "";
const account: any = decodeToken(token);

const NavBar = () => {
    return (
        <div className="bg-base-200">
            <div className="navbar bg-teal-600 rounded-b-3xl">
                <div className="navbar-start">
                    <div className="flex-1">
                        <Link to="/" className="btn btn-ghost normal-case text-xl overflow-hidden">
                            <img src={ucp} className="h-5 mr-2" alt="Ucp Logo" />
                            UCP Correlativas
                        </Link>
                    </div>
                </div>
                <div className="navbar-start">
                    {/* <Clock /> */}
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-8 rounded-full">
                            <img src={profile} />
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                        {
                            account ? <>
                                <li>
                                    <Link to="/perfil" className="justify-between">
                                        Perfil
                                        <span className="badge">Nuevo</span>
                                    </Link>
                                </li>
                                <li><Link to="/ajustes">Ajustes</Link></li>
                                <li><Logout /></li>
                            </> : <>
                                <li><Link to="/acceso">Iniciar Sesión</Link></li>
                                <li><Link to="/registro">Registrarse</Link></li>
                            </>
                        }

                    </ul>
                </div>
            </div>
        </div>
    )
};
export default NavBar;