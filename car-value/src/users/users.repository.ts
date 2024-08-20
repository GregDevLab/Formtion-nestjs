import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UsersRepository {
	constructor(private prisma: PrismaService) {}

	async findUnique(userWhereUniqueInput: Prisma.UserWhereUniqueInput, unsafe?:boolean): Promise<User | null> {
		return await this.prisma.user.findUnique({
			omit:{
				password: !unsafe
			},
			where: userWhereUniqueInput,
		});
	}

	async findFirst(userWhereInput: Prisma.UserWhereInput): Promise<User | null> {
		return await this.prisma.user.findFirst({
			where: userWhereInput,
		});
	}

	async findMany(params: {
		skip?: number;
		take?: number;
		cursor?: Prisma.UserWhereUniqueInput;
		where?: Prisma.UserWhereInput;
		orderBy?: Prisma.UserOrderByWithRelationInput;
	}): Promise<{
        users: User[];
        count: number;
        pageSize: number;
        totalPages: number;
    }> {

		const [count, users] = await Promise.all([
			this.prisma.user.count({where:{...params.where}}),
			this.prisma.user.findMany({...params})
		])

		const totalPages = Math.ceil(count / params.take);
		return {
			users,
			count,
			pageSize: params.take,
			totalPages
		}
	}

	async create(data: Prisma.UserCreateInput): Promise<User> {
		return await this.prisma.user.create({
			data,
		});
	}

	async delete(id: string): Promise<User> {
		return await this.prisma.user.delete({
			where: {
				id: Number(id)
			},
		});
	}

	async update(params: Prisma.UserUpdateArgs): Promise<User> {
		return await this.prisma.user.update({...params});
	}
}