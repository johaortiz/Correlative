import { useState } from "react";
import Careers from "./Careers";
import Subjects from "./Subjects";
import Users from "./Users";
import { motion } from "framer-motion";

const Add = () => {

    const [activeTab, setActiveTab] = useState<number>(0);


    const handleClick = (index: number) => {
        setActiveTab(index);
    };

    return (
        <motion.div className="mt-20 px-10" initial={{ width: 0 }} animate={{ width: "100vw" }} exit={{ width: window.innerWidth, transition: { duration: 0.1 } }}>
            <div className="card mt-2 bg-base-100">
                <div className="card-title flex flex-col justify-center items-center pt-3">
                    <h2>Añadir</h2>
                    <div className="tabs">
                        <a className={`tab tab-bordered transition left delay-1500 duration-500 ${activeTab === 0 ? "tab-active" : ""}`} onClick={() => handleClick(0)}>Carrera</a>
                        <a className={`tab tab-bordered transition left delay-1500 duration-500 ${activeTab === 1 ? "tab-active" : ""}`} onClick={() => handleClick(1)}>Asignatura</a>
                    </div>
                </div>
                <div className="card-body flex">
                    <div>
                        {activeTab === 0 && <Careers />}
                        {activeTab === 1 && <Subjects />}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
export default Add;