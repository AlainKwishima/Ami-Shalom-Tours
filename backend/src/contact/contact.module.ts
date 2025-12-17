import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { EmailModule } from '../email/email.module';
import { Message, MessageSchema } from './schemas/message.schema';

@Module({
  imports: [
    EmailModule,
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}

