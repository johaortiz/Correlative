import { Link } from "react-router-dom";
import FormAcess from "../../components/FormAcces";
import { loginUser } from "../../helpers/requests";


const Login = () => {
    const login = {
        forgot: true,
        type: "login",
        title: "Acceda Ahora",
        subTitle: "¡Que bueno verte de nuevo!",
        btnText: "Acceder",
        formControl: [
            {
                labelText: "Nombre de Usuario",
                placeholderText: "nombre de usuario",
                typeInput: "text",
                value: "name"
            }, {
                labelText: "Contraseña",
                placeholderText: "contraseña",
                typeInput: "password",
                value: "password"
            }
        ],
        functionForm: async (data: any) => {
            return await loginUser(data);
        },
        aditional: <label className="label">
            <Link to="#" className="label-text-alt link link-hover">¿Olvidó su contraseña? Recupérela</Link>
        </label>
    };
    const { forgot, title, subTitle, btnText, formControl, functionForm, aditional } = login;
    return (
        <FormAcess forgot={forgot} title={title} subTitle={subTitle} btnText={btnText} formControl={formControl} functionForm={functionForm} aditional={aditional} />
    );
};
export default Login;