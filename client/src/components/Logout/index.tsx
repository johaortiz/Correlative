import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Logout = () => {

    const navigate = useNavigate();

    const logout = (e: any) => {
        e.preventDefault();
        Cookies.remove("token");
        navigate("/login");
    };

    return (
        <div onClick={logout}>Cerrar Sesión</div>
    );
};
export default Logout;