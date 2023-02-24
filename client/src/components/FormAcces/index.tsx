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
    const [error, setError] = useState<any>("");
    const correctAcces = "Acceso Correcto";
    const correctRegister = "Usuario creado correctamente! Por favor, revise su correo";

    //Send data
    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        setIsChecked(true);
        event.preventDefault();
        setError("");
        //ALL values
        const valuesRef = Object.values(ref.current.elements).map((e: any) => {
            return (e.value);
        })
        const a = await props.functionForm(valuesRef);
        //Login part
        if (a.token) {
            Cookies.set('token', a.token, { expires: .5, sameSite: "Strict", secure: false });
            setError(correctAcces);
            setTimeout(() => window.location.replace("/"), 5000);
            return;
        };
        //Errors Controller
        setError(a);
        //Register part
        if (a === correctRegister) {
            setTimeout(() => window.location.replace("/acceso"), 5000);
            return;
        };
    };

    const [isChecked, setIsChecked] = useState(false);

    const handleKeyDown = (event: any) => {
        if (event.keyCode === 13) {
            setIsChecked(!isChecked);
        }
    };


    return (
        <motion.div initial={{ width: 0 }} animate={{ width: "100vw" }} exit={{ width: window.innerWidth, transition: { duration: 0.1 } }}>
            <form ref={ref} onSubmit={onSubmit} className="hero bg-transparent mt-20">
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
                                <button className="">
                                    <label htmlFor="my-modal-20000" className={`btn btn-primary btn-block`}>{props.btnText}</label>
                                </button>
                                <input checked={isChecked} onKeyDown={handleKeyDown} onChange={() => setIsChecked(!isChecked)} type="checkbox" id="my-modal-20000"
                                    className={`modal-toggle ${(error === correctRegister || error === correctAcces) ? "cursor-wait" : ""}`} />
                                <label className={`modal modal-bottom sm:modal-middle ${(error === correctRegister || error === correctAcces) ? "cursor-wait" : ""}`}
                                    htmlFor={(error === correctRegister || error === correctAcces) ? "" : "my-modal-20000"}>
                                    <label className={`modal-box ${(error === correctRegister || error === correctAcces) ? "cursor-wait" : ""}`}>
                                        {
                                            (error === correctRegister || error === correctAcces) ? null : <label htmlFor="my-modal-20000" className="btn btn-sm btn-circle absolute right-3 top-3">X</label>
                                        }
                                        <h3 className="font-bold text-lg">{(error === correctRegister || error === correctAcces) ? "Todo salío parece haber salido bien" : "Error o..."}</h3>
                                        <p className="text-base pt-2">{error}</p>
                                        <p className="py-4">{(error === correctRegister || error === correctAcces) ? "Espere aquí mientras lo redireccionamos" : ""}</p>
                                    </label>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </motion.div>
    )
}
export default FormAcess