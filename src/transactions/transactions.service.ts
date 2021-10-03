import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ReportsService } from "src/reports/reports.service";
import { Transaction } from "./transaction.model";


@Injectable()
export class TransactionsService {
    constructor(@InjectModel('Transaction') private transactionModel: Model<Transaction>, private readonly reportsService: ReportsService) { }

    async addNewTransaction(cardId: number, transaction_date: Date, transaction_amount: number, current_balance: number, destination: string) {
        const new_transaction = new this.transactionModel({ cardId, transaction_date, transaction_amount, current_balance, destination });
        const results = await new_transaction.save();
        return { cardId: results.cardId, transaction_date: results.transaction_date, transaction_amount: results.transaction_amount, current_balance: results.current_balance, destination: results.destination }
    }

    async generateDailyReport() {
        const current_date = new Date();
        const yesterday_date = new Date(current_date.getFullYear(), current_date.getMonth(), current_date.getDate())
        const today_date = new Date(current_date.getFullYear(), current_date.getMonth(), current_date.getDate() + 1)
        const daily_transaction = await this.transactionModel.find({ transaction_date: { $gte: yesterday_date, $lt: today_date } })
        this.reportsService.send('generate_daily_report', daily_transaction);
        return daily_transaction;
    }

}