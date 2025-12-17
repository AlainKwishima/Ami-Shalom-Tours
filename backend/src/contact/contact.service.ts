import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailService } from '../email/email.service';
import { Message, MessageDocument } from './schemas/message.schema';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
    private readonly emailService: EmailService,
  ) {}

  async create(dto: CreateContactDto) {
    const created = await this.messageModel.create({
      ...dto,
      category: dto.category ?? 'General',
    });

    await this.emailService.sendContactEmail({
      name: dto.name,
      email: dto.email,
      subject: dto.subject,
      message: dto.message,
    });

    return created;
  }

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.messageModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
      this.messageModel.countDocuments().exec(),
    ]);

    return {
      data: items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  async remove(id: string) {
    const result = await this.messageModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Message not found');
    }
    return { success: true };
  }
}

