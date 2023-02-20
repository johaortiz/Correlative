import axios from "axios";
import FormAcess from "../../components/FormAcces";


const Register = () => {
    const register = {
        title: "Registrarse Ahora",
        subTitle: "¡Empiece a llevar el control de su cursada!",
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
            const { email, name, password } = data;
            try {
                const response = await axios.post('http://localhost:3000/users/save', {
                    email,
                    name,
                    password
                });
                return response.data;
            } catch (error) {
                return (error);
            };
        }
    };
    const { title, subTitle, btnText, formControl, functionForm } = register;

    return (
        <FormAcess title={title} subTitle={subTitle} btnText={btnText} formControl={formControl} functionForm={functionForm} />
    );
};
export default Register;