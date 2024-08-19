import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { ReportsRepository } from './reports.reopsitory';
import { PrismaService } from 'src/prisma.service';
import { PrismaModule } from 'src/Prisma.module';

@Module({
	controllers: [ReportsController],
	providers: [
		ReportsService,
		ReportsRepository
	],
	imports: [PrismaModule]
})
export class ReportsModule {}
