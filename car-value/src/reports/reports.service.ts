import { Injectable } from '@nestjs/common';
import { ReportsRepository } from './reports.reopsitory';

@Injectable()
export class ReportsService {
	constructor(private reportsRepository: ReportsRepository){}
}
