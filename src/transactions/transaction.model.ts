import * as mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema({
    cardId: { type: Number, required: true },
    transaction_date: { type: Date },
    transaction_amount: { type: Number },
    current_balance: Number,
    destination: String
});

export interface Transaction extends mongoose.Document {
    cardId: number;
    transaction_date: Date;
    transaction_amount: number;
    current_balance: number;
    destination: string;
}