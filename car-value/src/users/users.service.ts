import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
	constructor(private usersRepository:UsersRepository) {}

	async getUniqueUser(userData:Prisma.UserWhereUniqueInput) {
		const userWhere = {
			...userData
		}

		if(userData.hasOwnProperty('id')) {
			userWhere.id = Number(userData.id)
		}
		const user = await this.usersRepository.findUnique(userWhere)
		return user
	}

	async getFirstUser(userData:Prisma.UserWhereInput) {
		const userWhere = {
			...userData
		}

		if(userData.hasOwnProperty('id')) {
			userWhere.id = Number(userData.id)
		}
		const user = await this.usersRepository.findFirst(userWhere)
		return user
	}
}
