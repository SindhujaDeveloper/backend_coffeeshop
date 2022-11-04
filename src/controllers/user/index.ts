import { Inject } from '@decorators/di';
import {
	Response,
	Controller,
	Get,
	Post,
	Body,
	Delete,
	Request,
	Params
} from '@decorators/express';
import { UserService } from '../../services';
import springedge from 'springedge'
import { response } from 'express';
import { userValidators } from '../../validators';
import { validate } from '../../utils/common';

@Controller('/')
export class UsersController {

	constructor(@Inject(UserService) private userService: UserService) { }

	// Create user
	@Post('/createUser')
	public async createUser(@Request() req, @Body('Firstname') Firstname: string, @Body('Lastname') Lastname: string, @Body('City') City: string, @Body('Gender') Gender: string, @Body('Birthdate') Birthdate: string, @Body('Mobileno') Mobileno: string, @Response() res) {
		try {
			const errors = await validate(req, userValidators.createUser);
			if (errors.isEmpty()) {
				const users = await this.userService.findUser({ Mobileno: Mobileno });
				if (users.length == 0) {
					const params = { Firstname, Lastname, City, Gender, Birthdate, Mobileno };
					const user = await this.userService.createUser(params);
					res.status(200).json({ data: { user }, message: 'user created successfully' }).end();
				} else {
					res.status(401).json({ message: 'User Already exists' }).end();
				}
			}
			else {
				res.status(400).json(errors).end();
			}
		} catch (error) {
			res.status(500).send(error);
		}
	}

	// List Users
	@Get('/userList')
	public async getData(@Request() req, @Response() res) {
		const errors = await this.userService.listUsers();
		if (errors) {
			try {
				res.status(200).send(errors);
			} catch (error) {
				res.status(500).json({ status: 500, message: 'Error occured' }).end();
			}
		}
	}

	// Get Users
	@Post('/login')
	public async findUser(@Body('Mobileno') Mobileno: string, @Request() req, @Response() res) {
		try {
			const users = await this.userService.findUser({ Mobileno: Mobileno });
			if (users.length) {
				res.status(200).json({ data: { users }, message: 'login user successfully' }).end();
			} else {
				res.status(400).json({ status: 400, message: 'User Does not exists' }).end();
			}
		} catch (error) {
			res.status(500).send(error);
		}
	}

	// Update user
	@Post('/updateUser')
	public async updateUser(@Body('Firstname') Firstname: string, @Body('Lastname') Lastname: string, @Body('City') City: string, @Body('Gender') Gender: string, @Body('Birthdate') Birthdate: string, @Body('Mobileno') Mobileno: string, @Response() res) {
		try {
			const errors = await this.userService.findUser({ Mobileno: Mobileno });
			if (errors.length === 0) {
				res.status(400).json({ status: 400, message: 'user does not exist' }).end();
			} else {
				const params = { Firstname, Lastname, City, Gender, Birthdate, Mobileno };
				const user = await this.userService.findAndUpdateUser(params);
				res.status(200).json({ data: { user }, message: 'user updated successfully' }).end();
			}
		} catch (error) {
			res.status(500).json({ status: 500, message: 'Error occured' }).end();
		}
	}

	@Get('/updateUser/:Mobileno')
	public async userDetail(@Request() req, @Response() res) {
		try {
			console.log(req.params, 'request');
			const user = await this.userService.userDetail({ Mobileno: req.params.Mobileno });
			console.log(user)
			if (user.length) {
				// const user = await this.userService.listUsers();
				res.status(200).json({ data: { user } }).end();
			} else {
				res.status(400).json({ status: 400, message: 'user does not exist' }).end();
			}
		} catch (error) {
			res.status(500).json({ status: 500, message: 'Error occured' }).end();
		}
	}

	// Delete user
	@Delete('/deleteUser')
	public async deleteUser(@Body('Mobileno') Mobileno: string, @Response() res) {
		try {
			const errors = await this.userService.findUser({ Mobileno: Mobileno });
			if (errors) {
				const user = await this.userService.deleteUser({ Mobileno: Mobileno });
				res.status(200).json({ data: { user }, message: 'user deleted successfully' }).end();
			} else {
				res.status(400).json({ status: 400, message: 'user does not exist' }).end();
			}
		} catch (error) {
			res.status(500).json({ status: 500, message: 'Error occured' }).end();
		}
	}

	//Send Sms
	@Get('/userSms')
	public async sendSms(@Request() req, @Response() res) {
		try {
			const params = {
				'apikey': req.query.apikey,
				'sender': req.query.sender,
				'to': req.query.to,
				'message': req.query.message,
				'format': req.query.json
			};
			if (params) {
				await springedge.messages.send(params, 3000, () => { });
				res.status(200).json({ message: 'Message sent Successfully' });
			}
		} catch (error) {
			res.status(500).json({ status: 500, message: 'Error occured' }).end();
		}
	}

}
