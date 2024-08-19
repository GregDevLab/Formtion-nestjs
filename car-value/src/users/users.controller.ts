import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
	constructor(
		private readonly userService: UsersService,
	) {}

	@Get('/:id')
	async getUser(@Param('id') id: string): Promise<User>{
		return await this.userService.getUniqueUser({id: Number(id)})
	}

}
