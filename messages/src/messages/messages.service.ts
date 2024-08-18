import { MessagesRepository } from "./messages.repository";


export class MessagesService {
	messagesRepo: MessagesRepository
	//TODO : Utiliser l'injection de dépendances de NestJS
	constructor() {
		this.messagesRepo = new MessagesRepository()
	}

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