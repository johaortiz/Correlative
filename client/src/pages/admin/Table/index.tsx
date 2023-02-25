import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { getCareers, getSubjects, getUsers } from "../../../helpers/requests";
import Users from "./Users";
import Career from "./Careers";
import Subjects from "./Subjects";
import { motion } from "framer-motion";



const AdminHome = () => {

    const token: string = Cookies.get("token") || "";
    const account: any = decodeToken(token);

    const [activeTab, setActiveTab] = useState<number>(0);
    const [tableInfo, setTableInfo] = useState<Data>({
        users: [],
        careers: [],
        subjects: [],
    });


    useEffect(() => {
        if (account.username) {
            Promise.all([getUsers(account.username), getCareers(), getSubjects(account.username)])
                .then(([users, careers, subjects]) => {
                    setTableInfo({ users, careers, subjects });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    const handleClick = (index: number) => {
        setActiveTab(index);
    };

    if (tableInfo.users === "Este usuario no tiene permisos para acceder a estos datos") {
        return <div>{tableInfo.users}</div>
    }


    if (!tableInfo) {
        return <div>Error</div>
    };

    return (
        <motion.div className="mt-20" initial={{ width: 0 }} animate={{ width: "100vw" }} exit={{ width: window.innerWidth, transition: { duration: 0.1 } }}>
            <div className="form-control px-10">
                <input type="text" placeholder="Search..." className="input input-bordered" />
            </div>
            <div className="card mt-2 bg-base-100 mx-10 f">
                <div className="card-title flex flex-col justify-center items-center pt-3">
                    <div className="tabs">
                        <a className={`tab tab-bordered transition left delay-1500 duration-500 ${activeTab === 0 ? "tab-active" : ""}`} onClick={() => handleClick(0)}>Usuarios</a>
                        <a className={`tab tab-bordered transition left delay-1500 duration-500 ${activeTab === 1 ? "tab-active" : ""}`} onClick={() => handleClick(1)}>Carreras</a>
                        <a className={`tab tab-bordered transition left delay-1500 duration-500 ${activeTab === 2 ? "tab-active" : ""}`} onClick={() => handleClick(2)}>Asignaturas</a>
                    </div>
                    <p className="text-lg mt-3">Para que los cambios se vean reflejados en la tabla, refresque la página</p>
                </div>
                <div className="card-body flex">
                    <div className="overflow-x-auto">
                        {activeTab === 0 && <Users tableInfo={tableInfo.users} activeTab={activeTab} />}
                        {activeTab === 1 && <Career tableInfo={tableInfo.careers} activeTab={activeTab} />}
                        {activeTab === 2 && <Subjects tableInfo={tableInfo.subjects} activeTab={activeTab} />}

                    </div>
                </div>
            </div>
        </motion.div>
    );
};


interface Data {
    users: User[] | string;
    careers: Career[];
    subjects: Subject[];
}

interface User {
    id: number;
    username: string;
    isActive: boolean;
    isDisabled: boolean;
}

interface Career {
    id: number;
    name: string;
    semesters: number;
}

interface Subject {
    id: number;
    idFromUniversity: number;
    name: string;
    semester: number;
    org: string;
    correlatives: number[];
}


export default AdminHome;