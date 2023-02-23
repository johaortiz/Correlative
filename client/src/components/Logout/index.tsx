import Cookies from "js-cookie";

const Logout = () => {
    const logout = (e: any) => {
        e.preventDefault();
        Cookies.remove("token");
        return window.location.replace("/");
    };

    return (
        <div onClick={logout}>Cerrar Sesión</div>
    );
};
export default Logout;