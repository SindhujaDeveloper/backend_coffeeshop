import { Injectable } from "@decorators/di";
import { createUserInterface } from "../interface";
import { userList } from "../models";

@Injectable()
export class UserService {

	public async createUser(Params: createUserInterface) {
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

	public async findAndUpdateUser(Params: createUserInterface) {
		// return await userList.findOneAndReplace({ Mobileno: Params.Mobileno }, { ...Params });
		await userList.findOneAndUpdate({ Mobileno: Params.Mobileno }, { ...Params });
		return this.findUser({ ...Params });
	}

	public async deleteUser(Params: { Mobileno: string }) {
		return await userList.deleteOne({ Mobileno: Params.Mobileno })
	}
}