import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
@Module({
	providers: [PrismaService],
	exports:[PrismaService]
})
export class PrismaModule {}
