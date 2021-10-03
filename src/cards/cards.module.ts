import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TransactionModule } from "src/transactions/transaction.module";
import { CardSchema } from "./card.model";
import { CardsController } from "./cards.controller";
import { CardsService } from "./cards.sevice";


@Module({
    imports: [MongooseModule.forFeature([{ name: 'Card', schema: CardSchema }]), TransactionModule],
    controllers: [CardsController],
    providers: [CardsService]
})

export class CardsModule { }