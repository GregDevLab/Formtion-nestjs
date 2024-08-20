import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UsersRepository {
	constructor(private prisma: PrismaService) {}

	async findUnique(userWhereUniqueInput: Prisma.UserWhereUniqueInput, unsafe?:boolean): Promise<User | null> {
		return this.prisma.user.findUnique({
			omit:{
				password: !unsafe
			},
			where: userWhereUniqueInput,
		});
	}

	async findFirst(userWhereInput: Prisma.UserWhereInput): Promise<User | null> {
		return this.prisma.user.findFirst({
			where: userWhereInput,
		});
	}

	async findMany(params: {
		skip?: number;
		take?: number;
		cursor?: Prisma.UserWhereUniqueInput;
		where?: Prisma.UserWhereInput;
		orderBy?: Prisma.UserOrderByWithRelationInput;
	}): Promise<User[]> {
		const { skip, take, cursor, where, orderBy } = params;
		return this.prisma.user.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
		});
	}

	async create(data: Prisma.UserCreateInput): Promise<User> {
		return this.prisma.user.create({
			data,
		});
	}
}