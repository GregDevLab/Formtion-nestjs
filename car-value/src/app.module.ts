import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports:[
		UsersModule,
		ReportsModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
