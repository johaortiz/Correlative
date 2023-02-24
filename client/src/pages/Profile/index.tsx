import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";
import { motion } from "framer-motion";


const Profile = () => {

    const token: string = Cookies.get("token") || "";
    const account: any = decodeToken(token);

    return (
        <motion.div initial={{ width: 0 }} animate={{ width: "100vw" }} exit={{ width: window.innerWidth, transition: { duration: 0.1 } }} className="flex items-center justify-center">
            <div className="card lg:card-side bg-base-100 shadow-xl mt-20">
                <figure><img src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album" /></figure>
                <div className="card-body">
                    <h2 className="card-title mb-4">Username: {account.username}</h2>
                    <p><strong>Carrera:</strong> {account.careerName}</p>
                    <p><strong>Estado:</strong> {account.isActive ? "Activo" : "Inactivo, por favor verifique la cuenta en su correo, si no lo encuentra revise SPAM o Correo no deseado"}</p>
                    <p><strong>Materias Aprobadas:</strong> <small>Proximamente...</small></p>
                    <p><strong>Materias Regularizadas:</strong> <small>Proximamente...</small></p>
                    <p><strong>Cantidad de Materias:</strong> <small>Proximamente...</small></p>
                    <div className="card-actions justify-end">
                        {/* <button className="btn btn-primary">Listen</button> */}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
export default Profile;