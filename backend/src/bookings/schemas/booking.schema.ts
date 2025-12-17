import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BookingDocument = Booking & Document;

export type BookingStatus = 'Pending' | 'Confirmed' | 'Cancelled';

@Schema({ timestamps: true })
export class Booking {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ type: Types.ObjectId, ref: 'Destination', required: false })
  destinationId?: Types.ObjectId;

  @Prop({ required: true })
  tourDate: Date;

  @Prop({ required: true, default: 1 })
  numberOfPeople: number;

  @Prop({ default: '' })
  specialRequest: string;

  @Prop({ required: true, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' })
  status: BookingStatus;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);







