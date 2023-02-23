import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import bg from "../../assets/images/notFound.jpg";

const NotFound = () => {
    return (
        <motion.div className="hero min-h-screen" style={{ backgroundImage: `url(${bg})` }} initial={{ width: 0 }} animate={{ width: "100vw" }} exit={{ width: window.innerWidth, transition: { duration: 0.1 } }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Error 404</h1>
                    <p className="mb-5">No encontramos esta página en nuestros datos <strong className="text-xl">🤔🤔</strong></p>
                    <p className="mb-5">¿Estás seguro que está bien la ruta a donde quieres acceder?</p>
                    <Link to="/"><button className="btn btn-primary">Ir la página principal</button></Link>
                </div>
            </div>
        </motion.div>
    );
};
export default NotFound;