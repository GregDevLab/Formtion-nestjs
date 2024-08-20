import { IsOptional, IsString, IsInt, Min, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

enum OrderByField {
	id = 'id',
	email = 'email',
}

export class UsersQueryDto {
	
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	page?: number = 1;

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	pageSize?: number = 10;

	@IsOptional()
	@IsEnum(OrderByField)
	orderBy?: OrderByField;

	@IsOptional()
	@IsString()
	email?: string;

}
