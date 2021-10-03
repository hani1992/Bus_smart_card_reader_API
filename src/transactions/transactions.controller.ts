import { Controller, Get } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";



@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transationsService: TransactionsService) { }
    @Get()
    getDailyReport() {
        return this.transationsService.generateDailyReport();
    }

}