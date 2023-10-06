import { chatModel } from '../models/chat.model.js';

export class ChatManagerMongo {
  constructor () {
    this.model = chatModel;
  }

  async getMessages () {
    try {
      const messages = await this.model.find().lean();
      return messages;
    } catch (error) {
      console.log('getMessages:', error.message);
      throw new Error('No se pudieron obtener todos los mensajes.');
    }
  }

  async addMessage (messageInfo) {
    try {
      const result = await this.model.create(messageInfo);
      return result;
    } catch (error) {
      console.log('addMessage:', error.message);
      throw new Error('No se pudo enviar el mensaje.');
    }
  }
}
