import { Body, ConflictException, Controller, HttpCode, HttpStatus, InternalServerErrorException, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup-dto';
import { Response } from 'express';
import { User } from '@prisma/client';


@Controller('auth')
export class AuthController {
	constructor(private authService:AuthService){}

	@Post('/signup')
	@HttpCode(HttpStatus.CREATED)
	async signup(@Body() body:SignupDto):Promise<Omit<User, 'password'> | null> {
		try {
			const user = await this.authService.signup({...body})
			return user
		} catch (error:any) {
			if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
				throw new ConflictException('L\'email est déja utilisé !');
			}
			throw new InternalServerErrorException("Une erreur inattendue s'est produite");
		}
	}

}
