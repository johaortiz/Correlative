import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import Logout from "../../components/Logout";
import { subjectsWhitIdCareer, userSubject } from "../../helpers/requests";
import HomeWOT from "./HomeWhitoutToken";
import HomeWT from "./HomeWhitToken";

const Home = () => {

    const token: string = Cookies.get("token") || "";
    const account: any = decodeToken(token);

    if (account?.isActive === false) {
        return <div className="alert alert-warning shadow-lg">
            <div className="flex flex-col">
                <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Por favor, activá tu cuenta en tu casilla de correo, si no lo encuentra revise el SPAM {`(correo no deseado)`} o comunícate conmigo.</span>
                </div>
                <p className="text-sm"><strong>Si ya activaste tu cuenta, por favor, vovlé a iniciar sesión.</strong></p>
                <button className="btn btn-accent"><Logout /></button>
            </div>
        </div>
    };

    const [subjects, setSubjects] = useState([]);
    const [userSubjects, setUserSubjects] = useState([]);


    useEffect(() => {
        if (typeof account?.careerId === "number") {
            subjectsWhitIdCareer(account.careerId).then(res => setSubjects(res));
            userSubject(account.id).then(res => setUserSubjects(res));
        };
    }, []);


    return (
        <div className="bg-base-200 flex justify-center items-center mt-10">
            {/* <SideBar /> */}
            {
                account ? <HomeWT subjects={subjects} userSubjects={userSubjects} /> : <HomeWOT />
            }
        </div>

    );
};

export default Home;