import { Link } from "react-router-dom";

const HomeWOT = () => {
    return (
        <div className="flex-1 flex justify-center mt-10">
            <div className="card w-[80vw] h-fit bg-base-100 shadow-xl">
                <div className="card-body justify-center items-center text-justify">
                    <h1 className="text-5xl font-bold">Bienvenido!</h1>
                    <p className="py-6">UCP Correlativas es herramienta web <strong>NO</strong> oficial de la Univerdidad de la Cuenca
                        del Plata para poder llevar el control de si en tu situación podés cursar, promocionar o regularizar alguna materia</p>
                    <p className="pb-6">Para continuar, tendrá que registrarse o iniciar sesión</p>
                    <div className="flex">
                        <Link to="/acceso"><button className="btn btn-primary mx-2">Iniciar Sesión</button></Link>
                        <Link to="/registro"><button className="btn btn-primary mx-2">Registrarse</button></Link>
                    </div>
                    <p className="py-6 text-xs">
                        No se solicitan datos del estudiante, se pide registro únicamente para que usted lleve control de su situación,
                        tampoco comprobamos si usted pertenece o no a la universidad.
                        No se recomienda usar su contraseña de la universidad. Su correo y contraseña, quedan completamente cifrados.
                    </p>
                </div>
            </div>
        </div>
    );
};
export default HomeWOT;