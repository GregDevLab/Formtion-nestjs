import { Body, Controller, Get, HttpStatus, Param, Post, Res, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
	messagesService: MessagesService
	//TODO : Utiliser l'injection de dépendances de NestJS
	constructor() {
		this.messagesService = new MessagesService()
	}

	@Get()
	async getAll(@Res() res: Response) {
		const messages = await this.messagesService.findAll()
		return res.status(HttpStatus.OK).json(messages)
	}
	
	@Get('/:id')
	async getOne(@Param('id') id: string, @Res() res: Response) {
		const message = await this.messagesService.findeOne(id)
		if(!message) throw new NotFoundException('Aucun message trouvé')
		return res.status(HttpStatus.OK).json(message)
	}

	@Post()
	async create(@Body() body : CreateMessageDto, @Res() res: Response) {
		const message = await this.messagesService.create(body.content)
		return res.status(HttpStatus.CREATED).json(message)
	}

}
