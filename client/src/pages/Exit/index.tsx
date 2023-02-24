import { motion } from "framer-motion";
import bg from "../../assets/images/exit.png";
import Logout from "../../components/Logout";


const Exit = () => {
    return (
        <motion.div className="hero min-h-screen" style={{ backgroundImage: `url(${bg})` }} initial={{ width: 0 }} animate={{ width: "100vw" }} exit={{ width: window.innerWidth, transition: { duration: 0.1 } }}>
            <div className="hero-overlay bg-opacity-70"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">¡Oops!</h1>
                    <p className="mb-1">Parece que estás queriendo <strong className="text-slate-900">Iniciar Sesión</strong> o
                        <strong className="text-slate-900"> Registrarte</strong> pero ya tienes una sesión activa.</p>
                    <p className="mb-3">¿Desea Cerrar Sesión para continuar? <strong className="text-xl">🤔🤔</strong></p>
                    <p className="mb-5">¿Qué estabas intentado hacer?<strong className="texl-xl">👀👀</strong></p>
                    <button className="btn btn-primary"><Logout /></button>
                </div>
            </div>
        </motion.div>
    );
};
export default Exit;