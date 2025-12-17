import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Booking, BookingDocument, BookingStatus } from './schemas/booking.schema';
import { EmailService } from '../email/email.service';
import { Destination, DestinationDocument } from '../destinations/schemas/destination.schema';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name)
    private readonly bookingModel: Model<BookingDocument>,
    @InjectModel(Destination.name)
    private readonly destinationModel: Model<DestinationDocument>,
    private readonly emailService: EmailService,
  ) {}

  private async resolveDestinationTitle(destinationId?: string) {
    if (!destinationId || !Types.ObjectId.isValid(destinationId)) {
      return 'Ami Shalom Tours';
    }
    const destination = await this.destinationModel
      .findById(destinationId)
      .select('title')
      .exec();
    return destination?.title ?? 'Ami Shalom Tours';
  }

  async create(dto: CreateBookingDto) {
    const destinationTitle = await this.resolveDestinationTitle(dto.destinationId);

    const booking = await this.bookingModel.create({
      ...dto,
      destinationId:
        dto.destinationId && Types.ObjectId.isValid(dto.destinationId)
          ? new Types.ObjectId(dto.destinationId)
          : undefined,
      tourDate: new Date(dto.tourDate),
      status: 'Pending',
    });

    await this.emailService.sendBookingEmail({
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      destinationTitle,
      tourDate: dto.tourDate,
      numberOfPeople: dto.numberOfPeople,
      specialRequest: dto.specialRequest,
    });

    return booking;
  }

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.bookingModel
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('destinationId', 'title location')
        .exec(),
      this.bookingModel.countDocuments().exec(),
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
    const booking = await this.bookingModel
      .findById(id)
      .populate('destinationId', 'title location')
      .exec();
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }

  async updateStatus(id: string, status: BookingStatus) {
    const booking = await this.bookingModel.findById(id).exec();
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    booking.status = status;
    await booking.save();

    const destinationTitle = await this.resolveDestinationTitle(booking.destinationId?.toString());

    await this.emailService.sendBookingStatusUpdate({
      name: booking.name,
      email: booking.email,
      destinationTitle,
      status,
    });

    return booking;
  }
}

