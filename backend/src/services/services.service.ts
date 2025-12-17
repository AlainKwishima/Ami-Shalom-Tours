import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service, ServiceDocument } from './schemas/service.schema';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name)
    private readonly serviceModel: Model<ServiceDocument>,
  ) { }

  async findAll() {
    return this.serviceModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string) {
    const service = await this.serviceModel.findById(id).exec();
    if (!service) {
      throw new NotFoundException('Service not found');
    }
    return service;
  }

  async create(dto: CreateServiceDto) {
    return this.serviceModel.create(dto);
  }

  async update(id: string, dto: UpdateServiceDto) {
    const service = await this.serviceModel.findById(id);

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    if (dto.title !== undefined) {
      service.title = dto.title;
    }
    if (dto.description !== undefined) {
      service.description = dto.description;
    }
    if (dto.imageUrl !== undefined) {
      service.imageUrl = dto.imageUrl;
    }

    return service.save();
  }

  async remove(id: string) {
    const service = await this.serviceModel.findByIdAndDelete(id).exec();
    if (!service) {
      throw new NotFoundException('Service not found');
    }
    return { success: true };
  }
}

