import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TransactionsService } from "src/transactions/transactions.service";
import { Card } from "./card.model";

@Injectable()
export class CardsService {

    constructor(@InjectModel('Card') private readonly cardModel: Model<Card>, private readonly transactionsService: TransactionsService) { }

    async insertCard(cardId: number, balance: number) {
        const new_card = new this.cardModel({ cardId, balance });
        const results = await new_card.save();
        return { cardId: results.cardId, balance: results.balance };
    }

    async getAllCards() {
        const cards = await this.cardModel.find().exec();
        return cards.map((card) => ({ cardId: card.cardId, balance: card.balance }))
    }

    async userPay(cardId: number, amount: number, destination: string): Promise<string> {
        const card = await this.getCard(cardId);
        if (amount > card.balance) throw new HttpException('Sorry!, there’s no enough balance in the card', HttpStatus.FORBIDDEN);

        const new_balance_amount = card.balance - amount;
        card.balance = new_balance_amount;
        const updated_card = await card.save();
        if (updated_card) {
            this.transactionsService.addNewTransaction(updated_card.cardId, new Date(), amount, updated_card.balance, destination)
        }
        return `user balance is: ${updated_card.balance}`;
    }


    async getCard(cardId: number): Promise<Card> {
        const card = await this.cardModel.findOne({ cardId: cardId }).exec();
        if (!card) throw new NotFoundException("Couldn't find the card Id, Please enter a vaild Id.");
        return card;
    }
}
