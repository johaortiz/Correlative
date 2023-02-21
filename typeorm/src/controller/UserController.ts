import { AppDataSource } from '../data-source';
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { Career } from '../entity/Career';
import { Subject } from '../entity/Subject';
import { genSalt, hash, compare } from "bcrypt";;
import axios from 'axios';;
import { sign } from "jsonwebtoken";;
import { sendEmail } from "../config/mailer";
import { config } from "dotenv";

const { TOKEN_KEY } = config().parsed;
export class UserController {

    private userRepository = AppDataSource.getRepository(User);
    private careerRepository = AppDataSource.getRepository(Career);
    private subjectRepository = AppDataSource.getRepository(Subject);

    //Get All Users
    async all(_request: Request, _response: Response, _next: NextFunction) {
        return this.userRepository.find({ relations: ["career"] });
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
        const findUser = await axios.get(`http://localhost:3000/users/findName/${username}`);
        const career = await this.careerRepository.findOne({
            where: { name: carrerName },
            relations: ["subjects"]
        });

        if (findUser.data !== "unregistered user") {
            throw new Error("User alredy exist");
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
            this.userRepository.save(user);
            await sendEmail(email, hashedEmail);
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
        const { username: userDataBase, subjects, career, isActive } = user;

        if (passwordCheck) {
            const token = sign({
                username: userDataBase,
                subjects,
                careerId: career.id,
                isActive
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
            return "this user not exist";
        };
        await this.userRepository.remove(userToRemove);
        return "user has been removed";
    };

    //Validate mail of user
    async validate(_request: Request, _response: Response, _next: NextFunction) {
        const { account } = _request.query;

        const user: User = await this.userRepository.findOne({
            where: { hashedEmail: account }
        });
        if (!user) {
            throw new Error("User not Found");
        };
        await this.userRepository.update({ hashedEmail: account }, { isActive: true });
        return "User successfully activated";
    };
};