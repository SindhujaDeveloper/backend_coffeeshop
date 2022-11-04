import { Injectable } from "@decorators/di";
import { Request } from "@decorators/express";
import { ICreateUser } from "../../interface";
import { userList } from "../../models";

@Injectable()
export class UserService {

	public async createUser(Params: ICreateUser) {
		const userIns = new userList({ ...Params })
		await userIns.save();
		return userIns;
	}

	public async listUsers() {
		return await userList.find({});
	}

	public async findUser(Params: { Mobileno: string }) {
		return await userList.find({ Mobileno: Params.Mobileno });
	}

	public async findAndUpdateUser(Params: ICreateUser) {
		// return await userList.findOneAndReplace({ Mobileno: Params.Mobileno }, { ...Params });
		await userList.findOneAndUpdate({ Mobileno: Params.Mobileno }, { ...Params });
		return this.findUser({ ...Params });
	}

	public async deleteUser(Params: { Mobileno: string }) {
		return await userList.deleteOne({ Mobileno: Params.Mobileno });
	}

	public async userDetail(Params: { Mobileno: string }) {
		console.log(Params)
		return await userList.find({ Mobileno: Params.Mobileno });
	}

}