import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Prisma, User } from '@prisma/client';
import { UsersQueryDto } from './dtos/users-query.dto';
import { UpdateUserDto } from './dtos/user-update.dto';

@Injectable()
export class UsersService {
	constructor(private usersRepository:UsersRepository) {}

	async getUniqueUser(userData:Prisma.UserWhereUniqueInput, unsafe?:boolean) {
		const userWhere = {
			...userData
		}

		if(userData.hasOwnProperty('id')) {
			userWhere.id = Number(userData.id)
		}
		const user = await this.usersRepository.findUnique(userWhere, unsafe)
		return user
	}

	async getFirstUser(userData:Prisma.UserWhereInput) {
		const userWhere = {
			...userData
		}

		const user = await this.usersRepository.findFirst(userWhere)
		return user
	}

	async findMany(query: UsersQueryDto):Promise<{
        users: User[];
        count: number;
        pageSize: number;
        totalPages: number;
    }> {
		const { page, pageSize, orderBy, email } = query;

		const params = {
			skip : (page - 1) * pageSize,
			take : pageSize,
			orderBy: orderBy ? { [orderBy]: 'asc' } : undefined,
			where: {
				email: email ? { contains: email } : undefined
			}
		};
		const datas = await this.usersRepository.findMany(params)
		return datas
	}

	async create(userData:Prisma.UserCreateInput) {
		const user = await this.usersRepository.create(userData)
		return user
	}

	async deleteUser(id:string) {
		const user = await this.usersRepository.delete(id)
		return user
	}

	async updateUser(id:string, updateDto:UpdateUserDto) {

		const updateInput = {
			where: {
				id :Number(id)
			},
			data: {
				...updateDto
			}
		}

		const user = await this.usersRepository.update(updateInput)
		return user
	}
}
