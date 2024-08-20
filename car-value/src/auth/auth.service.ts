import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
	constructor(private usersService:UsersService){}

	async signup(userData:Prisma.UserCreateInput):Promise<Omit<User, 'password'> | null>  {
		const user = await this.usersService.create(userData)
		return user
	}

	async signin(userData:Prisma.UserCreateInput):Promise<Omit<User, 'password'> | null>{
		const findedUser = await this.usersService.getUniqueUser({email: userData.email}, true)
		if(!findedUser) throw new NotFoundException('Informations d\'authentification non valides')
		const isMatchPassword = await this.isUserPassword(userData.password, findedUser.password)
		if(!isMatchPassword) throw new NotFoundException('Informations d\'authentification non valides')

		const {password: _, ...safeUser} = findedUser
		return safeUser
	}

	private async hashPassword(password:string):Promise<string>{
		const saltOrRounds = 10;
		const hash = await bcrypt.hash(password, saltOrRounds);
		return hash
	}

	private async isUserPassword(plain:string, hash:string):Promise<Boolean> {
		const isMatch = await bcrypt.compare(plain, hash);
		return isMatch

	}
}
