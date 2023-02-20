import { useState, ChangeEvent, FormEvent } from "react";
import ComboBox from "react-combo-box-nato";
import { Link } from "react-router-dom"
import FormControl from "../FormControl"

interface FormControl {
    labelText: string,
    placeholderText: string,
    typeInput: string,
    value: string
};

type FormValues = {
    [key: string]: string | undefined
};

const FormAcess = (props: { title: string, subTitle: string, btnText: string, formControl: FormControl[], forgot?: boolean, functionForm: Function }) => {


    const initialState: FormValues = props.formControl.reduce(
        (acc, { value }) => ({ ...acc, [value]: "" }),
        {}
    );
    const [values, setValues] = useState<{ [key: string]: any }>(initialState);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        return setValues({ ...values, [event.target.name]: event.target.value });
    };

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const a = await props.functionForm(values);
        console.log(a);
    };
    const options = [
        "America",
        "India",
        "Australia",
        "Argentina",
        "Ireland",
        "Indonesia",
        "Iceland",
        "Japan",
        "China",
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Antigua",
        "Barbuda",
        "Mexico",
        "Monaco",
        "Nepal",
        "Bulgaria",
        "Pakistan",
        "Russia",
        "Egypt",
        "Sri Lanka",
        "Singapore"
    ];
    return (
        <form onSubmit={onSubmit} className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-right">
                    <h1 className="text-5xl font-bold">{props.title}</h1>
                    <p className="py-6">{props.subTitle}</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        {
                            props.formControl.map((form, i) => {
                                return <FormControl key={i} labelText={form.labelText} placeholderText={form.placeholderText} typeInput={form.typeInput} name={form.value} value={values[form.value]} handleChange={handleChange} />
                            })
                        }
                        <ComboBox
                            options={options} enableAutocomplete
                        />
                        {
                            (props.forgot || false) && (
                                <label className="label">
                                    <Link to="#" className="label-text-alt link link-hover">¿Olvidó su contraseña? Recupérela</Link>
                                </label>
                            )
                        }
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">{props.btnText}</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default FormAcess