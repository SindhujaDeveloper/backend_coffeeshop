import { Inject } from '@decorators/di';
import {
    Response,
    Controller,
    Get,
    Post,
    Request,
    Body
} from '@decorators/express';
import { UserService } from '../services';

@Controller('/public')
export class UsersController {

    constructor(@Inject(UserService) private userService: UserService) { }

    // Create user
    @Post('/createUser')
    public async createUser(@Body('Firstname') Firstname: string, @Body('Lastname') Lastname: string, @Body('City') City: string, @Body('Gender') Gender: string, @Body('Birthdate') Birthdate: string, @Body('Mobileno') Mobileno: number, @Response() res) {
        const params = { Firstname, Lastname, City, Gender, Birthdate, Mobileno };
        const user = await this.userService.createUser(params);
        try {
            res.status(200).json({ data: { user } }).end();
        } catch (error) {
            res.status(500).send(error);
        }
    }

    // List Users
    @Get('/users')
    public async getData(@Response() res) {
        const errors = await this.userService.listUsers();
        if (errors) {
            try {
                res.status(200).send(errors);
            } catch (error) {
                res.status(500).send(error);
            }
        }
    }

    // Get Users
    @Post('/users/mobile')
    public async findUser(@Body('Mobileno') Mobileno: string, @Response() res) {
        const errors = await this.userService.findUser({ Mobileno: Mobileno });
        if (errors) {
            try {
                res.status(200).send(errors);
            } catch (error) {
                res.status(500).send(error);
            }
        }
    }
}