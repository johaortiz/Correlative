import FormAcess from "../../components/FormAcces";
import { getCareers, saveUser } from "../../helpers/requests";
import ComboBox from 'react-responsive-combo-box';
// import 'react-responsive-combo-box/dist/index.css';
import { useEffect, useState } from "react";


const Register = () => {

    const [options, setOptions] = useState<string[]>(["One", "Two"]);

    useEffect(() => {
        const names: string[] = [];
        getCareers().then(data => {
            data.map((career: any) => {
                names.push(career.name)
            });
        });
        setOptions(names);
    }, []);

    const register = {
        title: "Registrarse Ahora",
        subTitle: "¡Empieza a llevar el control de tu cursada!",
        btnText: "Registrarse",
        formControl: [
            {
                labelText: "Email",
                placeholderText: "email",
                typeInput: "email",
                value: "email"
            }, {
                labelText: "Nombre de Usuario",
                placeholderText: "nombre de usuario",
                typeInput: "text",
                value: "name"
            }, {
                labelText: "Contraseña",
                placeholderText: "contraseña",
                typeInput: "password",
                value: "password"
            }, {
                labelText: "Confirmar Contraseña",
                placeholderText: "contraseña",
                typeInput: "password",
                value: "confirmPassword"
            }
        ],
        functionForm: async (data: any) => {
            return await saveUser(data);
        },
        aditional: <div className="form-control m-auto">
            <label className="label">
                <span className="label-text">Carrera que cursa</span>
            </label>
            <ComboBox options={options} enableAutocomplete style={{ height: "3rem", fontSize: "1rem", flexShrink: 1, lineHeight: "1.5rem", borderWidth: "1px" }} placeholder="carrera" />
        </div>
    };
    const { title, subTitle, btnText, formControl, functionForm, aditional } = register;

    return (
        <FormAcess title={title} subTitle={subTitle} btnText={btnText} formControl={formControl} functionForm={functionForm} aditional={aditional} />
    );
};
export default Register;