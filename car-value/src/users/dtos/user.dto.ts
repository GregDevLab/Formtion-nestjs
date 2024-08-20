import { Exclude, Expose } from "class-transformer"
import { IsEmail, IsOptional, IsString } from "class-validator"
export class UserDto {
	@Expose()
	email:string

	@Expose()
	id: number
}