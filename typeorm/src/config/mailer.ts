import { createTransport } from "nodemailer";
require("dotenv").config();

const { GOOGLE_EMAIL, GOOGLE_PASS } = process.env;

let transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    tls: {
        rejectUnauthorized: false,
    },
    secure: true, // true for 465, false for other ports
    auth: {
        user: GOOGLE_EMAIL, // generated ethereal user
        pass: GOOGLE_PASS, // generated ethereal password
    }
});

export const sendEmail = async (email: string, hashedEmail: string) => {
    try {
        await transporter.sendMail({
            from: `UCP Correlativas`,
            to: email,
            subject: "Confirmá tu Cuenta",
            html: `<h3>Bienvenido a UCP Correlativas</h3>
                <p>¡Muchas gracias por registrate!</p>
                <p>Por favor, confirme su correo electrónico para poder empezar a utilizar la plataforma</p>
                <a href="http://localhost:3000/users/validate?account=${hashedEmail}">Haz click aquí para confirmar!</a>
                <p>Reuerda que UCP Correlativas <strong>no</strong> es un sitio oficial ni autorizado por la Universidad Cuenca del Plata y que 
                este sitio está hecha por un estudiante (yo) para usarlo él mismo y lo comparte con los demás alumnos</p>
                <p>Saludos!</p>
                `
        });
        return "All Ok";
    } catch (error) {
        throw Error(error);
    }
};