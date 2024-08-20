import {
	UseInterceptors,
	NestInterceptor,
	ExecutionContext,
	CallHandler
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import {ClassConstructor, plainToClass} from 'class-transformer'

export const Serialize = <T>(Dto: ClassConstructor<T>) => {
	return UseInterceptors(new SerializeInterceptor(Dto))
}
export class SerializeInterceptor<T> implements NestInterceptor {
	constructor(private Dto: ClassConstructor<T>){}
	intercept(_:ExecutionContext, next:CallHandler): Observable<T> {
		
		return next.handle().pipe(
			map((data: any) => {
				return plainToClass(this.Dto, data, {
					excludeExtraneousValues: true
				})
			})
		)
	}
}