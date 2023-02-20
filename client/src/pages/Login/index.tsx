import axios from "axios";
import FormAcess from "../../components/FormAcces";

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
        functionForm: () => {
            axios.get(`http://localhost:3000/users`)
                .then((res) => {
                    return res.data;
                })
                .catch((error) => {
                    return error;
                })
        }
    };
    const { forgot, title, subTitle, btnText, formControl, functionForm } = login;
    return (
        <FormAcess forgot={forgot} title={title} subTitle={subTitle} btnText={btnText} formControl={formControl} functionForm={functionForm} />
    );
};
export default Login;