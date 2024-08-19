import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class DiskService {
	constructor(private powerService:PowerService) {}

	getData() {
		console.log('simulation : la récupération des datas consomme 20 watts')
		this.powerService.supplyPower(20)
		return "datas"
	}
}
