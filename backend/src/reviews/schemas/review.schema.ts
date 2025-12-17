import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ trim: true, lowercase: true })
  email?: string;

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ required: true, trim: true })
  message: string;

  @Prop({ default: 'published', enum: ['published', 'hidden'] })
  status: 'published' | 'hidden';
}

export const ReviewSchema = SchemaFactory.createForClass(Review);


