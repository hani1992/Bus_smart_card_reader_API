import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CardsService } from "./cards.sevice";

@Controller('cards')
export class CardsController {

    constructor(private cardsService: CardsService) { }

    @Post('new')
    insertCard(@Body('cardId') cardId: number, @Body('amount') amount: number) {
        return this.cardsService.insertCard(cardId, amount);
    }

    @Get('balance')
    getAllCards() {
        return this.cardsService.getAllCards();
    }

    @Put('pay')
    async pay(@Body('cardId') cardId: number, @Body('amount') amount: number, @Body('destination') destination: string): Promise<string> {
        const updated_balance = await this.cardsService.userPay(cardId, amount, destination);
        return updated_balance;
    }

    @Get('balance/:cardId')
    async checkBalance(@Param('cardId') cardId: number): Promise<number> {
        const card = await this.cardsService.getCard(cardId);
        return card.balance;
    }

}