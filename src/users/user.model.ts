import * as mongoose from 'mongoose';


export const UserSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: String,
    cardId: { type: Number, required: true, unique: true },
    gender: String,
    email: String,
    date_of_birth: Date
});


export interface User extends mongoose.Document {
    first_name: string;
    last_name: string;
    cardId: number;
    gender: string;
    email: string;
    date_of_birth: Date;
}