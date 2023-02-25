import { AppDataSource } from '../data-source';
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { Career } from '../entity/Career';
import { genSalt, hash, compare } from "bcrypt";;
import { sign } from "jsonwebtoken";
import { sendEmail } from "../config/mailer";
require("dotenv").config();

const { TOKEN_KEY, ADMIN_USERNAME } = process.env;
export class UserController {

    private userRepository = AppDataSource.getRepository(User);
    private careerRepository = AppDataSource.getRepository(Career);

    //Get All Users
    async all(_request: Request, _response: Response, _next: NextFunction) {
        const { username } = _request.body;

        if (username !== ADMIN_USERNAME) {
            return "Este usuario no tiene permisos para acceder a estos datos";
        };

        const findUser = await this.userRepository.find({ relations: ["career"] });
        try {
            const filteredUsers = findUser.map(({ id, username, isActive, isDisabled, career }) => ({
                id,
                username,
                isActive,
                isDisabled,
                career: career.name
            })).sort((a, b) => a.id - b.id);

            return filteredUsers;
        } catch (error) {
            throw new Error("Algo salió mal")
        }
        return
    };

    //Get User By Id
    async oneById(_request: Request, _response: Response, _next: NextFunction) {
        const id = parseInt(_request.params.id);
        const user = await this.userRepository.findOne({
            where: { id }
        });
        if (!user) {
            return ("unregistered user");
        };
        return user;
    };

    //Get User by Name
    async oneByName(_request: Request, _response: Response, _next: NextFunction) {
        const { username } = _request.params;
        const user: User = await this.userRepository.findOne({
            where: { username }
        });

        if (!user) {
            return ("unregistered user");
        };
        return user;
    };

    //Register a User
    async save(_request: Request, _response: Response, _next: NextFunction) {
        const { username, password, email, carrerName } = _request.body;
        const salt: string = await genSalt(10);
        const hashedPassword: string = await hash(password, salt);
        const hashedEmail: string = await hash(email, salt);
        const findUser = await this.userRepository.findOne({
            where: { username }
        });
        const career = await this.careerRepository.findOne({
            where: { name: carrerName },
            relations: ["subjects"]
        });

        if (findUser) {
            throw new Error("Usuario ya existente");
        };

        if (!career) {
            throw new Error(`La carrera ${carrerName} no existe`);
        }
        const subjects = career.subjects.map((subject) => {
            return { subject, approved: false, regularized: false };
        });
        try {
            const user: User = Object.assign(new User(), {
                hashedEmail,
                username,
                hashedPassword,
                career,
                subjects
            });
            await sendEmail(email, hashedEmail);
            await this.userRepository.save(user);
            return "Usuario creado correctamente! Por favor, revise su correo";
        } catch (error) {
            throw new Error(error);
        };
    };

    //Login of User
    async login(_request: Request, _response: Response, _next: NextFunction) {
        const { username, password } = _request.body;
        const user: User = await this.userRepository.findOne({
            where: { username },
            relations: ["career"]
        });

        if (!user) {
            throw new Error("Usuario no Encontrado");
        };
        const passwordCheck: boolean = await compare(password, user.hashedPassword);
        const { id, username: userDataBase, career, isActive, isDisabled } = user;

        if (passwordCheck) {
            const token = sign({
                id,
                username: userDataBase,
                careerId: career.id,
                careerName: career.name,
                isActive,
                isDisabled
            }, TOKEN_KEY);
            return { token: token };
        };
        throw new Error("Contraseña Incorrecta");
    };

    //Delete an User
    async remove(_request: Request, _response: Response, _next: NextFunction) {
        const id = parseInt(_request.params.id);

        let userToRemove = await this.userRepository.findOneBy({ id });
        if (!userToRemove) {
            return "Esteusuario no Existe";
        };
        await this.userRepository.remove(userToRemove);
        return "Usuario borrado Correctamente";
    };

    //Validate mail of user
    async validate(_request: Request, _response: Response, _next: NextFunction) {
        const { account } = _request.query;

        const user: User = await this.userRepository.findOne({
            where: { hashedEmail: account }
        });
        if (!user) {
            throw new Error("Usuario no Encontrado");
        };
        await this.userRepository.update({ hashedEmail: account }, { isActive: true });
        return "Usuario Activado Correctamente";
    };
};