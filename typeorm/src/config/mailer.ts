import { createTransport } from "nodemailer";

const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    tls: {
        rejectUnauthorized: false,
    },
    secure: true, // true for 465, false for other ports
    auth: {
        user: "correlativaucp@gmail.com", // generated ethereal user
        pass: "ungdskczwpttlxhf", // generated ethereal password
    }
});

export const sendEmail = async (email: string, subject: string) => {
    try {
        await transporter.sendEmail({
            from: `UCP Correlativas`,
            to: email,
            subject,
            html: `<h3>Bienvenido a UCP Correlativas</h3>
            <p>¡Muchas gracias por registrase!</p>
            <p>Por favor, confirme su correo electrónico para poder empezar a utilizar la plataforma</p>
            <a href="localhost:3000/user/validate/${email}">Haz click aquí para confirmar!</a>
            <p>Reuerda que no somos un sitio oficial ni autorizado por la Universidad Cuenca del Plata y que 
            este sitio está hecha por un estudiante (yo) para usarlo el mismo y lo comparte con los demás alumnos</p>
            <p>Saludos!</p>
            `
        })
    } catch (error) {
        throw new Error(error);
    }
};