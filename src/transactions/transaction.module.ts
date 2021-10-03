import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ReportsModule } from "src/reports/report.module";
import { TransactionSchema } from "./transaction.model";
import { TransactionsController } from "./transactions.controller";
import { TransactionsService } from "./transactions.service";


@Module({
    imports: [MongooseModule.forFeature([{ name: 'Transaction', schema: TransactionSchema }]), ReportsModule],
    controllers: [TransactionsController],
    providers: [TransactionsService],
    exports: [TransactionsService]
})

export class TransactionModule { }