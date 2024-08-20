import {
	NestInterceptor,
	ExecutionContext,
	CallHandler,
	Injectable
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { SignupDto } from 'src/auth/dtos/signup-dto';

export class PasswordHashInterceptor implements NestInterceptor {
	async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
		const request = context.switchToHttp().getRequest();
		const body = request.body as SignupDto;

		if (body && body.password) {
			const hashedPassword = await this.hashPassword(body.password);
			body.password = hashedPassword;
		}

		return next.handle();
	}

	private async hashPassword(password: string): Promise<string> {
		const saltOrRounds = 10;
		return bcrypt.hash(password, saltOrRounds);
	}
}