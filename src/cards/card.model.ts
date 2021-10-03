import * as mongoose from 'mongoose';

export const CardSchema = new mongoose.Schema({
    cardId: { type: Number, required: true, unique: true },
    balance: { type: Number, required: true }
});

export interface Card extends mongoose.Document {
    cardId: number;
    balance: number;
}