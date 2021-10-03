import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.model";


@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }
    async getAllUsers() {
        const users = await this.userModel.find().exec();
        return users.map((user) => ({ first_name: user.first_name, last_name: user.last_name, cardId: user.cardId, gender: user.gender, email: user.email, date_of_birth: user.date_of_birth }))
    }

    async addNewUser(first_name: string, last_name: string, cardId: number, gender: string, email: string, date_of_birth: Date) {
        const new_user = new this.userModel({ first_name, last_name, cardId, gender, email, date_of_birth });
        const results = await new_user.save();
        return { first_name: results.first_name, last_name: results.last_name, cardId: results.cardId, gender: results.gender, email: results.email, date_of_birth: results.date_of_birth };
    }
}