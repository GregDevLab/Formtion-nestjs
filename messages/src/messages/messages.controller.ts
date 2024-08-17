import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('messages')
export class MessagesController {
	@Get()
	getAll() {

	}
	
	@Get('/:id')
	getOne(@Param('id') id: string, @Res() res: Response) {
		console.log("🚀 ~ MessagesController ~ getOne ~ id:", id)
		return res.status(HttpStatus.CREATED).json(id)
	}

	@Post()
	create(@Body() body : any, @Res() res: Response) {
		console.log(body)
		return res.status(HttpStatus.CREATED).json(body)
	}

}
