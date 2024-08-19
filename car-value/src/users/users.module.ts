import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { PrismaModule } from 'src/Prisma.module';

@Module({
	imports: [PrismaModule],
	controllers: [UsersController],
	providers: [UsersService,UsersRepository],
	exports: [UsersService, UsersRepository]
})
export class UsersModule {}
