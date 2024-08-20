import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Put, Query, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { UsersQueryDto } from './dtos/users-query.dto';
import { UpdateUserDto } from './dtos/user-update.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('users')
export class UsersController {
	constructor(
		private readonly userService: UsersService,
	) {}

	@Get('/')
	@HttpCode(HttpStatus.OK)
	async getAllUser(@Query() query: UsersQueryDto): Promise<any>{
		return await this.userService.findMany(query)
	}

	@Serialize(UserDto)
	@Get('/:id')
	@HttpCode(HttpStatus.OK)
	async getUser(@Param('id') id: string): Promise<User>{
		console.log("Execution de la requete", id)
		const user = await this.userService.getUniqueUser({id: Number(id)})
		if(!user) throw new NotFoundException('L\'utilisateur recherché n\'existe pas')
		return user
	}

	@Delete('/:id')
	@HttpCode(HttpStatus.OK)
	async deleteUser(@Param('id') id: string): Promise<User>{
		const user = await this.userService.deleteUser(id)
		return user
	}

	@Put('/:id')
	@HttpCode(HttpStatus.OK)
	async updateUser(@Param('id') id: string,@Body() updateDto: UpdateUserDto): Promise<User>{
		const user = await this.userService.updateUser(id, updateDto)
		return user
	}



}
