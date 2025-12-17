import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { EmailModule } from '../email/email.module';
import { Booking, BookingSchema } from './schemas/booking.schema';
import { Destination, DestinationSchema } from '../destinations/schemas/destination.schema';

@Module({
  imports: [
    EmailModule,
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
      { name: Destination.name, schema: DestinationSchema },
    ]),
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BookingsModule {}

