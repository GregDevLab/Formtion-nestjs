import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { PrismaService } from 'src/prisma.service';
import { PrismaModule } from 'src/Prisma.module';

@Module({
	controllers: [UsersController],
	imports: [PrismaModule],
	providers: [
		UsersService,
		UsersRepository,
	]
})
export class UsersModule {}
