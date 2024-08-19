import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';


@Injectable()
export class CpuService {
	constructor(private powerService: PowerService) {}

	compute(a:number, b:number) {
		console.log('simulation : l\'addition consomme 10 watts')
		this.powerService.supplyPower(10)
		return a+b
	}
}
