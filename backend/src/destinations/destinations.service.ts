import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Destination, DestinationDocument } from './schemas/destination.schema';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectModel(Destination.name)
    private readonly destinationModel: Model<DestinationDocument>,
  ) {}

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.destinationModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
      this.destinationModel.countDocuments().exec(),
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

  async findOne(id: string) {
    const destination = await this.destinationModel.findById(id).exec();
    if (!destination) {
      throw new NotFoundException('Destination not found');
    }
    return destination;
  }

  async findBySlug(slug: string) {
    const destination = await this.destinationModel.findOne({ slug }).exec();
    if (!destination) {
      throw new NotFoundException('Destination not found');
    }
    return destination;
  }

  async create(dto: CreateDestinationDto) {
    const existing = await this.destinationModel.findOne({ slug: dto.slug }).exec();
    if (existing) {
      throw new ConflictException('Slug already exists');
    }

    return this.destinationModel.create({
      ...dto,
      images: dto.images || [],
      highlights: dto.highlights || [],
      events: dto.events || [],
    });
  }

  async update(id: string, dto: UpdateDestinationDto) {
    const updated = await this.destinationModel
      .findByIdAndUpdate(
        id,
        {
          ...(dto.title !== undefined ? { title: dto.title } : {}),
          ...(dto.slug !== undefined ? { slug: dto.slug } : {}),
          ...(dto.location !== undefined ? { location: dto.location } : {}),
          ...(dto.description !== undefined ? { description: dto.description } : {}),
          ...(dto.price !== undefined ? { price: dto.price } : {}),
          ...(dto.duration !== undefined ? { duration: dto.duration } : {}),
          ...(dto.images !== undefined ? { images: dto.images } : {}),
          ...(dto.highlights !== undefined ? { highlights: dto.highlights } : {}),
          ...(dto.events !== undefined ? { events: dto.events } : {}),
        },
        { new: true },
      )
      .exec();

    if (!updated) {
      throw new NotFoundException('Destination not found');
    }

    return updated;
  }

  async remove(id: string) {
    const removed = await this.destinationModel.findByIdAndDelete(id).exec();
    if (!removed) {
      throw new NotFoundException('Destination not found');
    }
    return { success: true };
  }
}
