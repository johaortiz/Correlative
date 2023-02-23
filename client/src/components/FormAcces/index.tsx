import { useState, FormEvent, useRef } from "react";
import FormControl from "../FormControl";
import Cookies from 'js-cookie';
import { motion } from "framer-motion";


interface FormControl {
    labelText: string,
    placeholderText: string,
    typeInput: string,
    value: string
};


const FormAcess = (props: { title: string, subTitle: string, btnText: string, formControl: FormControl[], forgot?: boolean, functionForm: Function, aditional?: any }) => {

    //Values
    const ref = useRef<any>(null);
    const [error, setError] = useState("");

    //Send data
    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //ALL values
        const valuesRef = Object.values(ref.current.elements).map((e: any) => {
            return (e.value);
        })
        const a = await props.functionForm(valuesRef);
        //Login part
        if (a.token) {
            Cookies.set('token', a.token, { expires: .5, sameSite: "strict" });
            return window.location.replace("/");
        };
        //Errors Controller
        setError(a);
        setTimeout(() => setError(""), 7000);
        //Register part
        if (a === "Usuario creado correctamente! Por favor, revise su correo(Si no lo encuentra, busque en correo no deseado)") {
            return ref.current.reset();

        };
    };

    return (
        <motion.div initial={{ width: 0 }} animate={{ width: "100vw" }} exit={{ width: window.innerWidth, transition: { duration: 0.1 } }}>
            <div className={`alert shadow-lg mt-5 z-10 absolute ${error === "Usuario creado correctamente! Por favor, revise su correo" ? "alert-success" : "alert-error"} ${!error && "hidden"}`}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                </div>
            </div>
            <form ref={ref} onSubmit={onSubmit} className="hero bg-base-200 mt-20">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-right">
                        <h1 className="text-5xl font-bold">{props.title}</h1>
                        <p className="py-6">{props.subTitle}</p>
                    </div>

                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            {
                                props.formControl.map((form, i) => {
                                    return <FormControl key={i} labelText={form.labelText} placeholderText={form.placeholderText} typeInput={form.typeInput} name={form.value} />
                                })
                            }
                            {
                                props.aditional
                            }
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">{props.btnText}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </motion.div>
    )
}
export default FormAcess