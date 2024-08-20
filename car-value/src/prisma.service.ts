import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
// DOC : https://docs.nestjs.com/recipes/prisma#install-and-generate-prisma-client
// DOC : https://www.prisma.io/nestjs#nestjs-tabs
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	constructor() {
		super({
			omit: {
				user: {
					password: true
				}
			}
		})
	}
	async onModuleInit() {
		await this.$connect();
	}
}