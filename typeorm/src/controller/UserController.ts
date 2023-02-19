import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { genSalt, hash, compare } from "bcrypt";
import axios from 'axios';
import { sign } from "jsonwebtoken";
import { sendEmail } from "../config/mailer"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async all(_request: Request, _response: Response, _next: NextFunction) {
        return this.userRepository.find()
    }

    async oneById(_request: Request, _response: Response, _next: NextFunction) {
        const id = parseInt(_request.params.id)


        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (!user) {
            return ("unregistered user");
        }
        return user
    }

    async oneByName(_request: Request, _response: Response, _next: NextFunction) {
        const username: string = _request.params.username


        const user: User = await this.userRepository.findOne({
            where: { username }
        })

        if (!user) {
            return ("unregistered user");
        }
        return user
    }

    async save(_request: Request, _response: Response, _next: NextFunction) {
        const { username, password, email } = _request.body;
        const salt: string = await genSalt(10);
        const hashedPassword: string = await hash(password, salt);
        const hashedEmail: string = await hash(email, salt);
        const findUser = await axios.get(`http://localhost:3000/users/findName/${username}`);

        if (findUser.data !== "unregistered user") {
            throw new Error("User alredy exist");
        };

        try {
            const user: User = Object.assign(new User(), {
                hashedEmail,
                username,
                hashedPassword,
            });
            this.userRepository.save(user);
            const mailSended = await sendEmail(email, hashedEmail);
            console.log(mailSended);

            return "Successfully registered user";
        } catch (error) {
            throw new Error(error);
        };
    };

    async login(_request: Request, _response: Response, _next: NextFunction) {
        const { username, password } = _request.body;
        const user = await axios.get(`http://localhost:3000/users/findName/${username}`);
        if (user.data === "unregistered user") {
            throw new Error("unregistered user");
        };
        const passwordCheck: boolean = await compare(password, user.data.hashedPassword);
        const { id, username: userDataBase, hashedPassword, aprobedSubjects, regularizatedSubjects } = user.data;
        if (passwordCheck) {
            const token = sign({
                id,
                username: userDataBase,
                hashedPassword,
                aprobedSubjects,
                regularizatedSubjects
            }, "furry4414");
            return token;
        };
        throw new Error("wrong password");
    };

    async remove(_request: Request, _response: Response, _next: NextFunction) {
        const id = parseInt(_request.params.id);

        let userToRemove = await this.userRepository.findOneBy({ id });

        if (!userToRemove) {
            return "this user not exist";
        }
        await this.userRepository.remove(userToRemove);

        return "user has been removed";
    };

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