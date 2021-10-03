import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './cards/cards.module';
import { TransactionModule } from './transactions/transaction.module';
import { UsersModule } from './users/user.module';

@Module({
  imports: [CardsModule, MongooseModule.forRoot('mongodb+srv://hhinnawi:Y5YlVzLrHKNtLPxj@cluster0.dc1ge.mongodb.net/fnTaskDB?retryWrites=true&w=majority'), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
