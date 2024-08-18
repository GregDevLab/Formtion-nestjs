import {IsString} from 'class-validator'

// DOC class validator : https://github.com/typestack/class-validator?tab=readme-ov-file#validation-errors
// DOC class transformer : https://github.com/typestack/class-transformer
export class CreateMessageDto {
	@IsString({
		message(validationArguments) {
			console.log("🚀 ~ CreateMessageDto ~ message ~ validationArguments:", validationArguments)
			return `${validationArguments.property} doit être une chaine de caractère`
		},
	})
	content: string
}