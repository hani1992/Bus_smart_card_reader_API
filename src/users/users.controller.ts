import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post('new')
    addNewUser(@Body('first_name') first_name: string, @Body('last_name') last_name: string, @Body('cardId') cardId: number, @Body('gender') gender: string, @Body('email') email: string, @Body('date_of_birth') date_of_birth: Date) {
        return this.usersService.addNewUser(first_name, last_name, cardId, gender, email, date_of_birth);
    }

    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers();
    }
}