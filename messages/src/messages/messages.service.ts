import { Injectable } from "@nestjs/common";
import { MessagesRepository } from "./messages.repository";

@Injectable()
export class MessagesService {
	constructor(public messagesRepo: MessagesRepository) {}

	async findeOne(id:string) {
		return await this.messagesRepo.findeOne(id)
	}

	async findAll() {
		return await this.messagesRepo.findAll()
	}

	async create(content:string) {
		return await this.messagesRepo.create(content)
	}
}